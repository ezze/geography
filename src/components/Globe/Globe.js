import Cesium from 'cesium';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { getChallengeController } from '../../global';

@inject('challengeStore') @observer
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
    this.cesiumWidget = new Cesium.CesiumWidget(this.globeRef.current, {
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      }),
      creditContainer: document.createElement('div'),
      orderIndependentTranslucency: true,
      useDefaultRenderLoop: false
    });

    // Swapping drag and tilt events' sources
    const scene = this.cesiumWidget.scene;
    scene.screenSpaceCameraController.zoomEventTypes = [
      Cesium.CameraEventType.MIDDLE_DRAG,
      Cesium.CameraEventType.WHEEL,
      Cesium.CameraEventType.PINCH
    ];
    scene.screenSpaceCameraController.tiltEventTypes = Cesium.CameraEventType.RIGHT_DRAG;

    this.canvasEventHandler = new Cesium.ScreenSpaceEventHandler(this.cesiumWidget.canvas);
    this.canvasEventHandler.setInputAction(this.onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this.canvasEventHandler.setInputAction(this.onLeftClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    if (typeof this.props.onCreate === 'function') {
      this.props.onCreate(this.cesiumWidget);
    }

    Cesium.requestAnimationFrame(() => this.animate());
  }

  destroyCesium() {
    this.canvasEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this.canvasEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.cesiumWidget.destroy();

    if (typeof this.props.onDestroy === 'function') {
      this.props.onDestroy();
    }
  }

  animate() {
    this.cesiumWidget.resize();
    this.cesiumWidget.render();
    Cesium.requestAnimationFrame(() => this.animate());
  }

  render() {
    return (
      <div ref={this.globeRef} className="globe"></div>
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
