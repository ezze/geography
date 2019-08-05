import { stores } from './store';

import CameraController from './CameraController';

let cameraController = null;

export function onGlobeCreate(cesiumWidget) {
  console.log(stores);
  const { cameraStore } = stores;
  cameraController = new CameraController({
    cesiumWidget,
    store: cameraStore
  });
}

export function onGlobeDestroy() {
  cameraController.destroy();
}
