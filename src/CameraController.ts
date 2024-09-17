import {
  Cartesian3,
  CesiumWidget,
  Event,
  Math as CesiumMath,
  Fullscreen,
  SceneMode,
  ScreenSpaceEventType,
  ScreenSpaceEventHandler,
  ScreenSpaceCameraController
} from 'cesium';
import { IReactionDisposer, reaction } from 'mobx';

import { parseCesiumCartesianView, parseCameraView } from './cameraHelpers';
import { cameraMinHeight, cameraMaxHeight } from './const';
import { CameraStore } from './store/CameraStore';
import {
  CameraCartesianCoordinates,
  CameraCartesianView,
  CameraOrientationAngle,
  CameraSceneMode,
  CameraView,
  CesiumCartesianView,
  CesiumView
} from './types';

export type CameraControllerOptions = {
  store: CameraStore;
  cesiumWidget: CesiumWidget;
};

export class CameraController {
  protected store: CameraStore;
  protected cesiumWidget: CesiumWidget;
  public controller: ScreenSpaceCameraController;

  protected reactionDisposers: Array<IReactionDisposer> = [];
  protected removeSceneModeListener: Event.RemoveCallback;

  protected canvasEventHandler: ScreenSpaceEventHandler;
  protected viewUpdater: number;

  protected initialView: CesiumView;
  protected view?: CameraCartesianView;

  constructor(options: CameraControllerOptions) {
    const { store, cesiumWidget } = options;

    this.store = store;
    this.cesiumWidget = cesiumWidget;

    const { scene, camera } = cesiumWidget;

    // Setting minimal and maximal height of the camera
    const controller = (this.controller = scene.screenSpaceCameraController);
    controller.minimumZoomDistance = cameraMinHeight;
    controller.maximumZoomDistance = cameraMaxHeight;

    // Subscribe to state changes
    this.reactionDisposers.push(
      reaction(
        () => store.fullscreenMode,
        (fullscreenMode) => {
          if (!Fullscreen.supportsFullscreen()) {
            return;
          }
          if (fullscreenMode) {
            Fullscreen.requestFullscreen(document.querySelector('body'));
          } else {
            Fullscreen.exitFullscreen();
          }
        }
      )
    );

    this.reactionDisposers.push(
      reaction(
        () => store.sceneMode,
        (sceneMode) => {
          scene.mode = SceneMode[sceneMode === '2d' ? 'SCENE2D' : 'SCENE3D'];
        }
      )
    );

    // Subscribe to changes of fullscreen mode and screen mode to validate the state
    const { morphComplete } = scene;
    this.onSceneModeChange = this.onSceneModeChange.bind(this);
    this.removeSceneModeListener = morphComplete.addEventListener(this.onSceneModeChange, this);

    this.onFullscreenChange = this.onFullscreenChange.bind(this);
    document.addEventListener(Fullscreen.changeEventName, this.onFullscreenChange);

    // Interrupt flight on user interaction
    const cancelFlight = () => camera.cancelFlight();
    this.canvasEventHandler = new ScreenSpaceEventHandler(cesiumWidget.canvas);
    this.canvasEventHandler.setInputAction(cancelFlight, ScreenSpaceEventType.LEFT_DOWN);
    this.canvasEventHandler.setInputAction(cancelFlight, ScreenSpaceEventType.RIGHT_DOWN);

    // Initializing scene mode
    scene.mode = SceneMode[store.sceneMode === '2d' ? 'SCENE2D' : 'SCENE3D'];

    // Initializing view
    this.initialView = parseCameraView(this.store.view);
    this.view = undefined;
    this.lookAtInitialView();

    // Run view updater
    this.viewUpdater = window.setInterval(() => this.updateView(), 1000);
  }

  destroy() {
    this.reactionDisposers.forEach((dispose) => dispose());
    this.reactionDisposers = [];
    this.removeSceneModeListener();
    document.removeEventListener(Fullscreen.changeEventName, this.onFullscreenChange);
    this.canvasEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOWN);
    this.canvasEventHandler.removeInputAction(ScreenSpaceEventType.RIGHT_DOWN);
    clearInterval(this.viewUpdater);
  }

  lookAtView(options: CesiumView) {
    this.cesiumWidget.camera.setView(options);
  }

  lookAtInitialView() {
    this.lookAtView(this.initialView);
  }

  flyToView(view: CameraView) {
    const { camera } = this.cesiumWidget;
    const v = parseCameraView(view);
    camera.flyTo(v);
  }

  // flyToInitialView() {
  //   this.flyToView(this.initialView);
  // }
  //
  // flyToBoundingSphere(boundingSphere, options) {
  //   this.cesiumWidget.camera.flyToBoundingSphere(boundingSphere, options);
  // }
  //
  // zoomIn() {
  //   const { camera } = this.cesiumWidget;
  //   camera.zoomIn.apply(camera, arguments);
  // }
  //
  // zoomOut() {
  //   const { camera } = this.cesiumWidget;
  //   camera.zoomOut.apply(camera, arguments);
  // }
  //
  // getRotation() {
  //   return this.controller.enableRotate;
  // }
  //
  // setRotation(rotation) {
  //   this.controller.enableRotate = rotation;
  // }
  //
  // getTranslation() {
  //   return this.controller.enableTranslate;
  // }
  //
  // setTranslation(translation) {
  //   return (this.controller.enableTranslate = translation);
  // }

  updateView() {
    const { camera } = this.cesiumWidget;

    const cesiumView: CesiumCartesianView = {
      destination: camera.position,
      orientation: { direction: camera.direction, up: camera.up }
    };

    // Checking whether view has been changed
    const { view } = this;
    if (
      view !== undefined &&
      Cartesian3.equals(
        cesiumView.destination,
        Cartesian3.fromArray([view.destination.x, view.destination.y, view.destination.z])
      ) &&
      Cartesian3.equals(
        cesiumView.orientation.direction,
        Cartesian3.fromArray([view.orientation.direction.x, view.orientation.direction.y, view.orientation.direction.z])
      ) &&
      Cartesian3.equals(
        cesiumView.orientation.up,
        Cartesian3.fromArray([view.orientation.up.x, view.orientation.up.y, view.orientation.up.z])
      )
    ) {
      return;
    }

    this.view = parseCesiumCartesianView(cesiumView);
    this.store.setView(this.view);
  }

  restoreNorthOrientation() {
    if (this.store.sceneMode !== '3d') {
      return;
    }

    const { camera } = this.cesiumWidget;
    const destination: CameraCartesianCoordinates = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    const orientation: CameraOrientationAngle = { heading: 0.0, pitch: -Math.PI / 2, roll: 0.0 };

    // We should have a difference between current position and destination position
    // otherwise an empty flight will be created (see CameraFlightPath.createTween in Cesium sources)
    let diff = Math.min(destination.x, destination.y, destination.z) * CesiumMath.EPSILON6;
    diff = Math.abs(Math.round(diff) * 10);
    destination.x += diff;
    destination.y += diff;
    destination.z += diff;

    this.flyToView({ destination, orientation });
  }

  onSceneModeChange(_: unknown, oldMode: SceneMode, newMode: SceneMode): void {
    const sceneMode: CameraSceneMode = newMode === SceneMode.SCENE2D ? '2d' : '3d';
    if (this.store.sceneMode !== sceneMode) {
      this.store.setSceneMode(sceneMode);
    }
  }

  onFullscreenChange(): void {
    const fullscreenMode = Fullscreen.fullscreen;
    if (this.store.fullscreenMode !== fullscreenMode) {
      this.store.setFullscreenMode(fullscreenMode);
    }
  }
}
