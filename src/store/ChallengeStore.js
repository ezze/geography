import { observable, computed, action } from 'mobx';
import { createTransformer } from 'mobx-utils';

import BaseStore from './BaseStore';

import challenges from '../challenges.json';

class ChallengeStore extends BaseStore {
  @observable playMode = false;
  @observable id = challenges[0].id;
  @observable pickedItemId = null;
  @observable loading = false;
  @observable loadingError = false;

  constructor(options) {
    super({
      key: 'challenge',
      exclude: [
        'pickedItemId',
        'loading',
        'loadingError'
      ], ...options });
  }

  @computed get challenge() {
    return challenges.find(challenge => challenge.id === this.id) || null;
  }

  @computed get challengeItems() {
    return this.challenge ? this.challenge.items : [];
  }

  @computed get challengeItemIds() {
    return this.challenge ? this.challenge.items.map(item => item.id) : [];
  }

  @computed get challengeItem() {
    const { challenge } = this;
    return createTransformer(id => {
      return challenge ? challenge.items.find(item => item.id === id) || null : null;
    });
  }

  @computed get pickedChallengeItem() {
    return this.pickedItemId ? this.challengeItem(this.pickedItemId) : null;
  }

  @action setPlayMode(playMode) {
    this.playMode = playMode;
  }

  @action setPickedChallengeItemId(id) {
    if (id) {
      const challengeItem = this.challengeItem(id);
      this.pickedItemId = challengeItem ? id : null;
    }
    else {
      this.pickedItemId = null;
    }
  }

  @action setLoading(loading) {
    this.loading = loading;
    this.loadingError = false;
  }

  @action setLoadingError(loadingError) {
    this.loadingError = loadingError;
  }

  @action setChallenge(id) {
    if (challenges.findIndex(challenge => challenge.id === id) >= 0) {
      this.id = id;
    }
  }
}

export default ChallengeStore;
