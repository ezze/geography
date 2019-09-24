import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('challengeStore') @observer
class ChallengeSidebarItem extends Component {
  render() {
    const { challengeStore, id } = this.props;
    const item = challengeStore.challengeItem(id);
    return (
      <li>
        <a>{item.name.ru}</a>
      </li>
    )
  }
}

export default ChallengeSidebarItem;
