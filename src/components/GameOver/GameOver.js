import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import ModalNotification from '../ModalNotification';

import { MODAL_HALL_OF_FAME } from '../../constants';

@inject('generalStore', 'challengeStore') @observer
class GameOver extends Component {
  constructor(props) {
    super(props);
    this.onHallOfFameClick = this.onHallOfFameClick.bind(this);
    this.close = this.close.bind(this);
  }

  onHallOfFameClick() {
    this.close();
    this.props.generalStore.setModal(MODAL_HALL_OF_FAME);
  }

  close() {
    const { challengeStore } = this.props;
    challengeStore.gameOver = false;
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
        <div className="has-text-centered">
          <button className="button" onClick={this.onHallOfFameClick}>{t('hall-of-fame')}</button>
        </div>
      </ModalNotification>
    );
  }
}

export default withTranslation('game-over')(GameOver);
