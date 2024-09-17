import { observer } from 'mobx-react';
import React, { Component, useContext, useEffect, useState } from 'react';

import { platformType } from '../const';
import { onGlobeCreate, onGlobeDestroy } from '../global';
import { ChallengeStoreContext } from '../store/ChallengeStore';
import { GeneralStoreContext } from '../store/GeneralStore';

import About from './About';
import AudioNotification from './AudioNotification';
import ChallengeItemLabel from './ChallengeItemLabel';
import ChallengeSidebar from './ChallengeSidebar';
import GameOver from './GameOver';
import { Globe } from './Globe/Globe';
import HallOfFame from './HallOfFame';
import Loading from './Loading';
import { ModalNotification } from './ModalNotification/ModalNotification';
import Settings from './Settings';
import State from './State';
import Toolbar from './Toolbar';
import UserNamePrompt from './UserNamePrompt';
import YandexMetrika from './YandexMetrika';

export const App = observer(() => {
  const generalStore = useContext(GeneralStoreContext);
  const challengeStore = useContext(ChallengeStoreContext);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 68 && event.shiftKey) {
        const { developerMode } = generalStore;
        generalStore.setDeveloperMode(!developerMode);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="app">
      <Globe onCreate={onGlobeCreate} onDestroy={onGlobeDestroy} />
    </div>
  );
});

// class App extends Component {
//   render() {
//     return platformType !== 'mobile' ? (
//       <div className="app">
//         <Globe onCreate={onGlobeCreate} onDestroy={onGlobeDestroy} />
//         <Toolbar />
//         <State />
//         <ChallengeSidebar />
//         <ChallengeItemLabel />
//         <Settings />
//         <Loading />
//         <UserNamePrompt />
//         <HallOfFame />
//         <AudioNotification />
//         <GameOver />
//         <About />
//       </div>
//     ) : (
//       <div className="app">
//         <ModalNotification id="mobile-unsupported" visible={true} style="danger" />
//         <YandexMetrika />
//       </div>
//     );
//   }
// }

export default App;
