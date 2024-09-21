import { Language, TranslationItem } from './types';

export function getLanguageLabel(language: Language): string {
  if (language === 'en') {
    return 'English';
  }
  if (language === 'ru') {
    return 'Русский';
  }
  throw new TypeError(`Language "${language}" is not supported`);
}

export function translateItem(item: string | TranslationItem, language: Language): string {
  return typeof item === 'string' ? item : item[language];
}
