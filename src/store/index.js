import { reaction } from 'mobx';

import { languages } from '../constants';

import GeneralStore from './GeneralStore';
import CameraStore from './CameraStore';
import ChallengeStore from './ChallengeStore';

export const stores = {};

export async function createStores() {
  stores.generalStore = new GeneralStore({ languages });
  stores.cameraStore = new CameraStore();
  stores.challengeStore = new ChallengeStore();

  const storeNames = Object.keys(stores);

  return new Promise(resolve => {
    const disposeStoreInit = reaction(() => storeNames.map(storeName => stores[storeName].storeInitialized), inits => {
      for (let i = 0; i < inits.length; i++) {
        if (!inits[i]) {
          return;
        }
      }
      disposeStoreInit();
      resolve(stores);
    });
  });
}
