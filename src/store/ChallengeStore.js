import { observable, computed, action } from 'mobx';

import BaseStore from './BaseStore';

import challenges from '../challenges.json';

class ChallengeStore extends BaseStore {
  @observable loading = false;
  @observable loadingError = false;
  @observable challengeId = challenges[0].id;

  constructor(options) {
    super({
      key: 'challenge',
      exclude: [
        'loading',
        'loadingError'
      ], ...options });
  }

  @computed get challenge() {
    return challenges.find(challenge => challenge.id === this.challengeId) || null;
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
