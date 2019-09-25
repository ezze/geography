import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ChallengeSidebarItem from './ChallengeSidebarItem';

@inject('generalStore', 'challengeStore') @observer
class ChallengeSidebar extends Component {
  render() {
    const { generalStore, challengeStore } = this.props;
    const { language } = generalStore;
    const { playMode, challenge, challengeItemIds } = challengeStore;
    return playMode ? '' : (
      <div className="challenge-sidebar">
        <nav className="panel">
          <p className="panel-heading">{challenge.name[language]}</p>
          <div className="panel-block">
            <aside className="menu">
              <ul className="menu-list">
                {challengeItemIds.map(id => (
                  <ChallengeSidebarItem key={id} id={id} />
                ))}
              </ul>
            </aside>
          </div>
        </nav>
      </div>
    );
  }
}

export default ChallengeSidebar;