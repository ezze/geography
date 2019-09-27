import { observable, computed, action, reaction } from 'mobx';
import { createTransformer } from 'mobx-utils';
import moment from 'moment';

import BaseStore from './BaseStore';

import challenges from '../challenges.json';
import { stores } from './index';

class ChallengeStore extends BaseStore {
  @observable playMode = false;
  @observable id = challenges[0].id;
  @observable duration = 5;
  @observable startTime = null;
  @observable elapsedTime = 0;
  @observable gameOver = false;
  @observable guessedItemId = null;
  @observable overallCount = 0;
  @observable correctCount = 0;
  @observable pickedItemId = null;
  @observable userItemId = null;
  @observable userCorrect = false;

  @observable loading = false;
  @observable loadingError = false;

  elapsedInterval = null;
  nextTimeout = null;

  constructor(options) {
    super({
      key: 'challenge',
      exclude: [
        'startTime',
        'elapsedTime',
        'gameOver',
        'guessedItemId',
        'overallCount',
        'correctCount',
        'pickedItemId',
        'userItemId',
        'userCorrect',
        'loading',
        'loadingError'
      ], ...options });

    const { generalStore } = options;
    this.generalStore = generalStore;

    this.disposeLanguage = reaction(() => generalStore.language, language => {
      this.sortChallengeItems(language);
    });

    this.disposePlayMode = reaction(() => this.playMode, playMode => {
      if (playMode) {
        this.start();
      }
      else {
        this.stop();
      }
    });

    this.disposeDuration = reaction(() => this.duration, () => {
      if (this.playMode) {
        this.start();
      }
    });

    this.disposeGameOver = reaction(() => this.gameOver, gameOver => {
      if (this.playMode && !gameOver) {
        this.playMode = false;
      }
    });

    this.disposeUserItemId = reaction(() => this.userItemId, userItemId => {
      if (this.playMode && userItemId === null) {
        if (this.nextTimeout) {
          clearTimeout(this.nextTimeout);
          this.nextTimeout = null;
        }
        this.guessNextItem();
      }
    });
  }

  async init() {
    this.sortChallengeItems(this.generalStore.language);

    if (this.playMode) {
      this.start();
    }
  }

  async destroy() {
    this.disposeLanguage();
    this.disposePlayMode();
    this.disposeDuration();
    this.disposeGameOver();
    this.disposeUserItemId();
    super.destroy();
  }

  sortChallengeItems(language) {
    const { id } = this;
    this.id = null;
    challenges.forEach(challenge => {
      challenge.items.sort((item1, item2) => {
        return item1.name[language].localeCompare(item2.name[language]);
      });
    });
    setTimeout(() => this.id = id, 0);
  }

  start() {
    this.startTime = moment().unix();
    this.elapsedTime = 0;
    if (this.elapsedInterval) {
      clearInterval(this.elapsedInterval);
    }
    this.elapsedInterval = setInterval(() => {
      this.elapsedTime = moment().unix() - this.startTime;
      if (this.elapsedTime > this.duration * 60) {
        clearInterval(this.elapsedInterval);
        this.gameOver = true;
      }
    }, 100);
    this.gameOver = false;
    this.overallCount = 0;
    this.correctCount = 0;
    this.guessNextItem();
  }

  stop() {
    this.startTime = null;
    this.elapsedTime = 0;
    if (this.elapsedInterval) {
      clearInterval(this.elapsedInterval);
      this.elapsedInterval = null;
    }
    this.gameOver = false;
    this.guessedItemId = null;
    this.overallCount = 0;
    this.correctCount = 0;
  }

  guess() {
    this.userCorrect = this.guessedItemId === this.pickedItemId;

    if (this.userCorrect) {
      this.correctCount++;
    }

    this.userItemId = this.pickedItemId;

    this.nextTimeout = setTimeout(() => {
      this.userItemId = null;
    }, 1500);
  }

  guessNextItem() {
    const guessIndex = Math.floor(Math.random() * this.itemIds.length);
    this.guessedItemId = this.itemIds[guessIndex];
    this.overallCount++;
  }

  @computed get remainingTimeDisplay() {
    return moment.utc(Math.max((this.duration * 60 - this.elapsedTime) * 1000, 0)).format('mm:ss');
  }

  @computed get challenge() {
    return challenges.find(challenge => challenge.id === this.id) || null;
  }

  @computed get items() {
    return this.challenge ? this.challenge.items : [];
  }

  @computed get itemIds() {
    return this.challenge ? this.challenge.items.map(item => item.id) : [];
  }

  @computed get item() {
    const { challenge } = this;
    return createTransformer(id => {
      return challenge ? challenge.items.find(item => item.id === id) || null : null;
    });
  }

  @computed get guessedItem() {
    return this.guessedItemId ? this.item(this.guessedItemId) : null;
  }

  @computed get pickedItem() {
    return this.pickedItemId ? this.item(this.pickedItemId) : null;
  }

  @computed get userItem() {
    return this.userItemId ? this.item(this.userItemId) : null;
  }

  @action setPlayMode(playMode) {
    this.playMode = playMode;
  }

  @action setDuration(duration) {
    this.duration = duration;
  }

  @action setPickedItemId(id) {
    if (id) {
      const challengeItem = this.item(id);
      this.pickedItemId = challengeItem ? id : null;
    }
    else {
      this.pickedItemId = null;
    }
  }

  @action setLoading(loading) {
    this.loading = loading;
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
