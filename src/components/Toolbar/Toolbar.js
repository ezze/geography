import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

import { getChallengeController } from '../../global';

import {
  MODAL_SETTINGS,
  MODAL_USER_NAME
} from '../../constants';

@inject('generalStore', 'challengeStore') @observer
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.onPlayModeClick = this.onPlayModeClick.bind(this);
    this.onRestoreViewClick = this.onRestoreViewClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onEditUserNameClick = this.onEditUserNameClick.bind(this);
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

  render() {
    const { t, challengeStore } = this.props;
    const { userName, playMode } = challengeStore;
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
      <div className="toolbar">
        <div className="buttons has-addons">
          {playModeButton}
          <button className="button is-white" title={t('restore-view')} onClick={this.onRestoreViewClick}>
            <span className="icon">
              <i className="fas fa-eye" />
            </span>
          </button>
        </div>
        <button className="button is-white" title={t('settings')} onClick={this.onSettingsClick}>
          <span className="icon">
            <i className="fas fa-wrench" />
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
    );
  }
}

export default withTranslation('toolbar')(Toolbar);
