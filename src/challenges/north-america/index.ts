import { Challenge } from '../types';

export const northAmerica: Challenge = {
  id: 'north-america',
  name: { en: 'Countries of North America', ru: 'Страны Северной Америки' },
  enabled: true,
  minimumZoomDistance: 1000000.0,
  view: {
    destination: {
      west: -120,
      south: 0,
      north: 80,
      east: -80,
      units: 'degrees'
    }
  },
  items: [
    { id: 'anguilla', name: { en: 'Anguilla (Great Britain)', ru: 'Ангилья (Великобритания)' }, path: 'anguilla.json' },
    {
      id: 'antigua-and-barbuda',
      name: { en: 'Antigua and Barbuda', ru: 'Антигуа и Барбуда' },
      path: 'antigua-and-barbuda.json'
    },
    { id: 'aruba', name: { en: 'Aruba (Netherlands)', ru: 'Аруба (Нидерланды)' }, path: 'aruba.json' },
    {
      id: 'bajo-nuevo-bank',
      name: { en: 'Bajo Nuevo Bank (Columbia)', ru: 'Бахо-Нуэво банка (Колумбия)' },
      path: 'bajo-nuevo-bank.json'
    },
    { id: 'barbados', name: { en: 'Barbados', ru: 'Барбадос' }, path: 'barbados.json' },
    { id: 'belize', name: { en: 'Belize', ru: 'Белиз' }, path: 'belize.json' },
    {
      id: 'bermuda',
      name: { en: 'Bermuda (Great Britain)', ru: 'Бермудские острова (Великобритания)' },
      path: 'bermuda.json'
    },
    {
      id: 'british-virgin-islands',
      name: { en: 'Virgin Islands (Great Britain)', ru: 'Виргинские острова (Великобритания)' },
      path: 'british-virgin-islands.json'
    },
    { id: 'canada', name: { en: 'Canada', ru: 'Канада' }, path: 'canada.json' },
    {
      id: 'cayman-islands',
      name: { en: 'Cayman Islands (Great Britain)', ru: 'Каймановы острова (Великобритания)' },
      path: 'cayman-islands.json'
    },
    {
      id: 'clipperton-island',
      name: { en: 'Clipperton Island (France) ', ru: 'Клиппертон (Франция)' },
      path: 'clipperton-island.json'
    },
    { id: 'costa-rica', name: { en: 'Costa-Rica', ru: 'Коста-Рика' }, path: 'costa-rica.json' },
    { id: 'cuba', name: { en: 'Cuba', ru: 'Куба' }, path: 'cuba.json' },
    { id: 'curacao', name: { en: 'Curacao (Netherlands)', ru: 'Кюрасао (Нидерланды)' }, path: 'curacao.json' },
    { id: 'dominica', name: { en: 'Dominica', ru: 'Доминика' }, path: 'dominica.json' },
    {
      id: 'dominican-republic',
      name: { en: 'Dominican Republic', ru: 'Доминиканская Республика' },
      path: 'dominican-republic.json'
    },
    { id: 'el-salvador', name: { en: 'El-Salvador', ru: 'Эль-Салвадор' }, path: 'el-salvador.json' },
    { id: 'greenland', name: { en: 'Greenland (Denmark)', ru: 'Гренландия (Дания)' }, path: 'greenland.json' },
    { id: 'grenada', name: { en: 'Grenada', ru: 'Гренада' }, path: 'grenada.json' },
    { id: 'guatemala', name: { en: 'Guatemala', ru: 'Гватемала' }, path: 'guatemala.json' },
    { id: 'haiti', name: { en: 'Haiti', ru: 'Гаити' }, path: 'haiti.json' },
    { id: 'honduras', name: { en: 'Honduras', ru: 'Гондурас' }, path: 'honduras.json' },
    { id: 'jamaica', name: { en: 'Jamaica', ru: 'Ямайка' }, path: 'jamaica.json' },
    { id: 'mexico', name: { en: 'Mexico', ru: 'Мексика' }, path: 'mexico.json' },
    {
      id: 'montserrat',
      name: { en: 'Montserrat (Great Britain)', ru: 'Монтсеррат (Великобритания)' },
      path: 'montserrat.json'
    },
    { id: 'nicaragua', name: { en: 'Nicaragua', ru: 'Никарагуа' }, path: 'nicaragua.json' },
    { id: 'panama', name: { en: 'Panama', ru: 'Панама' }, path: 'panama.json' },
    { id: 'puerto-rico', name: { en: 'Puerto Rico', ru: 'Пуэрто-Рико' }, path: 'puerto-rico.json' },
    {
      id: 'saint-barthelemy',
      name: { en: 'Saint Barthelemy (France)', ru: 'Сен-Бартелеми (Франция)' },
      path: 'saint-barthelemy.json'
    },
    {
      id: 'saint-kitts-and-nevis',
      name: { en: 'Saint Kitts and Nevis', ru: 'Сент-Киттс и Невис' },
      path: 'saint-kitts-and-nevis.json'
    },
    { id: 'saint-lucia', name: { en: 'Saint Lucia', ru: 'Сент-Люсия' }, path: 'saint-lucia.json' },
    {
      id: 'saint-martin',
      name: { en: 'Saint Martin (France)', ru: 'Сен-Мартен (Франция)' },
      path: 'saint-martin.json'
    },
    {
      id: 'saint-pierre-and-miquelon',
      name: { en: 'Saint Pierre and Miquelon (France)', ru: 'Сен-Пьер и Микелон (Франция)' },
      path: 'saint-pierre-and-miquelon.json'
    },
    {
      id: 'saint-vincent-and-the-grenadines',
      name: { en: 'Saint Vincent and The Grenadines', ru: 'Сент-Винсент и Гренадины' },
      path: 'saint-vincent-and-the-grenadines.json'
    },
    {
      id: 'sint-maarten',
      name: { en: 'Sint Maarten (Netherlands)', ru: 'Синт-Мартен (Нидерланды)' },
      path: 'sint-maarten.json'
    },
    { id: 'the-bahamas', name: { en: 'The Bahamas', ru: 'Багамские острова' }, path: 'the-bahamas.json' },
    {
      id: 'trinidad-and-tobago',
      name: { en: 'Trinidad and Tobago', ru: 'Тринидад и Тобаго' },
      path: 'trinidad-and-tobago.json'
    },
    {
      id: 'united-states-of-america',
      name: { en: 'United States of America', ru: 'Соединённые Штаты Америки' },
      path: 'united-states-of-america.json'
    },
    {
      id: 'united-states-virgin-islands',
      name: { en: 'Virgin Islands (United States)', ru: 'Виргинские острова (США)' },
      path: 'united-states-virgin-islands.json'
    }
  ]
};
