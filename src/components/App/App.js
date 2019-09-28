import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Globe from '../Globe';
import Toolbar from '../Toolbar';
import State from '../State';
import ChallengeSidebar from '../ChallengeSidebar';
import ChallengeItemLabel from '../ChallengeItemLabel';
import Settings from '../Settings';
import Loading from '../Loading';
import GameOver from '../GameOver';

import { onGlobeCreate, onGlobeDestroy } from '../../global';

@inject('generalStore') @observer
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
        <GameOver />
      </div>
    );
  }
}

export default App;
