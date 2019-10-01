import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Globe from '../Globe';
import Toolbar from '../Toolbar';
import State from '../State';
import ChallengeSidebar from '../ChallengeSidebar';
import ChallengeItemLabel from '../ChallengeItemLabel';
import Settings from '../Settings';
import Loading from '../Loading';
import UserNamePrompt from '../UserNamePrompt';
import HallOfFame from '../HallOfFame';
import ModalNotification from '../ModalNotification';
import GameOver from '../GameOver';

import { onGlobeCreate, onGlobeDestroy } from '../../global';

import {
  MODAL_USER_NAME,
  MODAL_AUDIO_NOTIFICATION,
  modalErrors
} from '../../constants';

@inject('generalStore', 'challengeStore') @observer
class App extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onCloseAudioNotification = this.onCloseAudioNotification.bind(this);
  }

  componentDidMount() {
    const { generalStore } = this.props;
    const { soundEnabled, developerMode, modal } = generalStore;
    if (soundEnabled && !developerMode && !modalErrors.includes(modal)) {
      this.previousModal = modal;
      generalStore.setModal(MODAL_AUDIO_NOTIFICATION);
    }
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    if (event.keyCode === 68 && event.shiftKey) {
      const { generalStore } = this.props;
      const { developerMode } = generalStore;
      generalStore.setDeveloperMode(!developerMode);
    }
  }

  onCloseAudioNotification() {
    const { generalStore, challengeStore } = this.props;
    if (!challengeStore.userName) {
      generalStore.setModal(MODAL_USER_NAME);
    }
    else {
      generalStore.setModal(this.previousModal);
    }
    delete this.previousModal;
  }

  render() {
    const { generalStore } = this.props;
    const { modal } = generalStore;
    return (
      <div className="app">
        <Globe onCreate={onGlobeCreate} onDestroy={onGlobeDestroy} />
        <Toolbar />
        <State />
        <ChallengeSidebar />
        <ChallengeItemLabel />
        <Settings />
        <Loading />
        <UserNamePrompt />
        <HallOfFame />
        <ModalNotification
          id="audio"
          style="warning"
          visible={modal === MODAL_AUDIO_NOTIFICATION}
          close={this.onCloseAudioNotification}
        />
        <GameOver />
      </div>
    );
  }
}

export default App;
