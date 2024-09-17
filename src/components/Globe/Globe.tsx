import {
  ArcGisMapServerImageryProvider,
  CameraEventType,
  CesiumWidget,
  ImageryLayer,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType
} from 'cesium';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';

import './globe.sass';

import { getChallengeController } from '../../global';
import { CameraStore, CameraStoreContext } from '../../store/CameraStore';
import { ChallengeStore, ChallengeStoreContext } from '../../store/ChallengeStore';
import { GeneralStoreContext } from '../../store/GeneralStore';
import { ModalType } from '../../types';
import { ModalNotification } from '../ModalNotification/ModalNotification';

export type GlobeProps = {
  onCreate?: (cesiumWidget: CesiumWidget, cameraStore: CameraStore, challengeStore: ChallengeStore) => void;
  onDestroy?: () => void;
};

export const Globe = observer((props: GlobeProps) => {
  const { onCreate, onDestroy } = props;

  const globeRef = useRef<HTMLDivElement>(null);

  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);
  const cameraStore = useContext(CameraStoreContext);

  const { modal } = generalStore;
  const className = classNames({
    globe: true,
    'globe-picked': challengeStore.pickedItemId
  });

  useEffect(() => {
    const { current: globeElement } = globeRef;
    if (!globeElement) {
      return;
    }

    let cesiumWidget: CesiumWidget;
    let canvasEventHandler: ScreenSpaceEventHandler;

    const onMouseMove = (event: ScreenSpaceEventHandler.MotionEvent) => {
      const challengeController = getChallengeController();
      if (!challengeController) {
        return;
      }

      const picked = cesiumWidget.scene.pick(event.endPosition);
      if (!picked || !picked.id || !picked.id.id) {
        challengeStore.setPickedItemId(undefined);
        return;
      }

      const id = challengeController.getGeoObjectIdByEntityId(picked.id.id);
      challengeStore.setPickedItemId(id);
    };

    const onLeftClick = (event: ScreenSpaceEventHandler.PositionedEvent): void => {
      if (!challengeStore.playMode) {
        return;
      }

      if (challengeStore.userItemId) {
        challengeStore.userItemId = undefined;
        return;
      }

      const picked = cesiumWidget.scene.pick(event.position);
      if (!picked || !picked.id || !picked.id.id) {
        return;
      }

      challengeStore.guess();
    };

    try {
      cesiumWidget = new CesiumWidget(globeElement, {
        baseLayer: ImageryLayer.fromProviderAsync(
          ArcGisMapServerImageryProvider.fromUrl(
            'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
          ),
          {}
        ),
        creditContainer: document.createElement('div'),
        orderIndependentTranslucency: true,
        useDefaultRenderLoop: false
      });

      // Swapping drag and tilt events' sources
      const { scene } = cesiumWidget;
      scene.screenSpaceCameraController.zoomEventTypes = [
        CameraEventType.MIDDLE_DRAG,
        CameraEventType.WHEEL,
        CameraEventType.PINCH
      ];
      scene.screenSpaceCameraController.tiltEventTypes = CameraEventType.RIGHT_DRAG;

      canvasEventHandler = new ScreenSpaceEventHandler(cesiumWidget.canvas);
      canvasEventHandler.setInputAction(onMouseMove, ScreenSpaceEventType.MOUSE_MOVE);
      canvasEventHandler.setInputAction(onLeftClick, ScreenSpaceEventType.LEFT_CLICK);

      if (typeof onCreate === 'function') {
        onCreate(cesiumWidget, cameraStore, challengeStore);
      }

      const animate = () => {
        try {
          cesiumWidget.resize();
          cesiumWidget.render();
          requestAnimationFrame(() => animate());
        } catch (e) {
          generalStore.setModal(ModalType.GlobeRenderingError);
        }
      };

      requestAnimationFrame(() => animate());
    } catch (e) {
      console.error(e);
      generalStore.setModal(ModalType.GlobeInitializationError);
    }

    return () => {
      canvasEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
      canvasEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
      cesiumWidget.destroy();

      if (typeof onDestroy === 'function') {
        onDestroy();
      }
    };
  }, []);

  return (
    <div className={className}>
      <div ref={globeRef} className="globe-webgl"></div>
      <ModalNotification
        id={ModalType.GlobeInitializationError}
        style="danger"
        visible={modal === ModalType.GlobeInitializationError}
      />
      <ModalNotification
        id={ModalType.GlobeRenderingError}
        style="danger"
        visible={modal === ModalType.GlobeRenderingError}
      />
    </div>
  );
});
