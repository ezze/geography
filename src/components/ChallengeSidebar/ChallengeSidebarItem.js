import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('generalStore', 'challengeStore') @observer
class ChallengeSidebarItem extends Component {
  render() {
    const { generalStore, challengeStore, id } = this.props;
    const item = challengeStore.challengeItem(id);
    const { language } = generalStore;
    return (
      <li>
        <a>{item.name[language]}</a>
      </li>
    )
  }
}

export default ChallengeSidebarItem;
