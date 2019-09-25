import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

@inject('challengeStore') @observer
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.onPlayModeClick = this.onPlayModeClick.bind(this);
  }

  render() {
    const { t, challengeStore } = this.props;
    const { playMode } = challengeStore;
    const playModeButtonClassName = classNames({
      button: true,
      'is-primary': !playMode,
      'is-danger': playMode,
      'is-small': true
    });
    const playModeButton = (
      <button
        className={playModeButtonClassName}
        onClick={this.onPlayModeClick}
      >
        <span className="icon">
          <i className={`fas fa-${playMode ? 'stop' : 'play'}`} />
        </span>
        <span>{t(playMode ? 'stop' : 'start')}</span>
      </button>
    );
    return (
      <div className="toolbar">
        <div className="buttons has-addons">
          <button className="button is-white is-small">
            <span className="icon">
              <i className="fas fa-wrench" />
            </span>
            <span>{t('settings')}</span>
          </button>
          {playModeButton}
        </div>
      </div>
    );
  }

  onPlayModeClick() {
    const { challengeStore } = this.props;
    challengeStore.setPlayMode(!challengeStore.playMode);
  }
}

export default withTranslation('toolbar')(Toolbar);
