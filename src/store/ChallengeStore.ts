import { observable, computed, action, reaction, runInAction, makeObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { computedFn } from 'mobx-utils';
import moment from 'moment';
import { createContext } from 'react';

import { challenges } from '../challenges';
import { ChallengeItem } from '../challenges/types';
import { challengeDurations } from '../const';
import { SOUND_TYPE_SUCCESS, SOUND_TYPE_ERROR, SOUND_TYPE_PICK, SOUND_TYPE_GAME_OVER } from '../const';
import { delay } from '../helpers';
import { translateItem } from '../i18n/utils';
import { playSound } from '../sound';

import { GeneralStore } from './GeneralStore';
import { ReactionStore } from './ReactionStore';
import { ResultStore } from './ResultStore';

export class ChallengeStore extends ReactionStore {
  @observable userName = '';
  @observable playMode = false;
  @observable id = challenges[0].id;
  @observable items: Array<ChallengeItem> = [];
  @observable duration = challengeDurations[1];
  @observable startTime?: number;
  @observable elapsedTime = 0;
  @observable gameOver = false;
  @observable guessedItemId?: string;
  @observable innerCount = 0;
  @observable correctCount = 0;
  @observable pickedItemId?: string;
  @observable userItemId?: string;
  @observable userCorrect = false;

  @observable loading = false;
  @observable loadingError = false;

  elapsedInterval?: number;
  nextTimeout?: number;
  guessedIndexes: Array<number> = [];

  constructor(
    public generalStore: GeneralStore,
    public resultStore: ResultStore
  ) {
    super();
    makeObservable(this);
  }

  @computed get remainingTimeDisplay() {
    return moment.utc(Math.max((this.duration * 60 - this.elapsedTime) * 1000, 0)).format('mm:ss');
  }

  @computed get challenge() {
    return challenges.filter((challenge) => challenge.enabled).find((challenge) => challenge.id === this.id);
  }

  @computed get name(): string {
    const { language } = this.generalStore;
    if (!this.challenge) {
      return '';
    }
    const { name } = this.challenge;
    return typeof name === 'string' ? name : name[language];
  }

  @computed get itemIds(): Array<string> {
    return this.items.map((item) => item.id);
  }

  item = computedFn((id: string): ChallengeItem | undefined => {
    return this.items.find((item) => item.id === id);
  });

  @computed get overallCount(): number {
    return Math.max(this.innerCount - (this.userItemId ? 0 : 1), 0);
  }

  @computed get score(): number {
    return 2 * this.correctCount - this.overallCount;
  }

  @computed get guessedItem(): ChallengeItem | undefined {
    return this.guessedItemId !== undefined ? this.item(this.guessedItemId) : undefined;
  }

  @computed get pickedItem(): ChallengeItem | undefined {
    return this.pickedItemId !== undefined ? this.item(this.pickedItemId) : undefined;
  }

  @computed get userItem(): ChallengeItem | undefined {
    return this.userItemId !== undefined ? this.item(this.userItemId) : undefined;
  }

  @action setUserName(userName: string): void {
    this.userName = userName;
  }

  @action setPlayMode(playMode: boolean): void {
    this.playMode = playMode;
  }

  @action setChallenge(id: string): void {
    if (challenges.findIndex((challenge) => challenge.id === id) >= 0) {
      const playMode = this.playMode;
      if (playMode) {
        this.playMode = false;
      }
      this.id = id;
      if (playMode) {
        setTimeout(() => (this.playMode = true), 0);
      }
    }
  }

  @action setDuration(duration: number): void {
    this.duration = duration;
  }

  @action setPickedItemId(id?: string): void {
    if (id !== undefined) {
      const challengeItem = this.item(id);
      this.pickedItemId = challengeItem ? id : undefined;
    } else {
      this.pickedItemId = undefined;
    }
  }

  @action setLoading(loading: boolean): void {
    this.loading = loading;
  }

  @action setLoadingError(loadingError: boolean): void {
    this.loadingError = loadingError;
  }

  async init() {
    await makePersistable(this, {
      name: 'challenge',
      properties: ['userName', 'id', 'duration'],
      storage: window.localStorage
    });

    const disposeId = reaction(
      () => this.id,
      (id) => {
        if (id) {
          this.sortItems();
        }
      }
    );

    const disposeLanguage = reaction(
      () => this.generalStore.language,
      () => {
        this.sortItems();
      }
    );

    const disposePlayMode = reaction(
      () => this.playMode,
      (playMode) => {
        if (playMode) {
          this.start().catch((e) => console.error(e));
        } else {
          this.stop();
        }
      }
    );

    const disposeDuration = reaction(
      () => this.duration,
      () => {
        if (this.playMode) {
          this.start().catch((e) => console.error(e));
        }
      }
    );

    const disposeGameOver = reaction(
      () => this.gameOver,
      (gameOver) => {
        if (gameOver) {
          if (this.generalStore.soundEnabled) {
            playSound(SOUND_TYPE_GAME_OVER).catch((e) => console.error(e));
          }
          const { score } = this;
          if (score > 0) {
            this.resultStore.add(this.id, this.duration, this.userName, score);
          }
        }

        if (this.playMode && !gameOver) {
          this.playMode = false;
        }
      }
    );

    const disposePickedItemId = reaction(
      () => this.pickedItemId,
      (pickedItemId) => {
        if (pickedItemId) {
          if (this.generalStore.soundEnabled) {
            playSound(SOUND_TYPE_PICK).catch((e) => console.error(e));
          }
        }
      }
    );

    const disposeUserItemId = reaction(
      () => this.userItemId,
      (userItemId) => {
        if (userItemId) {
          if (this.generalStore.soundEnabled) {
            playSound(this.userCorrect ? SOUND_TYPE_SUCCESS : SOUND_TYPE_ERROR).catch((e) => console.error(e));
          }
        }

        if (this.playMode && userItemId === undefined) {
          if (this.nextTimeout) {
            clearTimeout(this.nextTimeout);
            this.nextTimeout = undefined;
          }
          this.guessNextItem();
        }
      }
    );

    this.sortItems();
    if (this.playMode) {
      await this.start();
    }

    return this.initReactionDisposers([
      disposeId,
      disposeLanguage,
      disposePlayMode,
      disposeDuration,
      disposeGameOver,
      disposePickedItemId,
      disposeUserItemId
    ]);
  }

  @action sortItems(): void {
    const { language } = this.generalStore;
    const { challenge } = this;
    const items = challenge ? [...challenge.items] : [];
    items.sort((item1, item2) => {
      const name1 = translateItem(item1.name, language);
      const name2 = translateItem(item2.name, language);
      return name1.localeCompare(name2);
    });
    this.items = items;
  }

  @action async start(): Promise<void> {
    this.gameOver = false;
    this.guessedItemId = undefined;
    this.innerCount = 0;
    this.correctCount = 0;
    this.pickedItemId = undefined;
    this.userItemId = undefined;

    this.guessedIndexes = [];

    if (this.loading) {
      await delay();
      return this.start();
    }

    if (!this.challenge) {
      runInAction(() => {
        this.playMode = false;
      });
      return;
    }

    const startTime = moment().unix();

    runInAction(() => {
      this.startTime = startTime;
      this.elapsedTime = 0;
    });

    if (this.elapsedInterval) {
      clearInterval(this.elapsedInterval);
    }

    runInAction(() => {
      this.elapsedInterval = window.setInterval(() => {
        runInAction(() => {
          this.elapsedTime = moment().unix() - startTime;
          if (this.elapsedTime > this.duration * 60) {
            clearInterval(this.elapsedInterval);
            this.gameOver = true;
          }
        });
      }, 100);
    });

    this.guessNextItem();
  }

  @action stop() {
    this.gameOver = false;
    this.guessedItemId = undefined;
    this.innerCount = 0;
    this.correctCount = 0;
    this.pickedItemId = undefined;
    this.userItemId = undefined;

    this.startTime = undefined;
    this.elapsedTime = 0;
    if (this.elapsedInterval) {
      window.clearInterval(this.elapsedInterval);
      this.elapsedInterval = undefined;
    }
  }

  @action resetGameOver() {
    this.gameOver = false;
  }

  @action guess(): void {
    this.userCorrect = this.guessedItemId === this.pickedItemId;
    if (this.userCorrect) {
      this.correctCount++;
    }
    this.userItemId = this.pickedItemId;
    this.nextTimeout = window.setTimeout(() => {
      runInAction(() => {
        this.userItemId = undefined;
      });
    }, 1500);
  }

  @action guessNextItem(): void {
    if (this.guessedIndexes.length === this.itemIds.length) {
      this.guessedIndexes = [];
    }

    let guessedIndex;
    do {
      guessedIndex = Math.floor(Math.random() * this.itemIds.length);
    } while (this.guessedIndexes.includes(guessedIndex));

    this.guessedIndexes.push(guessedIndex);
    this.guessedItemId = this.itemIds[guessedIndex];
    this.innerCount++;
  }
}

export const ChallengeStoreContext = createContext(undefined as unknown as ChallengeStore);
