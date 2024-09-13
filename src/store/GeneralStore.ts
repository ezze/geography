import i18n, { TFunction } from 'i18next';
import { observable, action } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { createContext } from 'react';
import { Context } from 'react';

import { Language } from '../i18n/types';

import { BaseStore } from './BaseStore';

export type GeneralStoreOptions = {
  language?: Language;
};

class GeneralStore extends BaseStore {
  @observable languages: Array<Language> = ['en', 'ru'];
  @observable language: Language = this.languages[0];
  @observable soundEnabled = true;
  @observable developerMode = false;
  @observable modal = false;

  constructor(options?: GeneralStoreOptions) {
    super();

    const { language } = options || {};

    if (language) {
      this.language = language;
    }

    if (i18n.isInitialized) {
      this.setLanguage(this.language);
    } else {
      i18n.on('initialized', () => {
        this.setLanguage(this.language);
      });
    }
  }

  async init() {
    await makePersistable(this, {
      name: 'general',
      storage: window.localStorage,
      properties: ['language', 'soundEnabled', 'developerMode']
    });

    return super.init();
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

  @action setModal(modal: boolean): void {
    this.modal = modal;
  }
}

export default GeneralStore;

export const GeneralStoreContext = createContext(undefined as unknown as GeneralStore);
