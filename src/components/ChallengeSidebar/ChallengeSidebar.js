import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ChallengeSidebarItem from './ChallengeSidebarItem';

import "./sass/index.sass"

@inject('challengeStore') @observer
class ChallengeSidebar extends Component {
  render() {
    const { challengeStore } = this.props;
    const { playMode, name, itemIds } = challengeStore;

    if (playMode) {
      return '';
    }

    return name ? (
      <div className="challenge-sidebar">
        <nav className="panel">
          <p className="panel-heading">{name}</p>
          <div className="panel-block">
            <aside className="menu">
              <ul className="menu-list">
                {itemIds.map(id => (
                  <ChallengeSidebarItem key={id} id={id} />
                ))}
              </ul>
            </aside>
          </div>
        </nav>
      </div>
    ) : '';
  }
}

export default ChallengeSidebar;
