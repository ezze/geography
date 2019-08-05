import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';

import './index.sass';

import { initI18n } from './i18n';
import { createStores } from './store';

import App from './components/App';

document.addEventListener('DOMContentLoaded', async() => {
  const i18n = await initI18n();
  const stores = await createStores();
  const content = (
    <Provider {...stores}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );

  render(content, document.getElementById('app'));
});
