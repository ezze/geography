import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import ModalNotification from '../ModalNotification';

@inject('challengeStore') @observer
class GameOver extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  render() {
    const { t, challengeStore } = this.props;
    const { gameOver, correctCount, overallCount, score } = challengeStore;
    return (
      <ModalNotification style="warning" visible={gameOver} close={this.close}>
        <h1 className="title is-4">{t('main')}</h1>
        <p><b>{t('score', { score })}</b></p>
        <p>{t('overall-count', { count: overallCount })}</p>
        <p>{t('correct-count', { count: correctCount })}</p>
        <p>{t('incorrect-count', { count: overallCount - correctCount })}</p>
      </ModalNotification>
    );
  }

  close() {
    const { challengeStore } = this.props;
    challengeStore.gameOver = false;
  }
}

export default withTranslation('game-over')(GameOver);
