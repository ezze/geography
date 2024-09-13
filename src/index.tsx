import { reaction } from 'mobx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './sass/index.sass';
import { I18nextProvider } from 'react-i18next';

import App from './components/App';
import { initI18n } from './i18n/i18n';
import reportWebVitals from './reportWebVitals';
import { initSounds } from './sound';
import GeneralStore, { GeneralStoreContext } from './store/GeneralStore';

document.addEventListener('DOMContentLoaded', async () => {
  const generalStore = new GeneralStore();

  const i18n = await initI18n();
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
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </GeneralStoreContext.Provider>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
