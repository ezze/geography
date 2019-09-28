import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('challengeStore') @observer
class State extends Component {
  render() {
    const { challengeStore } = this.props;
    const { playMode, remainingTimeDisplay, correctCount, overallCountForUser } = challengeStore;
    return playMode ? (
      <div className="state">
        <div>{remainingTimeDisplay}</div>
        <div>{correctCount} / {overallCountForUser }</div>
      </div>
    ) : '';
  }
}

export default State;
