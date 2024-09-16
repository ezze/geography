import {
  CesiumWidget,
  CameraEventType,
  ScreenSpaceEventType,
  ScreenSpaceEventHandler,
  ArcGisMapServerImageryProvider,
  requestAnimationFrame
} from 'cesium';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { MODAL_GLOBE_INITIALIZATION_ERROR, MODAL_GLOBE_RENDERING_ERROR } from '../../const';
import { getChallengeController } from '../../global';
import ModalNotification from '../ModalNotification';

import './sass/index.sass';

@observer
class Globe extends Component {
  static propTypes = {
    onCreate: PropTypes.func,
    onDestroy: PropTypes.func
  };

  globeRef = React.createRef();

  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onLeftClick = this.onLeftClick.bind(this);
  }

  componentDidMount() {
    this.createCesium();
  }

  componentWillUnmount() {
    this.destroyCesium();
  }

  createCesium() {
    try {
      this.cesiumWidget = new CesiumWidget(this.globeRef.current, {
        imageryProvider: new ArcGisMapServerImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        }),
        creditContainer: document.createElement('div'),
        orderIndependentTranslucency: true,
        useDefaultRenderLoop: false
      });

      // Swapping drag and tilt events' sources
      const scene = this.cesiumWidget.scene;
      scene.screenSpaceCameraController.zoomEventTypes = [
        CameraEventType.MIDDLE_DRAG,
        CameraEventType.WHEEL,
        CameraEventType.PINCH
      ];
      scene.screenSpaceCameraController.tiltEventTypes = CameraEventType.RIGHT_DRAG;

      this.canvasEventHandler = new ScreenSpaceEventHandler(this.cesiumWidget.canvas);
      this.canvasEventHandler.setInputAction(this.onMouseMove, ScreenSpaceEventType.MOUSE_MOVE);
      this.canvasEventHandler.setInputAction(this.onLeftClick, ScreenSpaceEventType.LEFT_CLICK);

      if (typeof this.props.onCreate === 'function') {
        this.props.onCreate(this.cesiumWidget);
      }
    } catch (e) {
      console.error(e);
      this.props.generalStore.setModal(MODAL_GLOBE_INITIALIZATION_ERROR);
    }

    requestAnimationFrame(() => this.animate());
  }

  destroyCesium() {
    this.canvasEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
    this.canvasEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
    this.cesiumWidget.destroy();

    if (typeof this.props.onDestroy === 'function') {
      this.props.onDestroy();
    }
  }

  animate() {
    try {
      this.cesiumWidget.resize();
      this.cesiumWidget.render();
      requestAnimationFrame(() => this.animate());
    } catch (e) {
      console.error(e);
      this.props.generalStore.setModal(MODAL_GLOBE_RENDERING_ERROR);
    }
  }

  render() {
    const { generalStore } = this.props;
    const { modal } = generalStore;
    const className = classNames({
      globe: true,
      'globe-picked': this.props.challengeStore.pickedItemId
    });
    return (
      <div className={className}>
        <div ref={this.globeRef} className="globe-webgl"></div>
        <ModalNotification
          id="globe-initialization-error"
          style="danger"
          visible={modal === MODAL_GLOBE_INITIALIZATION_ERROR}
        />
        <ModalNotification id="globe-rendering-error" style="danger" visible={modal === MODAL_GLOBE_RENDERING_ERROR} />
      </div>
    );
  }

  onMouseMove(event) {
    const challengeContoller = getChallengeController();
    if (!challengeContoller) {
      return;
    }

    const { challengeStore } = this.props;

    const picked = this.cesiumWidget.scene.pick(event.endPosition);
    if (!picked || !picked.id || !picked.id.id) {
      challengeStore.setPickedItemId(null);
      return;
    }

    const id = challengeContoller.getGeoObjectIdByEntityId(picked.id.id);
    challengeStore.setPickedItemId(id);
  }

  onLeftClick(event) {
    const { challengeStore } = this.props;
    if (!challengeStore.playMode) {
      return;
    }

    if (challengeStore.userItemId) {
      challengeStore.userItemId = null;
      return;
    }

    const picked = this.cesiumWidget.scene.pick(event.position);
    if (!picked || !picked.id || !picked.id.id) {
      return;
    }

    challengeStore.guess();
  }
}

export default Globe;
