import { action, makeObservable, observable } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
import { createContext } from 'react';

import { CameraSceneMode, CameraView } from '../types';

import { BaseStore } from './BaseStore';

export class CameraStore extends BaseStore {
  @observable fullscreenMode = false;
  @observable sceneMode: CameraSceneMode = '3d';
  @observable view: CameraView = {
    destination: {
      units: 'degrees',
      latitude: 58.7,
      longitude: 43.4,
      height: 15000000.0
    }
  };

  constructor() {
    super();
    makeObservable(this);
  }

  async init(): Promise<void> {
    await makePersistable(this, {
      name: 'camera',
      properties: ['sceneMode', 'view'],
      storage: window.localStorage
    });
    return super.init();
  }

  async dispose(): Promise<void> {
    stopPersisting(this);
    return super.dispose();
  }

  @action setFullscreenMode(fullscreenMode: boolean): void {
    this.fullscreenMode = fullscreenMode;
  }

  @action setSceneMode(sceneMode: CameraSceneMode): void {
    this.sceneMode = sceneMode;
  }

  @action setView(view: CameraView): void {
    this.view = view;
  }
}

export const CameraStoreContext = createContext(undefined as unknown as CameraStore);
