import React, { Component } from 'react';

import Globe from '../Globe';
import Toolbar from '../Toolbar';
import State from '../State';
import ChallengeSidebar from '../ChallengeSidebar';
import ChallengeItemLabel from '../ChallengeItemLabel';
import Settings from '../Settings';
import GameOver from '../GameOver';

import { onGlobeCreate, onGlobeDestroy } from '../../global';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Globe onCreate={onGlobeCreate} onDestroy={onGlobeDestroy} />
        <Toolbar />
        <State />
        <ChallengeSidebar />
        <ChallengeItemLabel />
        <Settings />
        <GameOver />
      </div>
    );
  }
}

export default App;
