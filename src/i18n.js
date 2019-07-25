import i18next from 'i18next';

import { languages } from './constants';

import en from './translations/en.json';
import ru from './translations/ru.json';

const translations = [
  { language: 'en', resources: en },
  { language: 'ru', resources: ru }
];

let i18n = null;

export async function initI18n(defaultLanguage) {
  if (i18n !== null) {
    return i18n;
  }
  const fallbackLanguage = languages[0].id;
  return new Promise((resolve, reject) => {
    i18next.init({
      whitelist: languages.map(language => language.id),
      lng: defaultLanguage || fallbackLanguage,
      fallbackLng: fallbackLanguage,
      lowerCaseLng: true,
      react: {
        wait: true,
        nsMode: 'fallback'
      },
      debug: false,
      resources: {},
      interpolation: {
        escapeValue: false
      }
    }, (error) => {
      if (error) {
        reject(error);
      }
      else {
        i18n = i18next;
        resolve(i18n);
      }
    });
  }).then(() => {
    translations.forEach((translation) => {
      const { language, resources } = translation;
      const namespaces = Object.keys(resources);
      namespaces.forEach((namespace) => {
        const resourceBundle = resources[namespace];
        i18n.addResourceBundle(language, namespace, resourceBundle);
      });
    });
    return i18n;
  });
}
