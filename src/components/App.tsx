import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';

import { onGlobeCreate, onGlobeDestroy } from '../global';
import { GeneralStoreContext } from '../store/GeneralStore';

import { ChallengeItemLabel } from './ChallengeItemLabel/ChallengeItemLabel';
import { ChallengeSidebar } from './ChallengeSidebar/ChallengeSidebar';
import { Globe } from './Globe/Globe';
import { Loading } from './Loading';
import { Settings } from './Settings';
import State from './State/State';
import { Toolbar } from './Toolbar/Toolbar';

export const App = observer(() => {
  const generalStore = useContext(GeneralStoreContext);

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
      <Toolbar />
      <State />
      <ChallengeSidebar />
      <ChallengeItemLabel />
      <Settings />
      <Loading />
    </div>
  );
});

// class App extends Component {
//   render() {
//     return platformType !== 'mobile' ? (
//       <div className="app">
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
