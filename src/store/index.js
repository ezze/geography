import { languages } from '../constants';

import GeneralStore from './GeneralStore';
import CameraStore from './CameraStore';

export const stores = {};

export async function createStores() {
  stores.generalStore = new GeneralStore({ languages });
  stores.cameraStore = new CameraStore();
  return stores;
}
