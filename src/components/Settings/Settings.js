import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

const durations = [5, 10, 15, 20];

@inject('generalStore', 'challengeStore') @observer
class Settings extends Component {
  constructor(props) {
    super(props);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onSoundEnabledChange = this.onSoundEnabledChange.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  render() {
    const { t, generalStore, challengeStore } = this.props;
    const { settingsVisible, languages, language, soundEnabled } = generalStore;
    const { duration } = challengeStore;

    const className = classNames({
      modal: true,
      'is-active': settingsVisible
    });

    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="panel">
            <p className="panel-heading">{t('title')}</p>
            <div className="panel-block">
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
                <label className="label">{t('duration')}</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={duration} onChange={this.onDurationChange}>
                      {durations.map(duration => (
                        <option key={duration} value={duration}>
                          {duration}
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

  onLanguageChange(event) {
    const { generalStore } = this.props;
    generalStore.setLanguage(event.target.value);
  }

  onDurationChange(event) {
    const { challengeStore } = this.props;
    challengeStore.setDuration(event.target.value);
  }

  onSoundEnabledChange(event) {
    const { generalStore } = this.props;
    generalStore.setSoundEnabled(event.target.checked);
  }

  onCloseClick() {
    const { generalStore } = this.props;
    generalStore.setSettingsVisible(false);
  }
}

export default withTranslation('settings')(Settings);
