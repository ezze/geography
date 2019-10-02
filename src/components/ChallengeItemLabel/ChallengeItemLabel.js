import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import "./sass/index.sass"

@inject('generalStore', 'challengeStore') @observer
class ChallengeItemLabel extends Component {
  render() {
    const { generalStore, challengeStore } = this.props;
    const { language } = generalStore;
    const { playMode, guessedItem, pickedItem } = challengeStore;

    let content = '';
    if (playMode) {
      if (guessedItem) {
        content = guessedItem.name[language];
      }
    }
    else {
      if (pickedItem) {
        content = pickedItem.name[language];
      }
    }

    return content ? (
      <div className="challenge-item-label">
        <article className="message is-primary">
          <div className="message-body">
            {content}
          </div>
        </article>
      </div>
    ) : '';
  }
}

export default ChallengeItemLabel;
