import Cesium from 'cesium';
import { observe } from 'mobx';

import { parseView } from './cameraHelpers';

import {
  CAMERA_SCENE_MODE_2D,
  CAMERA_SCENE_MODE_3D,
  cameraMinHeight,
  cameraMaxHeight
} from './constants';

class CameraController {
  constructor(options) {
    const {
      store,
      cesiumWidget
    } = options;

    if (!store || typeof store !== 'object') {
      throw new TypeError('Store is not specified.');
    }

    if (!cesiumWidget || typeof cesiumWidget !== 'object') {
      throw new TypeError('Cesium widget is not specified.');
    }

    this.store = store;
    this.cesiumWidget = cesiumWidget;

    const { scene, camera } = cesiumWidget;

    // Setting minimal and maximal height of the camera
    const controller = this.controller = scene.screenSpaceCameraController;
    controller.minimumZoomDistance = cameraMinHeight;
    controller.maximumZoomDistance = cameraMaxHeight;

    // Subscribe to state changes
    this.disposeFullscreenMode = observe(store, 'fullscreenMode', ({ newValue: fullscreenMode }) => {
      if (!Cesium.Fullscreen.supportsFullscreen()) {
        return;
      }
      if (fullscreenMode) {
        Cesium.Fullscreen.requestFullscreen(document.querySelector('body'));
      }
      else {
        Cesium.Fullscreen.exitFullscreen();
      }
    });
    this.disposeSceneMode = observe(store, 'sceneMode', ({ newValue: sceneMode }) => {
      scene.mode = Cesium.SceneMode[sceneMode === CAMERA_SCENE_MODE_2D ? 'SCENE2D' : 'SCENE3D'];
    });

    // Subscribe to changes of fullscreen mode and screen mode to validate the state
    const { morphComplete } = scene;
    this.removeSceneModeListener = morphComplete.addEventListener(this.onSceneModeChange, this);
    this.onFullscreenChange = this.onFullscreenChange.bind(this);
    document.addEventListener(Cesium.Fullscreen.changeEventName, this.onFullscreenChange);

    // Interrupt flight on user interaction
    const cancelFlight = () => camera.cancelFlight();
    this.canvasEventHandler = new Cesium.ScreenSpaceEventHandler(cesiumWidget.canvas);
    this.canvasEventHandler.setInputAction(cancelFlight, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    this.canvasEventHandler.setInputAction(cancelFlight, Cesium.ScreenSpaceEventType.RIGHT_DOWN);

    // Initializing scene mode
    scene.mode = Cesium.SceneMode[store.sceneMode === CAMERA_SCENE_MODE_2D ? 'SCENE2D' : 'SCENE3D'];

    // Initializing view
    this.initialView = parseView(this.store.view);
    this.view = null;
    this.lookAtInitialView();

    // Run view updater
    this.viewUpdater = setInterval(() => this.updateView(), 1000);
  }

  destroy() {
    this.disposeFullscreenMode();
    this.disposeSceneMode();
    this.removeSceneModeListener();
    document.removeEventListener(Cesium.Fullscreen.changeEventName, this.onFullscreenChange);
    this.canvasEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
    this.canvasEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_DOWN);
    clearInterval(this.viewUpdater);
  }

  lookAtView(options) {
    this.cesiumWidget.camera.setView(options);
  }

  lookAtInitialView() {
    this.lookAtView(this.initialView);
  }

  flyToView(options) {
    const { camera } = this.cesiumWidget;
    const { destination } = options;
    if (destination && typeof destination === 'object') {
      const { west, south, east, north, units } = destination;
      if (
        typeof west === 'number' && typeof south === 'number' &&
        typeof east === 'number' && typeof north === 'number'
      ) {
        if (units === 'degrees') {
          camera.flyTo({ destination: Cesium.Rectangle.fromDegrees(west, south, east, north) });
        }
        else {
          camera.flyTo({ destination: Cesium.Rectangle.fromRadians(west, south, east, north) });
        }
        return;
      }
    }
    camera.flyTo(options);
  }

  flyToInitialView() {
    this.flyToView(this.initialView);
  }

  flyToBoundingSphere(boundingSphere, options) {
    this.cesiumWidget.camera.flyToBoundingSphere(boundingSphere, options);
  }

  zoomIn() {
    const { camera } = this.cesiumWidget;
    camera.zoomIn.apply(camera, arguments);
  }

  zoomOut() {
    const { camera } = this.cesiumWidget;
    camera.zoomOut.apply(camera, arguments);
  }

  getRotation() {
    return this.controller.enableRotate;
  }

  setRotation(rotation) {
    this.controller.enableRotate = rotation;
  }

  getTranslation() {
    return this.controller.enableTranslate;
  }

  setTranslation(translation) {
    return this.controller.enableTranslate = translation;
  }

  updateView() {
    const { camera } = this.cesiumWidget;
    const view = {
      destination: {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      },
      orientation: {
        direction: {
          x: camera.direction.x,
          y: camera.direction.y,
          z: camera.direction.z
        },
        up: {
          x: camera.up.x,
          y: camera.up.y,
          z: camera.up.z
        }
      }
    };

    // Checking whether view has been changed
    if (
      this.view !== null &&
      Cesium.Cartesian3.equals(view.destination, this.view.destination) &&
      Cesium.Cartesian3.equals(view.orientation.direction, this.view.orientation.direction) &&
      Cesium.Cartesian3.equals(view.orientation.up, this.view.orientation.up)
    ) {
      return;
    }

    this.view = view;
    this.store.setView(view);
  }

  restoreNorthOrientation() {
    if (this.store.sceneMode !== CAMERA_SCENE_MODE_3D) {
      return;
    }

    const { camera } = this.cesiumWidget;
    const destination = Cesium.Cartesian3.clone(camera.position);
    const orientation = {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0
    };

    // We should have a difference between current position and destination position
    // otherwise an empty flight will be created (see CameraFlightPath.createTween in Cesium sources)
    let diff = Math.min(destination.x, destination.y, destination.z) * Cesium.Math.EPSILON6;
    diff = Math.abs(Math.round(diff) * 10);
    destination.x += diff;
    destination.y += diff;
    destination.z += diff;

    this.flyToView({ destination, orientation });
  }

  onFullscreenChange() {
    const fullscreenMode = Cesium.Fullscreen.fullscreen;
    if (this.store.fullscreenMode !== fullscreenMode) {
      this.store.setFullscreenMode(fullscreenMode);
    }
  }

  onSceneModeChange(sceneTransitioner, oldMode, newMode) {
    const sceneMode = newMode === Cesium.SceneMode.SCENE2D ? CAMERA_SCENE_MODE_2D : CAMERA_SCENE_MODE_3D;
    if (this.store.sceneMode !== sceneMode) {
      this.store.setSceneMode(sceneMode);
    }
  }
}

export default CameraController;
