import { observable, computed, action } from 'mobx';
import { createTransformer } from 'mobx-utils';

import BaseStore from './BaseStore';

import challenges from '../challenges.json';

class ChallengeStore extends BaseStore {
  @observable challengeId = challenges[0].id;
  @observable pickedChallengeItemId = null;
  @observable loading = false;
  @observable loadingError = false;

  constructor(options) {
    super({
      key: 'challenge',
      exclude: [
        'pickedChallengeItemId',
        'loading',
        'loadingError'
      ], ...options });
  }

  @computed get challenge() {
    return challenges.find(challenge => challenge.id === this.challengeId) || null;
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

  @action setPickedChallengeItemId(id) {
    if (id) {
      const challengeItem = this.challengeItem(id);
      this.pickedChallengeItemId = challengeItem ? id : null;
    }
    else {
      this.pickedChallengeItemId = null;
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
      this.challengeId = id;
    }
  }
}

export default ChallengeStore;
