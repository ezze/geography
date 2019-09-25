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
  challengeItemWrongFillColor
} from './constants';

const GEOOBJECT_STYLE_DEFAULT = 'GEOOBJECT_STYLE_DEFAULT';
const GEOOBJECT_STYLE_PICKED = 'GEOOBJECT_STYLE_PICKED';
const GEOOBJECT_STYLE_CORRECT = 'GEOOBJECT_STYLE_CORRECT';
const GEOOBJECT_STYLE_WRONG = 'GEOOBJECT_STYLE_WRONG';

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

    this.disposePickedChallengeItemId = reaction(() => this.store.pickedChallengeItemId, id => {
      this.highlightGeoObject(id);
    });

    this.load().catch(e => console.error(e));
  }

  destroy() {
    this.dataSourceDisplay.destroy();
    this.eventHelper.removeAll();
    this.disposePickedChallengeItemId();
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

  getGeoObject(id, style) {
    for (let i = 0; i < this.dataSources.length; i++) {
      const geoObject = this.dataSources.get(i);
      if (geoObject.id === id && geoObject.style === style) {
        return geoObject;
      }
    }
    return null;
  }

  loadGeoObject(id, path, style) {
    const { stroke, fill } = geoObjectColors[style];

    return Cesium.GeoJsonDataSource.load(path, { stroke, fill }).then(geoObject => {
      geoObject.id = id;
      geoObject.style = style;
      geoObject.show = style === GEOOBJECT_STYLE_DEFAULT;

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

  highlightGeoObject(id) {
    if (this.highlightedId) {
      const geoObjectDefault = this.getGeoObject(this.highlightedId, GEOOBJECT_STYLE_DEFAULT);
      const geoObjectPicked = this.getGeoObject(this.highlightedId, GEOOBJECT_STYLE_PICKED);
      geoObjectDefault.show = true;
      geoObjectPicked.show = false;
    }

    const geoObjectDefault = this.getGeoObject(id, GEOOBJECT_STYLE_DEFAULT);
    const geoObjectPicked = this.getGeoObject(id, GEOOBJECT_STYLE_PICKED);
    this.highlightedId = id;

    if (!geoObjectDefault || !geoObjectPicked) {
      return;
    }

    geoObjectDefault.show = false;
    geoObjectPicked.show = true;
  }

  getGeoObjectIdByEntityId(entityId) {
    return this.entityMap[entityId] || null;
  }
}

export default ChallengeController;
