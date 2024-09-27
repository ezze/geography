import { Challenge } from '../types';

export const europe: Challenge = {
  id: 'europe',
  name: { en: 'Countries of Europe', ru: 'Страны Европы' },
  enabled: true,
  minimumZoomDistance: 1000000.0,
  view: {
    destination: {
      west: -20,
      east: 60,
      north: 70,
      south: 30,
      units: 'degrees'
    }
  },
  items: [
    {
      id: 'albania',
      name: { en: 'Albania', ru: 'Албания' },
      path: 'albania.json'
    },
    {
      id: 'andorra',
      name: { en: 'Andorra', ru: 'Андорра' },
      path: 'andorra.json'
    },
    {
      id: 'armenia',
      name: { en: 'Armenia', ru: 'Армения' },
      path: 'armenia.json'
    },
    {
      id: 'austria',
      name: { en: 'Austria', ru: 'Австрия' },
      path: 'austria.json'
    },
    {
      id: 'azerbaijan',
      name: { en: 'Azerbaijan', ru: 'Азербайджан' },
      path: 'azerbaijan.json'
    },
    {
      id: 'belarus',
      name: { en: 'Belarus', ru: 'Белоруссия' },
      path: 'belarus.json'
    },
    {
      id: 'belgium',
      name: { en: 'Belgium', ru: 'Бельгия' },
      path: 'belgium.json'
    },
    {
      id: 'bosnia-and-herzegovina',
      name: { en: 'Bosnia & Herzegovina', ru: 'Босния и Герцеговина' },
      path: 'bosnia-and-herzegovina.json'
    },
    {
      id: 'bulgaria',
      name: { en: 'Bulgaria', ru: 'Болгария' },
      path: 'bulgaria.json'
    },
    {
      id: 'croatia',
      name: { en: 'Croatia', ru: 'Хорватия' },
      path: 'croatia.json'
    },
    {
      id: 'cyprus',
      name: { en: 'Cyprus', ru: 'Кипр' },
      path: 'cyprus.json'
    },
    {
      id: 'czech-republic',
      name: { en: 'Czech Republic', ru: 'Чехия' },
      path: 'czech-republic.json'
    },
    {
      id: 'denmark',
      name: { en: 'Denmark', ru: 'Дания' },
      path: 'denmark.json'
    },
    {
      id: 'estonia',
      name: { en: 'Estonia', ru: 'Эстония' },
      path: 'estonia.json'
    },
    {
      id: 'faroe-islands',
      name: { en: 'Faroe islands', ru: 'Фарерские острова' },
      path: 'faroe-islands.json'
    },
    {
      id: 'finland',
      name: { en: 'Finland', ru: 'Финляндия' },
      path: 'finland.json'
    },
    {
      id: 'france',
      name: { en: 'France', ru: 'Франция' },
      path: 'france.json'
    },
    {
      id: 'georgia',
      name: { en: 'Georgia', ru: 'Грузия' },
      path: 'georgia.json'
    },
    {
      id: 'germany',
      name: { en: 'Germany', ru: 'Германия' },
      path: 'germany.json'
    },
    {
      id: 'great-britain',
      name: { en: 'Great Britain', ru: 'Великобритания' },
      path: 'great-britain.json'
    },
    {
      id: 'greece',
      name: { en: 'Greece', ru: 'Греция' },
      path: 'greece.json'
    },
    {
      id: 'hungary',
      name: { en: 'Hungary', ru: 'Венгрия' },
      path: 'hungary.json'
    },
    {
      id: 'iceland',
      name: { en: 'Iceland', ru: 'Исландия' },
      path: 'iceland.json'
    },
    {
      id: 'ireland',
      name: { en: 'Ireland', ru: 'Ирландия' },
      path: 'ireland.json'
    },
    {
      id: 'italy',
      name: { en: 'Italy', ru: 'Италия' },
      path: 'italy.json'
    },
    {
      id: 'kosovo',
      name: { en: 'Kosovo', ru: 'Косово' },
      path: 'kosovo.json'
    },
    {
      id: 'latvia',
      name: { en: 'Latvia', ru: 'Латвия' },
      path: 'latvia.json'
    },
    {
      id: 'liechtenstein',
      name: { en: 'Liechtenstein', ru: 'Лихтенштейн' },
      path: 'liechtenstein.json'
    },
    {
      id: 'lithuania',
      name: { en: 'Lithuania', ru: 'Литва' },
      path: 'lithuania.json'
    },
    {
      id: 'luxembourg',
      name: { en: 'Luxembourg', ru: 'Люксембург' },
      path: 'luxembourg.json'
    },
    {
      id: 'macedonia',
      name: { en: 'Macedonia', ru: 'Македония' },
      path: 'macedonia.json'
    },
    {
      id: 'malta',
      name: { en: 'malta', ru: 'Мальта' },
      path: 'malta.json'
    },
    {
      id: 'moldova',
      name: { en: 'Moldova', ru: 'Молдавия' },
      path: 'moldova.json'
    },
    {
      id: 'monaco',
      name: { en: 'Monaco', ru: 'Монако' },
      path: 'monaco.json'
    },
    {
      id: 'montenegro',
      name: { en: 'Montenegro', ru: 'Черногория' },
      path: 'montenegro.json'
    },
    {
      id: 'netherlands',
      name: { en: 'Netherlands', ru: 'Нидерланды' },
      path: 'netherlands.json'
    },
    {
      id: 'northern-cyprus',
      name: { en: 'Northern Cyprus', ru: 'Северный Кипр' },
      path: 'northern-cyprus.json'
    },
    {
      id: 'norway',
      name: { en: 'Norway', ru: 'Норвегия' },
      path: 'norway.json'
    },
    {
      id: 'poland',
      name: { en: 'Poland', ru: 'Польша' },
      path: 'poland.json'
    },
    {
      id: 'portugal',
      name: { en: 'Portugal', ru: 'Португалия' },
      path: 'portugal.json'
    },
    {
      id: 'romania',
      name: { en: 'Romania', ru: 'Румыния' },
      path: 'romania.json'
    },
    {
      id: 'russia',
      name: { en: 'Russia', ru: 'Россия' },
      path: 'russia.json'
    },
    {
      id: 'san-marino',
      name: { en: 'San marino', ru: 'Сан-Марино' },
      path: 'san-marino.json'
    },
    {
      id: 'serbia',
      name: { en: 'Serbia', ru: 'Сербия' },
      path: 'serbia.json'
    },
    {
      id: 'slovakia',
      name: { en: 'Slovakia', ru: 'Словакия' },
      path: 'slovakia.json'
    },
    {
      id: 'slovenia',
      name: { en: 'Slovenia', ru: 'Словения' },
      path: 'slovenia.json'
    },
    {
      id: 'spain',
      name: { en: 'Spain', ru: 'Испания' },
      path: 'spain.json'
    },
    {
      id: 'sweden',
      name: { en: 'Sweden', ru: 'Швеция' },
      path: 'sweden.json'
    },
    {
      id: 'switzerland',
      name: { en: 'Switzerland', ru: 'Швейцария' },
      path: 'switzerland.json'
    },
    {
      id: 'ukraine',
      name: { en: 'Ukraine', ru: 'Украина' },
      path: 'ukraine.json'
    }
  ]
};
