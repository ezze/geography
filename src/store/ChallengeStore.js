import { observable, computed, action, reaction } from 'mobx';
import { createTransformer } from 'mobx-utils';
import moment from 'moment';

import BaseStore from './BaseStore';

import challenges from '../challenges.json';

import { challengeDurations } from '../constants';

import { delay } from '../helpers';

import successSoundUrl from '../sound/success.mp3';
import errorSoundUrl from '../sound/error.mp3';
import pickSoundUrl from '../sound/pick.mp3';
import gameOverSoundUrl from '../sound/game-over.mp3';

const SOUND_TYPE_SUCCESS = 'SOUND_TYPE_SUCCESS';
const SOUND_TYPE_ERROR = 'SOUND_TYPE_ERROR';
const SOUND_TYPE_PICK = 'SOUND_TYPE_PICK';
const SOUND_TYPE_GAME_OVER = 'SOUND_TYPE_GAME_OVER';

const soundTypes = [
  SOUND_TYPE_SUCCESS,
  SOUND_TYPE_ERROR,
  SOUND_TYPE_PICK,
  SOUND_TYPE_GAME_OVER
];

class ChallengeStore extends BaseStore {
  @observable userName = '';
  @observable playMode = false;
  @observable id = challenges[0].id;
  @observable items = [];
  @observable duration = challengeDurations[1];
  @observable startTime = null;
  @observable elapsedTime = 0;
  @observable gameOver = false;
  @observable guessedItemId = null;
  @observable innerCount = 0;
  @observable correctCount = 0;
  @observable pickedItemId = null;
  @observable userItemId = null;
  @observable userCorrect = false;

  @observable loading = false;
  @observable loadingError = false;

  elapsedInterval = null;
  nextTimeout = null;
  guessedIndexes = [];

  sounds = {};
  playingSounds = {};

  @computed get remainingTimeDisplay() {
    return moment.utc(Math.max((this.duration * 60 - this.elapsedTime) * 1000, 0)).format('mm:ss');
  }

  @computed get challenge() {
    return challenges.find(challenge => challenge.id === this.id) || null;
  }

  @computed get itemIds() {
    return this.items.map(item => item.id);
  }

  @computed get item() {
    return createTransformer(id => {
      return this.items.find(item => item.id === id) || null;
    });
  }

  @computed get overallCount() {
    return Math.max(this.innerCount - (this.userItemId ? 0 : 1), 0);
  }

