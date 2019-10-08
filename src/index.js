import React from 'react';
import { render } from 'react-dom';
import { reaction } from 'mobx';
import { Provider } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';

import './sass/index.sass';

import { initI18n } from './i18n';
import { createStores } from './store';
import { initSounds } from './sound';

import App from './components/App';

document.addEventListener('DOMContentLoaded', async() => {
  const i18n = await initI18n();
  const stores = await createStores();
  await initSounds();
  const content = (
    <Provider {...stores}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );

  const { generalStore } = stores;
  reaction(() => generalStore.language, () => {
    document.title = i18n.t('app:name');
  });
  document.title = i18n.t('app:name');

  render(content, document.getElementById('app'));
});
