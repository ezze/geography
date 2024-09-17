import { Challenge } from '../types';

export const southAmerica: Challenge = {
  id: 'south-america',
  name: { en: 'South America Countries', ru: 'Страны Южной Америки' },
  enabled: true,
  minimumZoomDistance: 1000000.0,
  view: {
    destination: {
      west: -80,
      south: -60,
      north: 20,
      east: -40,
      units: 'degrees'
    }
  },
  items: [
    {
      id: 'argentina',
      name: { en: 'Argentina', ru: 'Аргентина' },
      path: 'south-america-countries/argentina.json'
    },
    {
      id: 'bolivia',
      name: { en: 'Bolivia', ru: 'Боливия' },
      path: 'south-america-countries/bolivia.json'
    },
    {
      id: 'brazil',
      name: { en: 'Brazil', ru: 'Бразилия' },
      path: 'south-america-countries/brazil.json'
    },
    {
      id: 'chile',
      name: { en: 'chile', ru: 'Чили' },
      path: 'south-america-countries/chile.json'
    },
    {
      id: 'colombia',
      name: { en: 'Colombia', ru: 'Колумбия' },
      path: 'south-america-countries/colombia.json'
    },
    {
      id: 'ecuador',
      name: { en: 'Ecuador', ru: 'Эквадор' },
      path: 'south-america-countries/ecuador.json'
    },
    {
      id: 'guyana',
      name: { en: 'Guyana', ru: 'Гвиана' },
      path: 'south-america-countries/guyana.json'
    },
    {
      id: 'paraguay',
      name: { en: 'Paraguay', ru: 'Парагвай' },
      path: 'south-america-countries/paraguay.json'
    },
    {
      id: 'peru',
      name: { en: 'Peru', ru: 'Перу' },
      path: 'south-america-countries/peru.json'
    },
    {
      id: 'suriname',
      name: { en: 'Suriname', ru: 'Суринам' },
      path: 'south-america-countries/suriname.json'
    },
    {
      id: 'uruguay',
      name: { en: 'Uruguay', ru: 'Уругвая' },
      path: 'south-america-countries/uruguay.json'
    },
    {
      id: 'venezuela',
      name: { en: 'Venezuela', ru: 'Венесуэла' },
      path: 'south-america-countries/venezuela.json'
    }
  ]
};
