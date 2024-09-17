import { reaction } from 'mobx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './sass/index.sass';
import { I18nextProvider } from 'react-i18next';

import App from './components/App';
import { initI18n } from './i18n/i18n';
import reportWebVitals from './reportWebVitals';
import { initSounds } from './sound';
import { CameraStore, CameraStoreContext } from './store/CameraStore';
import { ChallengeStore, ChallengeStoreContext } from './store/ChallengeStore';
import { GeneralStore, GeneralStoreContext } from './store/GeneralStore';
import { ResultStore } from './store/ResultStore';

document.addEventListener('DOMContentLoaded', async () => {
  const i18n = await initI18n();

  const generalStore = new GeneralStore();
  await generalStore.init();

  const resultStore = new ResultStore();
  await resultStore.init();

  const challengeStore = new ChallengeStore(generalStore, resultStore);
  await challengeStore.init();

  const cameraStore = new CameraStore();
  await cameraStore.init();

  await initSounds();

  reaction(
    () => generalStore.language,
    () => {
      document.title = i18n.t('app:name');
    }
  );
  document.title = i18n.t('app:name');

  const rootElement = document.getElementById('root');
  if (rootElement === null) {
    throw new TypeError('Root element is not found');
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GeneralStoreContext.Provider value={generalStore}>
        <ChallengeStoreContext.Provider value={challengeStore}>
          <CameraStoreContext.Provider value={cameraStore}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </CameraStoreContext.Provider>
        </ChallengeStoreContext.Provider>
      </GeneralStoreContext.Provider>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