  @computed get score() {
    return this.correctCount - (this.overallCount - this.correctCount) * 2;
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

  @action setUserName(userName) {
    this.userName = userName;
  }

  @action setPlayMode(playMode) {
    this.playMode = playMode;
  }

  @action setChallenge(id) {
    if (challenges.findIndex(challenge => challenge.id === id) >= 0) {
      const playMode = this.playMode;
      if (playMode) {
        this.playMode = false;
      }
      this.id = id;
      if (playMode) {
        setTimeout(() => this.playMode = true, 0);
      }
    }
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

  constructor(options) {
    super({
      key: 'challenge',
      exclude: [
        'items',
        'startTime',
        'elapsedTime',
        'gameOver',
        'guessedItemId',
        'innerCount',
        'correctCount',
        'pickedItemId',
        'userItemId',
        'userCorrect',
        'loading',
        'loadingError'
      ], ...options });

    const { generalStore } = options;
    this.generalStore = generalStore;

    this.disposeId = reaction(() => this.id, id => {
      if (id) {
        this.sortItems();
      }
    });

    this.disposeLanguage = reaction(() => generalStore.language, () => {
      this.sortItems();
    });

    this.disposePlayMode = reaction(() => this.playMode, playMode => {
      if (playMode) {
        this.start().catch(e => console.error(e));
      }
      else {
        this.stop();
      }
    });

    this.disposeDuration = reaction(() => this.duration, () => {
      if (this.playMode) {
        this.start().catch(e => console.error(e));
      }
    });

    this.disposeGameOver = reaction(() => this.gameOver, gameOver => {
      if (gameOver) {
        this.playSound(SOUND_TYPE_GAME_OVER).catch(e => console.error(e));
      }

      if (this.playMode && !gameOver) {
        this.playMode = false;
      }
    });

    this.disposePickedItemId = reaction(() => this.pickedItemId, pickedItemId => {
      if (pickedItemId) {
        this.playSound(SOUND_TYPE_PICK).catch(e => console.error(e));
      }
    });

    this.disposeUserItemId = reaction(() => this.userItemId, userItemId => {
      if (userItemId) {
        this.playSound(this.userCorrect ? SOUND_TYPE_SUCCESS : SOUND_TYPE_ERROR).catch(e => console.error(e));
      }

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
    this.sortItems();
    await this.initSounds();
    if (this.playMode) {
      await this.start();
    }
  }

  async destroy() {
    this.disposeId();
    this.disposeLanguage();
    this.disposePlayMode();
    this.disposeDuration();
    this.disposeGameOver();
    this.disposePickedItemId();
    this.disposeUserItemId();
    super.destroy();
  }

  sortItems() {
    const { language } = this.generalStore;
    this.items = this.challenge ? [].concat(this.challenge.items).sort((item1, item2) => {
      return item1.name[language].localeCompare(item2.name[language]);
    }) : [];
  }

  async start() {
    this.gameOver = false;
    this.guessedItemId = null;
    this.innerCount = 0;
    this.correctCount = 0;
    this.pickedItemId = null;
    this.userItemId = null;

    this.guessedIndexes = [];

    if (this.loading) {
      await delay();
      return this.start();
    }

    if (!this.challenge) {
      this.playMode = false;
      return;
    }

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

    this.guessNextItem();
  }

  stop() {
    this.gameOver = false;
    this.guessedItemId = null;
    this.innerCount = 0;
    this.correctCount = 0;
    this.pickedItemId = null;
    this.userItemId = null;

    this.startTime = null;
    this.elapsedTime = 0;
    if (this.elapsedInterval) {
      clearInterval(this.elapsedInterval);
      this.elapsedInterval = null;
    }
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
    if (this.guessedIndexes.length === this.itemIds.length) {
      this.guessedIndexes = [];
    }

    let guessedIndex;
    do {
      guessedIndex = Math.floor(Math.random() * this.itemIds.length);
    }
    while (this.guessedIndexes.includes(guessedIndex));

    this.guessedIndexes.push(guessedIndex);
    this.guessedItemId = this.itemIds[guessedIndex];
    this.innerCount++;
  }

  async initSounds() {
    if (!Audio) {
      return;
    }

    for (let i = 0; i < soundTypes.length; i++) {
      const type = soundTypes[i];
      let url;
      switch (type) {
        case SOUND_TYPE_SUCCESS: url = successSoundUrl; break;
        case SOUND_TYPE_ERROR: url = errorSoundUrl; break;
        case SOUND_TYPE_PICK: url = pickSoundUrl; break;
        case SOUND_TYPE_GAME_OVER: url = gameOverSoundUrl; break;
      }
      if (!url) {
        continue;
      }

      await new Promise((resolve, reject) => {
        const sound = new Audio();
        const onCanPlay = () => {
          removeListeners();
          this.sounds[type] = sound;
          resolve();
        };
        const onError = () => {
          removeListeners();
          reject();
        };
        const removeListeners = () => {
          sound.removeEventListener('canplaythrough', onCanPlay);
          sound.removeEventListener('error', onError);
        };
        sound.addEventListener('canplaythrough', onCanPlay);
        sound.addEventListener('error', onError);
        sound.src = url;
      });
    }
  }

  async playSound(type) {
    if (!this.generalStore.soundEnabled || this.playingSounds[type]) {
      return;
    }

    const sound = this.sounds[type];
    if (!sound) {
      return;
    }

    this.playingSounds[type] = sound;
    try {
      await sound.play();
    }
    catch (e) {
      console.error(e);
    }
    finally {
      delete this.playingSounds[type];
    }
  }
}

export default ChallengeStore;
