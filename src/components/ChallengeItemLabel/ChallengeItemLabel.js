import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('generalStore', 'challengeStore') @observer
class ChallengeItemLabel extends Component {
  render() {
    const { generalStore, challengeStore } = this.props;
    const { language } = generalStore;
    const { pickedChallengeItem } = challengeStore;
    return pickedChallengeItem ? (
      <div className="challenge-item-label">
        <article className="message is-primary is-small">
          <div className="message-body">
            {pickedChallengeItem.name[language]}
          </div>
        </article>
      </div>
    ) : '';
  }
}

export default ChallengeItemLabel
