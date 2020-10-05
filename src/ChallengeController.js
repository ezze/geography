import {
  DataSourceCollection,
  DataSourceDisplay,
  EventHelper,
  GeoJsonDataSource,
  ArcType,
  defined
} from 'cesium';

import { reaction } from 'mobx';

import {
  challengeItemDefaultColor,
  challengeItemDefaultFillColor,
  challengeItemPickedColor,
  challengeItemPickedFillColor,
  challengeItemCorrectColor,
  challengeItemCorrectFillColor,
  challengeItemWrongColor,
  challengeItemWrongFillColor,
  challengeItemHiddenColor
} from './constants';

import { delay } from './helpers';

const GEOOBJECT_STYLE_DEFAULT = 'GEOOBJECT_STYLE_DEFAULT';
const GEOOBJECT_STYLE_PICKED = 'GEOOBJECT_STYLE_PICKED';
const GEOOBJECT_STYLE_CORRECT = 'GEOOBJECT_STYLE_CORRECT';
const GEOOBJECT_STYLE_WRONG = 'GEOOBJECT_STYLE_WRONG';
const GEOOBJECT_STYLE_HIDDEN = 'GEOOBJECT_STYLE_HIDDEN';

const geoObjectColors = {
  [GEOOBJECT_STYLE_DEFAULT]: {
    stroke: challengeItemDefaultColor,
    fill: challengeItemDefaultFillColor
  },
  [GEOOBJECT_STYLE_PICKED]: {
    stroke: challengeItemPickedColor,
    fill: challengeItemPickedFillColor
  },
  [GEOOBJECT_STYLE_CORRECT]: {
    stroke: challengeItemCorrectColor,
    fill: challengeItemCorrectFillColor
  },
  [GEOOBJECT_STYLE_WRONG]: {
    stroke: challengeItemWrongColor,
    fill: challengeItemWrongFillColor
  },
  [GEOOBJECT_STYLE_HIDDEN]: {
    stroke: challengeItemHiddenColor,
    fill: challengeItemHiddenColor
  }
};

class ChallengeController {
  constructor(options = {}) {
    const { store, cesiumWidget, cameraController } = options;

    if (!store || typeof store !== 'object') {
      throw new TypeError('Store is not specified.');
    }

    if (!cesiumWidget || typeof cesiumWidget !== 'object') {
      throw new TypeError('Cesium widget is not specified.');
    }

    if (!cameraController || typeof cameraController !== 'object') {
      throw new TypeError('Camera controller is not specified.');
    }

    this.store = store;
    this.cesiumWidget = cesiumWidget;
    this.cameraController = cameraController;

    this.highlightedId = null;
    this.entityMap = {};

    const { scene, clock } = cesiumWidget;

    this.dataSources = new DataSourceCollection();
    this.dataSourceDisplay = new DataSourceDisplay({ scene, dataSourceCollection: this.dataSources });

    this.eventHelper = new EventHelper();
    this.eventHelper.add(clock.onTick, clock => this.dataSourceDisplay.update(clock.currentTime));

    this.disposePlayMode = reaction(() => this.store.playMode, playMode => {
      this.validateGeoObjectVisibility();
      if (playMode) {
        this.restoreView().catch(e => console.error(e));
      }
    });

    this.disposeChallengeId = reaction(() => this.store.id, async() => {
      await this.unload();
      await this.load();
    });

    this.disposePickedChallengeItemId = reaction(() => this.store.pickedItemId, id => {
      this.highlightGeoObject(id);
    });

    this.disposeUserChallengeItemId = reaction(() => this.store.userItemId, () => {
      this.validateGeoObjectVisibility();
    });

    this.load().catch(e => console.error(e));
  }

  destroy() {
    this.dataSourceDisplay.destroy();
    this.eventHelper.removeAll();
    this.disposePlayMode();
    this.disposeChallengeId();
    this.disposePickedChallengeItemId();
    this.disposeUserChallengeItemId();
  }

