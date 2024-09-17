import { DataSourceCollection, DataSourceDisplay, EventHelper, GeoJsonDataSource, CesiumWidget, Color } from 'cesium';
import { IReactionDisposer, reaction } from 'mobx';

import { CameraController } from './CameraController';
import {
  challengeItemDefaultColor,
  challengeItemDefaultFillColor,
  challengeItemPickedColor,
  challengeItemPickedFillColor,
  challengeItemCorrectColor,
  challengeItemCorrectFillColor,
  challengeItemWrongColor,
  challengeItemWrongFillColor,
  challengeItemHiddenColor,
  challengeItemHiddenFillColor
} from './const';
import { delay } from './helpers';
import { ChallengeStore } from './store/ChallengeStore';
import { GeoObject, GeoObjectStyle } from './types';

const getGeoObjectColors: Record<GeoObjectStyle, { stroke: Color; fill: Color }> = {
  default: { stroke: challengeItemDefaultColor, fill: challengeItemDefaultFillColor },
  picked: { stroke: challengeItemPickedColor, fill: challengeItemPickedFillColor },
  correct: { stroke: challengeItemCorrectColor, fill: challengeItemCorrectFillColor },
  wrong: { stroke: challengeItemWrongColor, fill: challengeItemWrongFillColor },
  hidden: { stroke: challengeItemHiddenColor, fill: challengeItemHiddenFillColor }
};

const styles: ReadonlyArray<GeoObjectStyle> = ['default', 'picked', 'correct', 'wrong', 'hidden'];

export type ChallengeControllerOptions = {
  store: ChallengeStore;
  cesiumWidget: CesiumWidget;
  cameraController: CameraController;
};

export class ChallengeController {
  protected store: ChallengeStore;
  protected cesiumWidget: CesiumWidget;
  protected cameraController: CameraController;

  protected highlightedId?: string;
  protected entityMap: Record<string, string>;

  protected dataSources: DataSourceCollection = new DataSourceCollection();
  protected dataSourceDisplay: DataSourceDisplay;

  protected eventHelper = new EventHelper();
  protected reactionDisposers: Array<IReactionDisposer> = [];

  constructor(options: ChallengeControllerOptions) {
    const { store, cesiumWidget, cameraController } = options;

    this.store = store;
    this.cesiumWidget = cesiumWidget;
    this.cameraController = cameraController;

    this.highlightedId = undefined;
    this.entityMap = {};

    const { scene, clock } = cesiumWidget;

    this.dataSourceDisplay = new DataSourceDisplay({ scene, dataSourceCollection: this.dataSources });

    this.eventHelper = new EventHelper();
    this.eventHelper.add(clock.onTick, (clock) => this.dataSourceDisplay.update(clock.currentTime));

    this.reactionDisposers.push(
      reaction(
        () => this.store.playMode,
        (playMode) => {
          this.validateGeoObjectVisibility();
          if (playMode) {
            this.restoreView().catch((e) => console.error(e));
          }
        }
      )
    );

    this.reactionDisposers.push(
      reaction(
        () => this.store.id,
        async () => {
          await this.unload();
          await this.load();
        }
      )
    );

    this.reactionDisposers.push(
      reaction(
        () => this.store.pickedItemId,
        (id) => {
          if (id) {
            this.highlightGeoObject(id);
          }
        }
      )
    );

    this.reactionDisposers.push(
      reaction(
        () => this.store.userItemId,
        () => {
          this.validateGeoObjectVisibility();
        }
      )
    );

    this.load().catch((e) => console.error(e));
  }

  destroy() {
    this.dataSourceDisplay.destroy();
    this.eventHelper.removeAll();
    this.reactionDisposers.forEach((dispose) => dispose());
  }

