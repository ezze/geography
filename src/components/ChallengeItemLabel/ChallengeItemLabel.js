import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('generalStore', 'challengeStore') @observer
class ChallengeItemLabel extends Component {
  render() {
    const { generalStore, challengeStore } = this.props;
    const { language } = generalStore;
    const { playMode, pickedChallengeItem } = challengeStore;

    let content = '';
    if (playMode) {
      return '';
    }
    else {
      if (pickedChallengeItem) {
        content = pickedChallengeItem.name[language];
      }
    }

    return content ? (
      <div className="challenge-item-label">
        <article className="message is-primary is-small">
          <div className="message-body">
            {content}
          </div>
        </article>
      </div>
    ) : '';
  }
}

export default ChallengeItemLabel
