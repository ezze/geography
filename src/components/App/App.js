import React, { Component } from 'react';

import Globe from '../Globe';

import { onGlobeCreate, onGlobeDestroy } from '../../global';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Globe onCreate={onGlobeCreate} onDestroy={onGlobeDestroy} />
      </div>
    );
  }
}

export default App;
