import { Challenge } from '../types';

export const africa: Challenge = {
  id: 'africa',
  name: { en: 'Countries of Africa', ru: 'Страны Африки' },
  enabled: true,
  minimumZoomDistance: 1000000.0,
  view: {
    destination: {
      west: -25,
      east: 55,
      north: 40,
      south: -38,
      units: 'degrees'
    }
  },
  items: [
    { id: 'algeria', name: { en: 'Algeria', ru: 'Алжир' }, path: 'algeria.json' },
    { id: 'angola', name: { en: 'Angola', ru: 'Ангола' }, path: 'angola.json' },
    { id: 'benin', name: { en: 'Benin', ru: 'Бенин' }, path: 'benin.json' },
    { id: 'botswana', name: { en: 'Botswana', ru: 'Ботсвана' }, path: 'botswana.json' },
    { id: 'burkina-faso', name: { en: 'Burkina Faso', ru: 'Буркина-Фасо' }, path: 'burkina-faso.json' },
    { id: 'burundi', name: { en: 'Burundi', ru: 'Бурунди' }, path: 'burundi.json' },
    { id: 'cabo-verde', name: { en: 'Cabo Verde', ru: 'Кабо-Верде' }, path: 'cabo-verde.json' },
    { id: 'cameroon', name: { en: 'Cameroon', ru: 'Камерун' }, path: 'cameroon.json' },
    {
      id: 'central-african-republic',
      name: { en: 'Central African Republic', ru: 'Центральная Африканская Республика' },
      path: 'central-african-republic.json'
    },
    { id: 'chad', name: { en: 'Chad', ru: 'Чад' }, path: 'chad.json' },
    { id: 'comoros', name: { en: 'Comoros', ru: 'Коморские острова' }, path: 'comoros.json' },
    {
      id: 'democratic-republic-of-the-congo',
      name: { en: 'Democratic Republic of the Congo', ru: 'Демократическая республика Конго' },
      path: 'democratic-republic-of-the-congo.json'
    },
    { id: 'djibouti', name: { en: 'Djibouti', ru: 'Джибути' }, path: 'djibouti.json' },
    { id: 'egypt', name: { en: 'Egypt', ru: 'Египет' }, path: 'egypt.json' },
    {
      id: 'equatorial-guinea',
      name: { en: 'Equatorial Guinea', ru: 'Экваториальная Гвинея' },
      path: 'equatorial-guinea.json'
    },
    { id: 'eritrea', name: { en: 'Eritrea', ru: 'Эритрея' }, path: 'eritrea.json' },
    { id: 'eswatini', name: { en: 'Eswatini', ru: 'Эсватини' }, path: 'eswatini.json' },
    { id: 'ethiopia', name: { en: 'Ethiopia', ru: 'Эфиопия' }, path: 'ethiopia.json' },
    { id: 'gabon', name: { en: 'Gabon', ru: 'Габон' }, path: 'gabon.json' },
    { id: 'gambia', name: { en: 'Gambia', ru: 'Гамбия' }, path: 'gambia.json' },
    { id: 'ghana', name: { en: 'Ghana', ru: 'Гана' }, path: 'ghana.json' },
    { id: 'guinea', name: { en: 'Guinea', ru: 'Гвинея' }, path: 'guinea.json' },
    { id: 'guinea-bissau', name: { en: 'Guinea-Bissau', ru: 'Гвинея-Биссау' }, path: 'guinea-bissau.json' },
    { id: 'ivory-coast', name: { en: 'Ivory Coast', ru: "Кот'д-Ивуар" }, path: 'ivory-coast.json' },
    { id: 'kenya', name: { en: 'Kenya', ru: 'Кения' }, path: 'kenya.json' },
    { id: 'lesotho', name: { en: 'Lesotho', ru: 'Лесото' }, path: 'lesotho.json' },
    { id: 'liberia', name: { en: 'Liberia', ru: 'Либерия' }, path: 'liberia.json' },
    { id: 'libya', name: { en: 'Libya', ru: 'Ливия' }, path: 'libya.json' },
    { id: 'madagascar', name: { en: 'Madagascar', ru: 'Мадагаскар' }, path: 'madagascar.json' },
    { id: 'malawi', name: { en: 'Malawi', ru: 'Малави' }, path: 'malawi.json' },
    { id: 'mali', name: { en: 'Mali', ru: 'Мали' }, path: 'mali.json' },
    { id: 'mauritania', name: { en: 'Mauritania', ru: 'Мавритания' }, path: 'mauritania.json' },
    { id: 'mauritius', name: { en: 'Mauritius', ru: 'Маврикий' }, path: 'mauritius.json' },
    { id: 'morocco', name: { en: 'Morocco', ru: 'Марокко' }, path: 'morocco.json' },
    { id: 'mozambique', name: { en: 'Mozambique', ru: 'Мозамбик' }, path: 'mozambique.json' },
    { id: 'namibia', name: { en: 'Namibia', ru: 'Намибия' }, path: 'namibia.json' },
    { id: 'niger', name: { en: 'Niger', ru: 'Нигер' }, path: 'niger.json' },
    { id: 'nigeria', name: { en: 'Nigeria', ru: 'Нигерия' }, path: 'nigeria.json' },
    {
      id: 'republic-of-the-congo',
      name: { en: 'Republic of the Congo', ru: 'Республика Конго' },
      path: 'republic-of-the-congo.json'
    },
    { id: 'rwanda', name: { en: 'Rwanda', ru: 'Руанда' }, path: 'rwanda.json' },
    {
      id: 'sao-tome-and-principe',
      name: { en: 'Sao Tome and Principe', ru: 'Сан-Томе и Принсипи' },
      path: 'sao-tome-and-principe.json'
    },
    { id: 'senegal', name: { en: 'Senegal', ru: 'Сенегал' }, path: 'senegal.json' },
    { id: 'seychelles', name: { en: 'Seychelles', ru: 'Сейшельские острова' }, path: 'seychelles.json' },
    { id: 'sierra-leone', name: { en: 'Sierra Leone', ru: 'Сьерра-Леоне' }, path: 'sierra-leone.json' },
    { id: 'somalia', name: { en: 'Somalia', ru: 'Сомали' }, path: 'somalia.json' },
    { id: 'somaliland', name: { en: 'Somaliland', ru: 'Сомалиленд' }, path: 'somaliland.json' },
    { id: 'south-africa', name: { en: 'South Africa', ru: 'Южно-Африканская Республика' }, path: 'south-africa.json' },
    { id: 'south-sudan', name: { en: 'South Sudan', ru: 'Южный Судан' }, path: 'south-sudan.json' },
    { id: 'sudan', name: { en: 'Sudan', ru: 'Судан' }, path: 'sudan.json' },
    { id: 'togo', name: { en: 'Togo', ru: 'Того' }, path: 'togo.json' },
    { id: 'tunisia', name: { en: 'Tunisia', ru: 'Тунис' }, path: 'tunisia.json' },
    { id: 'uganda', name: { en: 'Uganda', ru: 'Уганда' }, path: 'uganda.json' },
    {
      id: 'united-republic-of-tanzania',
      name: { en: 'United Republic of Tanzania', ru: 'Объединённая республика Танзания' },
      path: 'united-republic-of-tanzania.json'
    },
    { id: 'western-sahara', name: { en: 'Western Sahara', ru: 'Западная Сахара' }, path: 'western-sahara.json' },
    { id: 'zambia', name: { en: 'Zambia', ru: 'Замбия' }, path: 'zambia.json' },
    { id: 'zimbabwe', name: { en: 'Zimbabwe', ru: 'Зимбабве' }, path: 'zimbabwe.json' }
  ]
};