  async load() {
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
      const styles = Object.keys(geoObjectColors);
      const { generalStore } = this.store;
      if (generalStore.developerMode) {
        await Promise.all(items.map(item => {
          const { id, path } = item;
          return loadGeoJson(path).then(geoJson => {
            return Promise.all(styles.map(style => {
              this.dataSources.add(this.loadGeoObject(id, geoJson, style));
            }));
          });
        }));
      }
      else {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const { id, path } = item;
          const geoJson = await loadGeoJson(path);
          for (let j = 0; j < styles.length; j++) {
            const style = styles[j];
            this.dataSources.add(this.loadGeoObject(id, geoJson, style));
            await delay(1);
          }
        }
      }
      this.restoreView();
    }
    catch (e) {
      console.error(e);
      this.store.setLoadingError(true);
    }
    finally {
      this.store.setLoading(false);
    }
  }

  async unload() {
    if (this.store.loading) {
      await delay(500);
      return this.unload();
    }
    this.highlightedId = null;
    this.entityMap = {};
    this.dataSources.removeAll();
  }

  loadGeoObject(id, geoJson, style) {
    const { stroke, fill } = geoObjectColors[style];
    return GeoJsonDataSource.load(geoJson, { stroke, fill }).then(geoObject => {
      geoObject.id = id;
      geoObject.style = style;
      geoObject.show = this.store.playMode ? style === GEOOBJECT_STYLE_HIDDEN : style === GEOOBJECT_STYLE_DEFAULT;

      // TODO: temporary fix for polygons: https://github.com/AnalyticalGraphicsInc/cesium/issues/8042
      for (let i = 0; i < geoObject.entities.values.length; i++) {
        const entity = geoObject.entities.values[i];
        this.entityMap[entity.id] = id;
        if (defined(entity.polygon)) {
          entity.polygon.arcType = ArcType.GEODESIC;
        }
      }
      return geoObject;
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
    if (view) {
      this.cameraController.flyToView(view);
    }
  }

  validateGeoObjectVisibility() {
    const { playMode, userCorrect, guessedItemId, userItemId } = this.store;
    for (let i = 0; i < this.dataSources.length; i++) {
      const geoObject = this.dataSources.get(i);
      const { id, style } = geoObject;

      if (playMode) {
        if (style === GEOOBJECT_STYLE_HIDDEN) {
          geoObject.show = true;
          continue;
        }

        if (userItemId) {
          geoObject.show = (
            (id === guessedItemId && style === GEOOBJECT_STYLE_CORRECT) ||
            (id === userItemId && style === GEOOBJECT_STYLE_WRONG && !userCorrect)
          );
        }
        else {
          geoObject.show = false;
        }

        continue;
      }

      geoObject.show = style === GEOOBJECT_STYLE_DEFAULT;
    }
  }

  highlightGeoObject(id) {
    const { playMode } = this.store;

    const style = playMode ? GEOOBJECT_STYLE_HIDDEN : GEOOBJECT_STYLE_DEFAULT;

    if (this.highlightedId) {
      const geoObject = this.getGeoObject(this.highlightedId, style);
      const geoObjectPicked = this.getGeoObject(this.highlightedId, GEOOBJECT_STYLE_PICKED);
      geoObject.show = true;
      geoObjectPicked.show = false;
    }

    const geoObject = this.getGeoObject(id, style);
    const geoObjectPicked = this.getGeoObject(id, GEOOBJECT_STYLE_PICKED);
    this.highlightedId = id;

    if (!geoObject || !geoObjectPicked) {
      return;
    }

    geoObject.show = false;
    geoObjectPicked.show = true;
  }

  getGeoObject(id, style) {
    for (let i = 0; i < this.dataSources.length; i++) {
      const geoObject = this.dataSources.get(i);
      if (geoObject.id === id && geoObject.style === style) {
        return geoObject;
      }
    }
    return null;
  }

  getGeoObjectIdByEntityId(entityId) {
    return this.entityMap[entityId] || null;
  }
}

async function loadGeoJson(path) {
  try {
    const response = await fetch(path);
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Unable to load GeoJSON ${path}.`);
  }
  catch (e) {
    return Promise.reject(`Unable to load GeoJSON ${path}.`);
  }
}

export default ChallengeController;
