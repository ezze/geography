import { action, makeObservable, observable } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
import { computedFn } from 'mobx-utils';
import { createContext } from 'react';

import { challengeRecordsCount } from '../const';
import { Result } from '../types';

import { BaseStore } from './BaseStore';

function getDurationKey(duration: number): string {
  return `${duration}`;
}

export class ResultStore extends BaseStore {
  @observable results: Record<string, Record<string, Array<Result>>> = {};

  constructor() {
    super();
    makeObservable(this);
  }

  async init(): Promise<void> {
    await makePersistable(this, {
      name: 'results',
      properties: ['results'],
      storage: window.localStorage
    });
    return super.init();
  }

  async dispose(): Promise<void> {
    stopPersisting(this);
    return super.dispose();
  }

  get = computedFn((id: string, duration: number): Array<Result> => {
    const challengeResults = this.results[id];
    if (!challengeResults) {
      return [];
    }
    const durationResults = challengeResults[getDurationKey(duration)];
    return [...durationResults];
  });

  @action add(id: string, duration: number, name: string, score: number): void {
    const date = new Date();
    const result: Result = { name, score, date };
    const results = this.get(id, duration);
    const index = results.findIndex((result) => result.score < score);
    if (index === -1) {
      if (results.length < challengeRecordsCount) {
        results.push(result);
      }
    } else {
      results.splice(index, 0, result);
      if (results.length > challengeRecordsCount) {
        results.splice(challengeRecordsCount, 1);
      }
    }

    if (!this.results[id]) {
      this.results[id] = {};
    }
    this.results[id][getDurationKey(duration)] = results;
  }
}

export const ResultStoreContext = createContext(undefined as unknown as ResultStore);
