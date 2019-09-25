import Cesium from 'cesium';
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
    const { store, cesiumWidget } = options;

    if (!store || typeof store !== 'object') {
      throw new TypeError('Store is not specified.');
    }

    if (!cesiumWidget || typeof cesiumWidget !== 'object') {
      throw new TypeError('Cesium widget is not specified.');
    }

    this.store = store;
    this.cesiumWidget = cesiumWidget;

    this.highlightedId = null;
    this.entityMap = {};

    const { scene, clock } = cesiumWidget;

    this.dataSources = new Cesium.DataSourceCollection();
    this.dataSourceDisplay = new Cesium.DataSourceDisplay({ scene, dataSourceCollection: this.dataSources });

    this.eventHelper = new Cesium.EventHelper();
    this.eventHelper.add(clock.onTick, clock => this.dataSourceDisplay.update(clock.currentTime));

    this.disposePlayMode = reaction(() => this.store.playMode, () => {
      this.validateGeoObjectVisibility();
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

    this.store.setLoading(true);

    const { items } = challenge;

    try {
      const geoObjects = await Promise.all(items.map(item => {
        const { id, path } = item;
        return Promise.all(Object.keys(geoObjectColors).map(style => {
          return this.loadGeoObject(id, path, style);
        }));
      })).then(geoObjectLists => {
        const geoObjects = [];
        geoObjectLists.forEach(geoObjectList => {
          Array.prototype.push.apply(geoObjects, geoObjectList);
        });
        return geoObjects;
      });

      for (let i = 0; i < geoObjects.length; i++) {
        this.dataSources.add(geoObjects[i]);
      }
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
    this.dataSources.removeAll();
  }

  loadGeoObject(id, path, style) {
    const { stroke, fill } = geoObjectColors[style];
    return Cesium.GeoJsonDataSource.load(path, { stroke, fill }).then(geoObject => {
      geoObject.id = id;
      geoObject.style = style;
      geoObject.show = this.store.playMode ? style === GEOOBJECT_STYLE_HIDDEN : style === GEOOBJECT_STYLE_DEFAULT;

      // TODO: temporary fix for polygons: https://github.com/AnalyticalGraphicsInc/cesium/issues/8042
      for (let i = 0; i < geoObject.entities.values.length; i++) {
        const entity = geoObject.entities.values[i];
        this.entityMap[entity.id] = id;
        if (Cesium.defined(entity.polygon)) {
          entity.polygon.arcType = Cesium.ArcType.GEODESIC;
        }
      }
      return geoObject;
    });
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

export default ChallengeController;
