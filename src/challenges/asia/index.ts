import { Challenge } from '../types';

export const asia: Challenge = {
  id: 'asia',
  name: { en: 'Countries of Asia', ru: 'Страны Азии' },
  enabled: true,
  minimumZoomDistance: 1000000.0,
  view: {
    destination: {
      west: 40,
      east: 150,
      north: 60,
      south: -10,
      units: 'degrees'
    }
  },
  items: [
    {
      id: 'afghanistan',
      name: { en: 'Afghanistan', ru: 'Афганистан' },
      path: 'afghanistan.json'
    },
    {
      id: 'bahrain',
      name: { en: 'Bahrain', ru: 'Бахрейн' },
      path: 'bahrain.json'
    },
    {
      id: 'bangladesh',
      name: { en: 'Bangladesh', ru: 'Бангладеш' },
      path: 'bangladesh.json'
    },
    {
      id: 'bhutan',
      name: { en: 'Bhutan', ru: 'Бутан' },
      path: 'bhutan.json'
    },
    {
      id: 'brunei',
      name: { en: 'Brunei', ru: 'Бруней' },
      path: 'brunei.json'
    },
    {
      id: 'cambodia',
      name: { en: 'Cambodia', ru: 'Камбоджа' },
      path: 'cambodia.json'
    },
    {
      id: 'china',
      name: { en: 'China', ru: 'Китай' },
      path: 'china.json'
    },
    {
      id: 'hong-kong',
      name: { en: 'Hong Kong', ru: 'Гонконг' },
      path: 'hong-kong.json'
    },
    {
      id: 'india',
      name: { en: 'India', ru: 'Индия' },
      path: 'india.json'
    },
    {
      id: 'indonesia',
      name: { en: 'Indonesia', ru: 'Индонезия' },
      path: 'indonesia.json'
    },
    {
      id: 'iran',
      name: { en: 'Iran', ru: 'Иран' },
      path: 'iran.json'
    },
    {
      id: 'Iraq',
      name: { en: 'Iraq', ru: 'Ирак' },
      path: 'iraq.json'
    },
    {
      id: 'israel',
      name: { en: 'Israel', ru: 'Израиль' },
      path: 'israel.json'
    },
    {
      id: 'japan',
      name: { en: 'Japan', ru: 'Япония' },
      path: 'japan.json'
    },
    {
      id: 'jordan',
      name: { en: 'Jordan', ru: 'Иордания' },
      path: 'jordan.json'
    },
    {
      id: 'kazakhstan',
      name: { en: 'Kazakhstan', ru: 'Казахстан' },
      path: 'kazakhstan.json'
    },
    {
      id: 'kuwait',
      name: { en: 'Kuwait', ru: 'Кувейт' },
      path: 'kuwait.json'
    },
    {
      id: 'kyrgyzstan',
      name: { en: 'Kyrgyzstan', ru: 'Киргизстан' },
      path: 'kyrgyzstan.json'
    },
    {
      id: 'laos',
      name: { en: 'Laos', ru: 'Лаос' },
      path: 'laos.json'
    },
    {
      id: 'lebanon',
      name: { en: 'Lebanon', ru: 'Ливан' },
      path: 'lebanon.json'
    },
    {
      id: 'malaysia',
      name: { en: 'Malaysia', ru: 'Малайзия' },
      path: 'malaysia.json'
    },
    {
      id: 'mongolia',
      name: { en: 'Mongolia', ru: 'Монголия' },
      path: 'mongolia.json'
    },
    {
      id: 'myanmar',
      name: { en: 'Myanmar (Burma)', ru: 'Мьянма (Бирма)' },
      path: 'myanmar.json'
    },
    {
      id: 'nepal',
      name: { en: 'Nepal', ru: 'Непал' },
      path: 'nepal.json'
    },
    {
      id: 'north-korea',
      name: { en: 'North Korea', ru: 'Северная Корея' },
      path: 'north-korea.json'
    },
    {
      id: 'oman',
      name: { en: 'Oman', ru: 'Оман' },
      path: 'oman.json'
    },
    {
      id: 'pakistan',
      name: { en: 'Pakistan', ru: 'Пакистан' },
      path: 'pakistan.json'
    },
    {
      id: 'philippines',
      name: { en: 'Philippines', ru: 'Филиппины' },
      path: 'philippines.json'
    },
    {
      id: 'qatar',
      name: { en: 'Qatar', ru: 'Катар' },
      path: 'qatar.json'
    },
    {
      id: 'saudi-arabia',
      name: { en: 'Saudi Arabia', ru: 'Саудовская Аравия' },
      path: 'saudi-arabia.json'
    },
    {
      id: 'singapore',
      name: { en: 'Signapore', ru: 'Сингапур' },
      path: 'singapore.json'
    },
    {
      id: 'south-korea',
      name: { en: 'South Korea', ru: 'Южная Корея' },
      path: 'south-korea.json'
    },
    {
      id: 'sri-lanka',
      name: { en: 'Sri Lanka', ru: 'Шри-Ланка' },
      path: 'sri-lanka.json'
    },
    {
      id: 'syria',
      name: { en: 'Syria', ru: 'Сирия' },
      path: 'syria.json'
    },
    {
      id: 'taiwan',
      name: { en: 'Taiwan', ru: 'Тайвань' },
      path: 'taiwan.json'
    },
    {
      id: 'tajikistan',
      name: { en: 'Tajikistan', ru: 'Таджикистан' },
      path: 'tajikistan.json'
    },
    {
      id: 'thailand',
      name: { en: 'Thailand', ru: 'Тайланд' },
      path: 'thailand.json'
    },
    {
      id: 'turkey',
      name: { en: 'Turkey', ru: 'Турция' },
      path: 'turkey.json'
    },
    {
      id: 'turkmenistan',
      name: { en: 'Turkmenistan', ru: 'Турменистан' },
      path: 'turkmenistan.json'
    },
    {
      id: 'united-arab-emirates',
      name: { en: 'United Arab Emirates', ru: 'Объединённые Арабские Эмираты' },
      path: 'united-arab-emirates.json'
    },
    {
      id: 'uzbekistan',
      name: { en: 'Uzbekistan', ru: 'Узбекистан' },
      path: 'uzbekistan.json'
    },
    {
      id: 'vietnam',
      name: { en: 'Vietnam', ru: 'Вьетнам' },
      path: 'vietnam.json'
    },
    {
      id: 'yemen',
      name: { en: 'Yemen', ru: 'Йемен' },
      path: 'yemen.json'
    }
  ]
};
