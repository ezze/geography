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
      path: 'argentina.json'
    },
    {
      id: 'bolivia',
      name: { en: 'Bolivia', ru: 'Боливия' },
      path: 'bolivia.json'
    },
    {
      id: 'brazil',
      name: { en: 'Brazil', ru: 'Бразилия' },
      path: 'brazil.json'
    },
    {
      id: 'chile',
      name: { en: 'chile', ru: 'Чили' },
      path: 'chile.json'
    },
    {
      id: 'colombia',
      name: { en: 'Colombia', ru: 'Колумбия' },
      path: 'colombia.json'
    },
    {
      id: 'ecuador',
      name: { en: 'Ecuador', ru: 'Эквадор' },
      path: 'ecuador.json'
    },
    {
      id: 'guyana',
      name: { en: 'Guyana', ru: 'Гвиана' },
      path: 'guyana.json'
    },
    {
      id: 'paraguay',
      name: { en: 'Paraguay', ru: 'Парагвай' },
      path: 'paraguay.json'
    },
    {
      id: 'peru',
      name: { en: 'Peru', ru: 'Перу' },
      path: 'peru.json'
    },
    {
      id: 'suriname',
      name: { en: 'Suriname', ru: 'Суринам' },
      path: 'suriname.json'
    },
    {
      id: 'uruguay',
      name: { en: 'Uruguay', ru: 'Уругвая' },
      path: 'uruguay.json'
    },
    {
      id: 'venezuela',
      name: { en: 'Venezuela', ru: 'Венесуэла' },
      path: 'venezuela.json'
    }
  ]
};
