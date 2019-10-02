import { observable, action } from 'mobx';

import { CAMERA_SCENE_MODE_3D } from '../constants';

import BaseStore from './BaseStore';

class CameraStore extends BaseStore {
  @observable fullscreenMode = false;
  @observable sceneMode = CAMERA_SCENE_MODE_3D;
  @observable view = {
    destination: {
      type: 'cartographicDegrees',
      value: {
        latitude: 58.7,
        longitude: 43.4,
        height: 15000000.0
      }
    }
  };

  constructor(options) {
    super({ key: 'camera', exclude: ['fullscreenMode'], ...options });
  }

  @action setFullscreenMode(fullscreenMode) {
    this.fullscreenMode = fullscreenMode;
  }

  @action setSceneMode(sceneMode) {
    this.sceneMode = sceneMode;
  }

  @action setView(view) {
    this.view = view;
  }
}

export default CameraStore;
