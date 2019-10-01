import { observable, action } from 'mobx';
import i18n from 'i18next';

import BaseStore from './BaseStore';

class GeneralStore extends BaseStore {
  @observable languages = [];
  @observable language = null;
  @observable soundEnabled = true;
  @observable developerMode = false;
  @observable modal = null;

  constructor(options = {}) {
    super({ key: 'general', ...options });

    const { languages } = options;

    if (!Array.isArray(languages) || languages.length === 0) {
      throw new TypeError('Languages should be specified as non-empty array.');
    }
    this.languages = languages;

    if (this.language === null) {
      this.language = languages[0].id;
    }

    if (i18n.isInitialized) {
      this.setLanguage(this.language);
    }
    else {
      i18n.on('initialized', () => {
        this.setLanguage(this.language);
      });
    }
  }

  @action setLanguage(id) {
    if (this.languages.findIndex(language => language.id === id) === -1) {
      throw new TypeError(`Language "${id}" is not supported.`);
    }
    if (this.language !== id) {
      this.language = id;
    }
    i18n.changeLanguage(id).catch(e => console.error(e));
  }

  @action setSoundEnabled(soundEnabled) {
    this.soundEnabled = soundEnabled;
  }

  @action setDeveloperMode(developerMode) {
    this.developerMode = developerMode;
  }

  @action setModal(modal) {
    this.modal = modal;
  }
}

export default GeneralStore;
