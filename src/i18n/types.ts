export type Language = 'en' | 'ru';
export type TranslationNamespace = Record<string, unknown>;
export type Translation = Record<string, TranslationNamespace>;
export type TranslationItem = Record<Language, string>;
