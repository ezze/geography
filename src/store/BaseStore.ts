import { observable, runInAction } from 'mobx';

import { Store } from './types';

export class BaseStore implements Store {
  @observable initialized = false;

  async init(): Promise<void> {
    // Do nothing by default
    runInAction(() => {
      this.initialized = true;
    });
  }

  async dispose(): Promise<void> {
    // Do nothing by default
  }
}
