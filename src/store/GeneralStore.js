import { observable, computed, action } from 'mobx';
import i18n from 'i18next';

import BaseStore from './BaseStore';

class GeneralStore extends BaseStore {
  @observable settingsVisible = false;
  @observable languages = [];
  @observable language = null;

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

  @action setSettingsVisible(settingsVisible) {
    this.settingsVisible = settingsVisible;
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
}

export default GeneralStore;
