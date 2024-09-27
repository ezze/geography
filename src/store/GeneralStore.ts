import i18n, { TFunction } from 'i18next';
import { observable, action, makeObservable } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
import { createContext } from 'react';

import { Language } from '../i18n/types';
import { ModalType } from '../types';

import { BaseStore } from './BaseStore';

export type GeneralStoreOptions = {
  language?: Language;
};

export class GeneralStore extends BaseStore {
  @observable languages: Array<Language> = ['en', 'ru'];
  @observable language: Language = this.languages[0];
  @observable soundEnabled = true;
  @observable developerMode = false;
  @observable modal?: ModalType;

  constructor(options?: GeneralStoreOptions) {
    super();
    makeObservable(this);

    const { language } = options || {};

    if (language) {
      this.language = language;
    }

    if (i18n.isInitialized) {
      (async () => {
        await this.setLanguage(this.language);
      })();
    } else {
      i18n.on('initialized', () => {
        (async () => {
          await this.setLanguage(this.language);
        })();
      });
    }
  }

  async init(): Promise<void> {
    await makePersistable(this, {
      name: 'general',
      storage: window.localStorage,
      properties: ['language', 'soundEnabled', 'developerMode']
    });

    return super.init();
  }

  async dispose(): Promise<void> {
    stopPersisting(this);
    return super.dispose();
  }

  @action async setLanguage(language: Language): Promise<TFunction> {
    if (this.languages.findIndex((l) => l === language) === -1) {
      throw new TypeError(`Language "${language}" is not supported`);
    }
    if (this.language !== language) {
      this.language = language;
    }
    return i18n.changeLanguage(language);
  }

  @action setSoundEnabled(soundEnabled: boolean): void {
    this.soundEnabled = soundEnabled;
  }

  @action setDeveloperMode(developerMode: boolean): void {
    this.developerMode = developerMode;
  }

  @action setModal(modal?: ModalType): void {
    this.modal = modal;
  }
}

export const GeneralStoreContext = createContext(undefined as unknown as GeneralStore);
