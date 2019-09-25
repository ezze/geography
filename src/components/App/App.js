import React, { Component } from 'react';

import Globe from '../Globe';
import ChallengeSidebar from '../ChallengeSidebar';
import ChallengeItemLabel from '../ChallengeItemLabel';

import { onGlobeCreate, onGlobeDestroy } from '../../global';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Globe onCreate={onGlobeCreate} onDestroy={onGlobeDestroy} />
        <ChallengeSidebar />
        <ChallengeItemLabel />
      </div>
    );
  }
}

export default App;
