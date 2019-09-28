import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Globe from '../Globe';
import Toolbar from '../Toolbar';
import State from '../State';
import ChallengeSidebar from '../ChallengeSidebar';
import ChallengeItemLabel from '../ChallengeItemLabel';
import Settings from '../Settings';
import Loading from '../Loading';
import ModalNotification from '../ModalNotification';
import GameOver from '../GameOver';

import { onGlobeCreate, onGlobeDestroy } from '../../global';

@inject('generalStore') @observer
class App extends Component {
  state = {
    showAudioNotification: true
  };

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onCloseAudioNotification = this.onCloseAudioNotification.bind(this);
  }

  componentDidMount() {
    const { soundEnabled, developerMode } = this.props.generalStore;
    if (!soundEnabled || developerMode) {
      this.setState({ showAudioNotification: false });
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
    this.setState({ showAudioNotification: false });
  }

  render() {
    return this.state.showAudioNotification ? (
      <ModalNotification
        id="audio"
        style="warning"
        isOpen={this.state.showAudioNotification}
        close={this.onCloseAudioNotification}
      />
    ) : (
      <div className="app">
        <Globe onCreate={onGlobeCreate} onDestroy={onGlobeDestroy} />
        <Toolbar />
        <State />
        <ChallengeSidebar />
        <ChallengeItemLabel />
        <Settings />
        <Loading />
        <GameOver />
      </div>
    );
  }
}

export default App;
