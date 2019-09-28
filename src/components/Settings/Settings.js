import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

import Loading from '../Loading';

import challenges from '../../challenges.json';

import { challengeDurations } from '../../constants';

@inject('generalStore', 'challengeStore') @observer
class Settings extends Component {
  constructor(props) {
    super(props);
    this.onChallengeChange = this.onChallengeChange.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onSoundEnabledChange = this.onSoundEnabledChange.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onChallengeChange(event) {
    const { challengeStore } = this.props;
    challengeStore.setChallenge(event.target.value);
  }

  onDurationChange(event) {
    const { challengeStore } = this.props;
    challengeStore.setDuration(event.target.value);
  }

  onLanguageChange(event) {
    const { generalStore } = this.props;
    generalStore.setLanguage(event.target.value);
  }

  onSoundEnabledChange(event) {
    const { generalStore } = this.props;
    generalStore.setSoundEnabled(event.target.checked);
  }

  onCloseClick() {
    const { generalStore } = this.props;
    generalStore.setSettingsVisible(false);
  }

  render() {
    const { t, generalStore, challengeStore } = this.props;
    const { settingsVisible, languages, language, soundEnabled, developerMode } = generalStore;
    const { id: challengeId, duration, loading } = challengeStore;

    const className = classNames({
      modal: true,
      'is-active': settingsVisible
    });

    const challengeSelectClassName = classNames({
      select: true,
      'is-fullwidth': true,
      'is-loading': loading
    });

    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="panel">
            <p className="panel-heading">{t('title')}</p>
            <div className="panel-block">
              <div className="field">
                <label className="label">{t('challenge')}</label>
                <div className="control">
                  <div className={challengeSelectClassName}>
                    <select value={challengeId} disabled={loading} onChange={this.onChallengeChange}>
                      {challenges.map(challenge => (
                        <option key={challenge.id} value={challenge.id}>
                          {challenge.name[language]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">{t('duration')}</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={duration} onChange={this.onDurationChange}>
                      {challengeDurations.concat(developerMode ? [0.1]: []).map(duration => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">{t('language')}</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={language} onChange={this.onLanguageChange}>
                      {languages.map(languageItem => (
                        <option key={languageItem.id} value={languageItem.id}>
                          {languageItem.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="checkbox">
                  <input type="checkbox" checked={soundEnabled} onChange={this.onSoundEnabledChange} />
                  <span>{t('sound-enabled')}</span>
                </label>
              </div>
              <div className="has-text-right">
                <button className="button is-primary" onClick={this.onCloseClick}>{t('close')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('settings')(Settings);
