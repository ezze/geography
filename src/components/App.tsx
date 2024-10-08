import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';

import { onGlobeCreate, onGlobeDestroy } from '../global';
import { GeneralStoreContext } from '../store/GeneralStore';

import { About } from './About/About';
import { AudioNotification } from './AudioNotification';
import { ChallengeItemLabel } from './ChallengeItemLabel/ChallengeItemLabel';
import { ChallengeSidebar } from './ChallengeSidebar/ChallengeSidebar';
import { GameOver } from './GameOver';
import { Globe } from './Globe/Globe';
import { Loading } from './Loading';
import { Results } from './Results/Results';
import { Settings } from './Settings';
import State from './State/State';
import { Toolbar } from './Toolbar/Toolbar';
import { UserNamePrompt } from './UserNamePrompt';
import { YandexMetrika } from './YandexMetrika';

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
      <UserNamePrompt />
      <Results />
      <AudioNotification />
      <GameOver />
      <About />
      <YandexMetrika />
    </div>
  );
});

export default App;
