import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

import ChallengeSidebarItem from './ChallengeSidebarItem';

@inject('challengeStore') @observer
class ChallengeSidebar extends Component {
  render() {
    const { t, challengeStore } = this.props;
    const { challengeItemIds } = challengeStore;
    return (
      <div className="challenge-sidebar">
        <nav className="panel">
          <p className="panel-heading">{t('heading')}</p>
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

export default withTranslation('challenge-sidebar')(ChallengeSidebar);
