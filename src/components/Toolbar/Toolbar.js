import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

import { getChallengeController } from '../../global';

import {
  MODAL_SETTINGS,
  MODAL_USER_NAME,
  MODAL_HALL_OF_FAME,
  MODAL_ABOUT
} from '../../constants';

import "./sass/index.sass"

@inject('generalStore', 'challengeStore') @observer
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.onPlayModeClick = this.onPlayModeClick.bind(this);
    this.onRestoreViewClick = this.onRestoreViewClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onEditUserNameClick = this.onEditUserNameClick.bind(this);
    this.onHallOfFameClick = this.onHallOfFameClick.bind(this);
    this.onAboutClick = this.onAboutClick.bind(this);
  }

  onPlayModeClick() {
    const { challengeStore } = this.props;
    challengeStore.setPlayMode(!challengeStore.playMode);
  }

  onRestoreViewClick() {
    const challengeController = getChallengeController();
    challengeController.restoreView();
  }

  onSettingsClick() {
    const { generalStore } = this.props;
    generalStore.setModal(MODAL_SETTINGS);
  }

  onEditUserNameClick() {
    const { generalStore } = this.props;
    generalStore.setModal(MODAL_USER_NAME);
  }

  onHallOfFameClick() {
    const { generalStore } = this.props;
    generalStore.setModal(MODAL_HALL_OF_FAME);
  }

  onAboutClick() {
    const { generalStore } = this.props;
    generalStore.setModal(MODAL_ABOUT);
  }

  render() {
    const { t, challengeStore } = this.props;
    const { userName, playMode, challenge } = challengeStore;

    const className = classNames({
      toolbar: true,
      'toolbar-narrow': !playMode && !!challenge
    });

    const playModeButtonClassName = classNames({
      button: true,
      'is-primary': !playMode,
      'is-danger': playMode
    });

    const playModeButton = (
      <button className={playModeButtonClassName} title={t(playMode ? 'stop' : 'start')} onClick={this.onPlayModeClick}>
        <span className="icon">
          <i className={`fas fa-${playMode ? 'stop' : 'play'}`} />
        </span>
      </button>
    );

    return (
      <div className={className}>
        <div>
          <div className="buttons has-addons">
            {playModeButton}
            <button className="button is-white" title={t('hall-of-fame')} onClick={this.onHallOfFameClick}>
            <span className="icon">
              <i className="fas fa-list" />
            </span>
            </button>
          </div>
          <button className="button is-white" title={t('restore-view')} onClick={this.onRestoreViewClick}>
              <span className="icon">
                <i className="fas fa-eye" />
              </span>
          </button>
          <div className="field has-addons">
            <div className="control">
              <input className="toolbar-user-name input" disabled={true} value={userName} />
            </div>
            <div className="control">
              <button className="button is-primary" title={t('edit-user-name')} onClick={this.onEditUserNameClick}>
                <span className="icon">
                  <i className="fas fa-edit" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <button className="button is-white" title={t('settings')} onClick={this.onSettingsClick}>
            <span className="icon">
              <i className="fas fa-wrench" />
            </span>
          </button>
          <button className="button is-white" title={t('about')} onClick={this.onAboutClick}>
            <span className="icon">
              <i className="fas fa-question" />
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default withTranslation('toolbar')(Toolbar);
