import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('challengeStore') @observer
class State extends Component {
  render() {
    const { challengeStore } = this.props;
    const { playMode, remainingTimeDisplay, userItemId, correctCount, guessedCount } = challengeStore;
    return playMode ? (
      <div className="state">
        <div>{remainingTimeDisplay}</div>
        <div>{correctCount} / {guessedCount - (userItemId ? 0 : 1)}</div>
      </div>
    ) : '';
  }
}

export default State;
