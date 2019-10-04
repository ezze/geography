import { reaction } from 'mobx';

import { languages } from '../constants';

import GeneralStore from './GeneralStore';
import CameraStore from './CameraStore';
import ChallengeStore from './ChallengeStore';
import RecordStore from './RecordStore';

export const stores = {};

export async function createStores() {
  const generalStore = stores.generalStore = new GeneralStore({ languages });
  stores.cameraStore = new CameraStore();
  const recordStore = stores.recordStore = new RecordStore();

  await new Promise(resolve => {
    const disposeGeneralInit = reaction(() => generalStore.storeInitialized, () => {
      disposeGeneralInit();
      resolve();
    });
  });

  stores.challengeStore = new ChallengeStore({ generalStore, recordStore });

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