  async load(): Promise<void> {
    const { challenge } = this.store;
    if (!challenge) {
      return;
    }

    if (this.store.loading) {
      await delay(500);
      return this.load();
    }

    this.store.setLoadingError(false);
    this.store.setLoading(true);

    const { items } = challenge;

    try {
      const { generalStore } = this.store;
      if (generalStore.developerMode) {
        await Promise.all(
          items.map((item) => {
            const { id, path } = item;
            return loadGeoJson(`challenges/${challenge.id}/${path}`).then((geoJson) => {
              return Promise.all(
                styles.map((style) => {
                  this.dataSources.add(this.loadGeoObject(id, geoJson, style));
                })
              );
            });
          })
        );
      } else {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const { id, path } = item;
          const geoJson = await loadGeoJson(`challenges/${challenge.id}/${path}`);
          for (let j = 0; j < styles.length; j++) {
            const style = styles[j];
            const geoObject = this.loadGeoObject(id, geoJson, style);
            this.dataSources.add(geoObject);
            await delay(1);
          }
        }
      }
      this.restoreView().catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
      this.store.setLoadingError(true);
    } finally {
      this.store.setLoading(false);
    }
  }

  async unload(): Promise<void> {
    if (this.store.loading) {
      await delay(500);
      return this.unload();
    }
    this.highlightedId = undefined;
    this.entityMap = {};
    this.dataSources.removeAll();
  }

  loadGeoObject(id: string, geoJson: unknown, style: GeoObjectStyle) {
    const { stroke, fill } = getGeoObjectColors[style];
    return GeoJsonDataSource.load(geoJson, { stroke, fill }).then((geoObject): GeoObject => {
      geoObject.name = id;
      geoObject.show = this.store.playMode ? style === 'hidden' : style === 'default';
      Object.assign(geoObject, { style });
      // // TODO: temporary fix for polygons: https://github.com/AnalyticalGraphicsInc/cesium/issues/8042
      // for (let i = 0; i < geoObject.entities.values.length; i++) {
      //   const entity = geoObject.entities.values[i];
      //   this.entityMap[entity.id] = id;
      //   if (defined(entity.polygon)) {
      //     entity.polygon.arcType = ArcType.GEODESIC;
      //   }
      // }
      return geoObject as GeoObject;
    });
  }

  async restoreView() {
    const { challenge } = this.store;
    if (!challenge) {
      return;
    }
    const { minimumZoomDistance, view } = challenge;
    if (minimumZoomDistance) {
      this.cameraController.controller.minimumZoomDistance = minimumZoomDistance;
    }
    this.cameraController.flyToView(view);
  }

  validateGeoObjectVisibility() {
    const { playMode, userCorrect, guessedItemId, userItemId } = this.store;
    for (let i = 0; i < this.dataSources.length; i++) {
      const geoObject = this.dataSources.get(i) as GeoObject;
      const { name, style } = geoObject;

      if (playMode) {
        if (style === 'hidden') {
          geoObject.show = true;
          continue;
        }

        if (userItemId) {
          geoObject.show =
            (name === guessedItemId && style === 'correct') ||
            (name === userItemId && style === 'wrong' && !userCorrect);
        } else {
          geoObject.show = false;
        }

        continue;
      }

      geoObject.show = style === 'default';
    }
  }

  highlightGeoObject(id: string) {
    const { playMode } = this.store;

    const style: GeoObjectStyle = playMode ? 'hidden' : 'default';

    if (this.highlightedId) {
      const geoObject = this.getGeoObject(this.highlightedId, style);
      const geoObjectPicked = this.getGeoObject(this.highlightedId, 'picked');
      if (geoObject) {
        geoObject.show = true;
      }
      if (geoObjectPicked) {
        geoObjectPicked.show = false;
      }
    }

    const geoObject = this.getGeoObject(id, style);
    const geoObjectPicked = this.getGeoObject(id, 'picked');
    this.highlightedId = id;

    if (!geoObject || !geoObjectPicked) {
      return;
    }

    geoObject.show = false;
    geoObjectPicked.show = true;
  }

  getGeoObject(id: string, style: GeoObjectStyle): GeoObject | undefined {
    for (let i = 0; i < this.dataSources.length; i++) {
      const geoObject = this.dataSources.get(i) as GeoObject;
      if (geoObject.name === id && geoObject.style === style) {
        return geoObject;
      }
    }
    return undefined;
  }

  getGeoObjectIdByEntityId(entityId: string): string | undefined {
    return this.entityMap[entityId];
  }
}

async function loadGeoJson(path: string): Promise<unknown> {
  try {
    const response = await fetch(path);
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Unable to load GeoJSON ${path}.`);
  } catch (e) {
    return Promise.reject(`Unable to load GeoJSON ${path}.`);
  }
}
