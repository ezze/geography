import { languages } from '../constants';

import GeneralStore from './GeneralStore';
import CameraStore from './CameraStore';
import ChallengeStore from './ChallengeStore';

export const stores = {};

export async function createStores() {
  stores.generalStore = new GeneralStore({ languages });
  stores.cameraStore = new CameraStore();
  stores.challengeStore = new ChallengeStore();
  return stores;
}
