import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

@inject('challengeStore') @observer
class GameOver extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  render() {
    const { t, challengeStore } = this.props;
    const { gameOver, correctCount, overallCountForUser } = challengeStore;
    const className = classNames({
      modal: true,
      'is-active': gameOver
    });
    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="notification is-warning">
            <button className="delete" onClick={this.close}></button>
            <p>{t('main')}</p>
            <p>{t('correct-count', { count: correctCount })}</p>
            <p>{t('overall-count', { count: overallCountForUser })}</p>
          </div>
        </div>
      </div>
    );
  }

  close() {
    const { challengeStore } = this.props;
    challengeStore.gameOver = false;
  }
}

export default withTranslation('game-over')(GameOver);
