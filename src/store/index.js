import { reaction } from 'mobx';

import { languages } from '../constants';

import GeneralStore from './GeneralStore';
import CameraStore from './CameraStore';
import ChallengeStore from './ChallengeStore';

export const stores = {};

export async function createStores() {
  const generalStore = stores.generalStore = new GeneralStore({ languages });
  stores.cameraStore = new CameraStore();
  stores.challengeStore = new ChallengeStore({ generalStore });

  const storeNames = Object.keys(stores);

  return new Promise(resolve => {
    const disposeStoreInit = reaction(() => storeNames.map(storeName => {
      return stores[storeName].storeInitialized;
    }), storeInits => {
      for (let i = 0; i < storeInits.length; i++) {
        if (!storeInits[i]) {
          return;
        }
      }
      disposeStoreInit();
      resolve(stores);
    });
  });
}
