import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

@inject('generalStore', 'challengeStore') @observer
class Settings extends Component {
  constructor(props) {
    super(props);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  render() {
    const { t, generalStore, challengeStore } = this.props;
    const { settingsVisible, languages, language } = generalStore;
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
              <div className="has-text-right">
                <button className="button is-primary" onClick={this.onCloseClick}>{t('close')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onLanguageChange(event) {
    const { generalStore } = this.props;
    generalStore.setLanguage(event.target.value);
  }

  onCloseClick() {
    const { generalStore } = this.props;
    generalStore.setSettingsVisible(false);
  }
}

export default withTranslation('settings')(Settings);
