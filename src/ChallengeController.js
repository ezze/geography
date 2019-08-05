import Cesium from 'cesium';

import { challengeColors } from './constants';

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

    const { scene, clock } = cesiumWidget;

    this.dataSources = new Cesium.DataSourceCollection();
    this.dataSourceDisplay = new Cesium.DataSourceDisplay({ scene, dataSourceCollection: this.dataSources });

    this.eventHelper = new Cesium.EventHelper();
    this.eventHelper.add(clock.onTick, clock => this.dataSourceDisplay.update(clock.currentTime));

    this.load().catch(e => console.error(e));
  }

  destroy() {
    this.dataSourceDisplay.destroy();
    this.eventHelper.removeAll();
  }

  async load() {
    const { challenge } = this.store;
    if (!challenge) {
      return;
    }

    this.store.setLoading(true);

    const { items } = challenge;

    try {
      const geoObjects = await Promise.all(items.map((item, i) => {
        const stroke = Cesium.Color.fromCssColorString(challengeColors[i % challengeColors.length]);
        const fill = Cesium.Color.fromAlpha(stroke, 0.4);
        const { path } = item;
        return Cesium.GeoJsonDataSource.load(path, { stroke, fill });
      }));
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
}

export default ChallengeController;
