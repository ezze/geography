import { CesiumWidget } from 'cesium';

import { CameraController } from './CameraController';
import { ChallengeController } from './ChallengeController';
import { CameraStore } from './store/CameraStore';
import { ChallengeStore } from './store/ChallengeStore';

let cameraController: CameraController;
let challengeController: ChallengeController;

export function onGlobeCreate(
  cesiumWidget: CesiumWidget,
  cameraStore: CameraStore,
  challengeStore: ChallengeStore
): void {
  cameraController = new CameraController({ store: cameraStore, cesiumWidget });
  challengeController = new ChallengeController({ store: challengeStore, cesiumWidget, cameraController });
}

export function onGlobeDestroy() {
  cameraController.destroy();
  challengeController.destroy();
}

export function gerCameraController(): CameraController {
  return cameraController;
}

export function getChallengeController(): ChallengeController {
  return challengeController;
}
