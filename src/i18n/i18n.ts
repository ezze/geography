import i18next, { i18n as I18n } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { languages } from '../const';

import { I18N_NAMESPACE } from './const';
import en from './en.json';
import ru from './ru.json';
import { Language } from './types';

const translations = new Map<Language, Record<string, unknown>>();
translations.set('en', en);
translations.set('ru', ru);

let i18n: I18n | null = null;

export async function initI18n(defaultLanguage?: Language): Promise<I18n> {
  if (i18n !== null) {
    return i18n;
  }
  const fallbackLng = languages[0].id;

  await new Promise<void>((resolve, reject) => {
    i18next.use(initReactI18next).init(
      {
        resources: {},
        lng: defaultLanguage,
        fallbackLng: fallbackLng,
        interpolation: { escapeValue: false }
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });

  translations.forEach((translation, language) => {
    i18next.addResourceBundle(language, I18N_NAMESPACE, translation);
  });

  i18n = i18next;

  return i18n;
}
