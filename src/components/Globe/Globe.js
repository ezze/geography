import Cesium from 'cesium';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Globe extends Component {
  static propTypes = {
    onCreate: PropTypes.func,
    onDestroy: PropTypes.func
  };

  globeRef = React.createRef();

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
    this.canvasEventHandler.setInputAction(this.onRightClick, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    if (typeof this.props.onCreate === 'function') {
      this.props.onCreate(this.cesiumWidget);
    }

    Cesium.requestAnimationFrame(() => this.animate());
  }

  destroyCesium() {
    this.canvasEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
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
}

export default Globe;
