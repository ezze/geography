import { observer } from 'mobx-react';
import React, { useContext } from 'react';

import { ChallengeStoreContext } from '../../store/ChallengeStore';

import ChallengeSidebarItem from './ChallengeSidebarItem';

import './ChallengeSidebar.sass';

export const ChallengeSidebar = observer(() => {
  const challengeStore = useContext(ChallengeStoreContext);
  const { playMode, name, itemIds } = challengeStore;

  if (playMode || !name) {
    return null;
  }

  return (
    <div className="challenge-sidebar">
      <nav className="panel is-primary">
        <p className="panel-heading">{name}</p>
        <div className="panel-block">
          <aside className="menu">
            <ul className="menu-list">
              {itemIds.map((id) => (
                <ChallengeSidebarItem key={id} id={id} />
              ))}
            </ul>
          </aside>
        </div>
      </nav>
    </div>
  );
});
