import CameraController from './CameraController';
import ChallengeController from './ChallengeController';
import { stores } from './store';

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
    cesiumWidget,
    cameraController
  });
}

export function onGlobeDestroy() {
  cameraController.destroy();
  challengeController.destroy();
}

export function getChallengeController() {
  return challengeController;
}
