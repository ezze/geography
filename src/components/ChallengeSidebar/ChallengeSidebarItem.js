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
    const item = challengeStore.item(id);
    const { language } = generalStore;
    const linkClassName = classNames({
      'is-active': challengeStore.pickedItemId === id
    });
    return (
      <li>
        <a className={linkClassName} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          {item.name[language]}
        </a>
      </li>
    );
  }

  onMouseEnter() {
    const { challengeStore, id } = this.props;
    challengeStore.setPickedItemId(id);
  }

  onMouseLeave() {
    const { challengeStore } = this.props;
    challengeStore.setPickedItemId(null);
  }
}

export default ChallengeSidebarItem;
