import { stores } from './store';

import CameraController from './CameraController';
import ChallengeController from './ChallengeController';

let cameraController = null;
let challengeController = null;

export function onGlobeCreate(cesiumWidget) {
  const { cameraStore, challengeStore } = stores;

  cameraController = new CameraController({
    store: cameraStore,
    cesiumWidget
  });

  challengeController = new ChallengeController({
    store: challengeStore,
    cesiumWidget
  });
}

export function onGlobeDestroy() {
  cameraController.destroy();
  challengeController.destroy();
}
