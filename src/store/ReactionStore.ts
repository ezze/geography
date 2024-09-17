import { IReactionDisposer } from 'mobx';

import { BaseStore } from './BaseStore';

export abstract class ReactionStore extends BaseStore {
  protected reactionDisposers: Array<IReactionDisposer> = [];

  async initReactionDisposers(reactionDisposers: Array<IReactionDisposer>): Promise<void> {
    this.reactionDisposers = reactionDisposers;
    return super.init();
  }
}
