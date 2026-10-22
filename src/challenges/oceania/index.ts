import { Challenge } from '../types';

export const oceania: Challenge = {
  id: 'oceania',
  name: { en: 'Countries of Oceania', ru: 'Страны Океании' },
  enabled: true,
  minimumZoomDistance: 1000000.0,
  view: {
    destination: {
      west: 110,
      south: -50,
      north: 25,
      east: -130,
      units: 'degrees'
    }
  },
  items: [
    {
      id: 'american-samoa',
      name: { en: 'American Samoa (United States)', ru: 'Американское Самоа (США)' },
      path: 'american-samoa.json'
    },
    { id: 'australia', name: { en: 'Australia', ru: 'Австралия' }, path: 'australia.json' },
    {
      id: 'cook-islands',
      name: { en: 'Cook Islands (New Zealand)', ru: 'Острова Кука (Новая Зеландия)' },
      path: 'cook-islands.json'
    },
    {
      id: 'federated-states-of-micronesia',
      name: { en: 'Federated States of Micronesia', ru: 'Федеративные Штаты Микронезии' },
      path: 'federated-states-of-micronesia.json'
    },
    { id: 'fiji', name: { en: 'Fiji', ru: 'Фиджи' }, path: 'fiji.json' },
    {
      id: 'french-polynesia',
      name: { en: 'French Polynesia (France)', ru: 'Французская Полинезия (Франция)' },
      path: 'french-polynesia.json'
    },
    { id: 'guam', name: { en: 'Guam (United States)', ru: 'Гуам (США)' }, path: 'guam.json' },
    { id: 'kiribati', name: { en: 'Kiribati', ru: 'Кирибати' }, path: 'kiribati.json' },
    {
      id: 'marshall-islands',
      name: { en: 'Marshall Islands', ru: 'Маршалловы Острова' },
      path: 'marshall-islands.json'
    },
    { id: 'nauru', name: { en: 'Nauru', ru: 'Науру' }, path: 'nauru.json' },
    {
      id: 'new-caledonia',
      name: { en: 'New Caledonia (France)', ru: 'Новая Каледония (Франция)' },
      path: 'new-caledonia.json'
    },
    { id: 'new-zealand', name: { en: 'New Zealand', ru: 'Новая Зеландия' }, path: 'new-zealand.json' },
    { id: 'niue', name: { en: 'Niue (New Zealand)', ru: 'Ниуэ (Новая Зеландия)' }, path: 'niue.json' },
    {
      id: 'norfolk-island',
      name: { en: 'Norfolk Island (Australia)', ru: 'Остров Норфолк (Австралия)' },
      path: 'norfolk-island.json'
    },
    {
      id: 'northern-mariana-islands',
      name: { en: 'Northern Mariana Islands (United States)', ru: 'Северные Марианские Острова (США)' },
      path: 'northern-mariana-islands.json'
    },
    { id: 'palau', name: { en: 'Palau', ru: 'Палау' }, path: 'palau.json' },
    {
      id: 'papua-new-guinea',
      name: { en: 'Papua New Guinea', ru: 'Папуа — Новая Гвинея' },
      path: 'papua-new-guinea.json'
    },
    {
      id: 'pitcairn-islands',
      name: { en: 'Pitcairn Islands (Great Britain)', ru: 'Острова Питкэрн (Великобритания)' },
      path: 'pitcairn-islands.json'
    },
    { id: 'samoa', name: { en: 'Samoa', ru: 'Самоа' }, path: 'samoa.json' },
    { id: 'solomon-islands', name: { en: 'Solomon Islands', ru: 'Соломоновы Острова' }, path: 'solomon-islands.json' },
    { id: 'tonga', name: { en: 'Tonga', ru: 'Тонга' }, path: 'tonga.json' },
    { id: 'tuvalu', name: { en: 'Tuvalu', ru: 'Тувалу' }, path: 'tuvalu.json' },
    { id: 'vanuatu', name: { en: 'Vanuatu', ru: 'Вануату' }, path: 'vanuatu.json' },
    {
      id: 'wallis-and-futuna',
      name: { en: 'Wallis and Futuna (France)', ru: 'Уоллис и Футуна (Франция)' },
      path: 'wallis-and-futuna.json'
    }
  ]
};
