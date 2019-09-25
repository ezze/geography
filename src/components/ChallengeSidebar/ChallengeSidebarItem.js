import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

@inject('generalStore', 'challengeStore') @observer
class ChallengeSidebarItem extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  render() {
    const { generalStore, challengeStore, id } = this.props;
    const item = challengeStore.challengeItem(id);
    const { language } = generalStore;
    const linkClassName = classNames({
      'is-active': challengeStore.pickedChallengeItemId === id
    });
    return (
      <li>
        <a className={linkClassName} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          {item.name[language]}
        </a>
      </li>
    )
  }

  onMouseEnter() {
    const { challengeStore, id } = this.props;
    challengeStore.setPickedChallengeItemId(id);
  }

  onMouseLeave() {
    const { challengeStore } = this.props;
    challengeStore.setPickedChallengeItemId(null);
  }
}

export default ChallengeSidebarItem;
