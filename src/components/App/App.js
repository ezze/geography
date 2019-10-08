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
import AudioNotification from '../AudioNotification';
import GameOver from '../GameOver';
import About from '../About';
import YandexMetrika from '../YandexMetrika';

import { onGlobeCreate, onGlobeDestroy } from '../../global';

@inject('generalStore', 'challengeStore') @observer
class App extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
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

  render() {
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
        <AudioNotification />
        <GameOver />
        <About />
        <YandexMetrika />
      </div>
    );
  }
}

export default App;
