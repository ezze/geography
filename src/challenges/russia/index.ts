import { Challenge } from '../types';

export const russia: Challenge = {
  id: 'russia',
  name: { en: 'Russian Regions', ru: 'Регионы России' },
  enabled: true,
  minimumZoomDistance: 1000000.0,
  view: {
    destination: {
      west: 20,
      south: 40,
      north: 90,
      east: 180,
      units: 'degrees'
    }
  },
  items: [
    {
      id: 'adygea-republic',
      name: { en: 'Republic of Adygea', ru: 'Республика Адыгея' },
      path: 'adygea-republic.json'
    },
    {
      id: 'altai-region',
      name: { en: 'Altai Region', ru: 'Алтайский край' },
      path: 'altai-region.json'
    },
    {
      id: 'altai-republic',
      name: { en: 'Altai Republic', ru: 'Республика Алтай' },
      path: 'altai-republic.json'
    },
    {
      id: 'amur-region',
      name: { en: 'Amur region', ru: 'Амурская область' },
      path: 'amur-region.json'
    },
    {
      id: 'arkhangelsk-region',
      name: { en: 'Arkhangelsk Region', ru: 'Архангельская область' },
      path: 'arkhangelsk-region.json'
    },
    {
      id: 'astrakhan-region',
      name: { en: 'Astrakhan Region', ru: 'Астраханская область' },
      path: 'astrakhan-region.json'
    },
    {
      id: 'bashkortostan-republic',
      name: { en: 'Republic of Bashkortostan', ru: 'Республика Башкортостан' },
      path: 'bashkortostan-republic.json'
    },
    {
      id: 'belgorod-region',
      name: { en: 'Belgorod Region', ru: 'Белгородская область' },
      path: 'belgorod-region.json'
    },
    {
      id: 'bryansk-region',
      name: { en: 'Bryansk Region', ru: 'Брянская область' },
      path: 'bryansk-region.json'
    },
    {
      id: 'buryatia-republic',
      name: { en: 'Republic of Buryatia', ru: 'Республика Бурятия' },
      path: 'buryatia-republic.json'
    },
    {
      id: 'chechen-republic',
      name: { en: 'Checkhen Republic', ru: 'Чеченская республика' },
      path: 'chechen-republic.json'
    },
    {
      id: 'chelyabinsk-region',
      name: { en: 'Chelyabinsk Region', ru: 'Челябинская область' },
      path: 'chelyabinsk-region.json'
    },
    {
      id: 'chukotka-autonomous-okrug',
      name: { en: 'Chukotka Autonomous Okrug', ru: 'Чукотский автономный округ' },
      path: 'chukotka-autonomous-okrug.json'
    },
    {
      id: 'chuvash-republic',
      name: { en: 'Chuvash Republic', ru: 'Чувашская республика' },
      path: 'chuvash-republic.json'
    },
    {
      id: 'crimea-republic',
      name: { en: 'Republic of Crimea', ru: 'Республика Крым' },
      path: 'crimea-republic.json'
    },
    {
      id: 'dagestan-republic',
      name: { en: 'Republic of Dagestan', ru: 'Республика Дагестан' },
      path: 'dagestan-republic.json'
    },
    {
      id: 'ingushetia-republic',
      name: { en: 'Republic of Ingushetia', ru: 'Республика Ингушетия' },
      path: 'ingushetia-republic.json'
    },
    {
      id: 'irkutsk-region',
      name: { en: 'Irkutsk Region', ru: 'Иркутская область' },
      path: 'irkutsk-region.json'
    },
    {
      id: 'ivanovo-region',
      name: { en: 'Ivanovo Region', ru: 'Ивановская область' },
      path: 'ivanovo-region.json'
    },
    {
      id: 'jewish-autonomous-region',
      name: { en: 'Jewish Autonomous Region', ru: 'Еврейская автономная область' },
      path: 'jewish-autonomous-region.json'
    },
    {
      id: 'kabardino-balkar-republic',
      name: { en: 'Kabardino-Balkar Republic', ru: 'Кабардино-Балкарская республика' },
      path: 'kabardino-balkar-republic.json'
    },
    {
      id: 'kaliningrad-region',
      name: { en: 'Kaliningrad Region', ru: 'Калининградская область' },
      path: 'kaliningrad-region.json'
    },
    {
      id: 'kalmykia-republic',
      name: { en: 'Republic of Kalmykia', ru: 'Республика Калмыкия' },
      path: 'kalmykia-republic.json'
    },
    {
      id: 'kaluga-region',
      name: { en: 'Kaluga Region', ru: 'Калужская область' },
      path: 'kaluga-region.json'
    },
    {
      id: 'kamchatka-region',
      name: { en: 'Kamchatka Region', ru: 'Камчатская область' },
      path: 'kamchatka-region.json'
    },
    {
      id: 'karachay-cherkess-republic',
      name: { en: 'Karachay-Cherkess Republic', ru: 'Карачаево-Черкесская республика' },
      path: 'karachay-cherkess-republic.json'
    },
    {
      id: 'karelia-republic',
      name: { en: 'Republic of Karelia', ru: 'Республика Карелия' },
      path: 'karelia-republic.json'
    },
    {
      id: 'kemerovo-region',
      name: { en: 'Kemerovo Region', ru: 'Кемеровская область' },
      path: 'kemerovo-region.json'
    },
    {
      id: 'khabarovsk-region',
      name: { en: 'Khabarosvk Region', ru: 'Хабаровский край' },
      path: 'khabarovsk-region.json'
    },
    {
      id: 'khakassia-republic',
      name: { en: 'Republic of Khakassia', ru: 'Республика Хакасия' },
      path: 'khakassia-republic.json'
    },
    {
      id: 'khanty-mansi-autonomous-okrug-yugra',
      name: { en: 'Khanty-Mansi Autonomous Okrug — Yugra', ru: 'Ханты-Мансийский автономный округ — Югра' },
      path: 'khanty-mansi-autonomous-okrug-yugra.json'
    },
    {
      id: 'kirov-region',
      name: { en: 'Kirov region', ru: 'Кировская область' },
      path: 'kirov-region.json'
    },
    {
      id: 'komi-republic',
      name: { en: 'Komi republic', ru: 'Республика Коми' },
      path: 'komi-republic.json'
    },
    {
      id: 'kostroma-region',
      name: { en: 'Kostroma Region', ru: 'Костромская область' },
      path: 'kostroma-region.json'
    },
    {
      id: 'krasnodar-region',
      name: { en: 'Krasnodar Region', ru: 'Краснодарский край' },
      path: 'krasnodar-region.json'
    },
    {
      id: 'krasnoyarsk-region',
      name: { en: 'Krasnoyarks Region', ru: 'Красноярский край' },
      path: 'krasnoyarsk-region.json'
    },
    {
      id: 'kurgan-region',
      name: { en: 'Kurgan Region', ru: 'Курганская область' },
      path: 'kurgan-region.json'
    },
    {
      id: 'kursk-region',
      name: { en: 'Kurks Region', ru: 'Курская область' },
      path: 'kursk-region.json'
    },
    {
      id: 'leningrad-region',
      name: { en: 'Leningrad Region', ru: 'Ленинградская область' },
      path: 'leningrad-region.json'
    },
    {
      id: 'lipetsk-region',
      name: { en: 'Lipetsk Region', ru: 'Липецкая область' },
      path: 'lipetsk-region.json'
    },
    {
      id: 'magadan-region',
      name: { en: 'Magadan Region', ru: 'Магаданская область' },
      path: 'magadan-region.json'
    },
    {
      id: 'mari-el-republic',
      name: { en: 'Mari El Republic', ru: 'Республика Марий-Эл' },
      path: 'mari-el-republic.json'
    },
    {
      id: 'mordovia-republic',
      name: { en: 'Republic of Mordovia', ru: 'Республика Мордовия' },
      path: 'mordovia-republic.json'
    },
    {
      id: 'moscow',
      name: { en: 'Moscow', ru: 'Москва' },
      path: 'moscow.json'
    },
    {
      id: 'moscow-region',
      name: { en: 'Moscow Region', ru: 'Московская область' },
      path: 'moscow-region.json'
    },
    {
      id: 'murmansk-region',
      name: { en: 'Murmansk Region', ru: 'Мурманская область' },
      path: 'murmansk-region.json'
    },
    {
      id: 'nenets-autonomous-okrug',
      name: { en: 'Nenets Autonomous Okrug', ru: 'Ненецкий автономный округ' },
      path: 'nenets-autonomous-okrug.json'
    },
    {
      id: 'nizhny-novgorod-region',
      name: { en: 'Nizhny Novgorod Region', ru: 'Нижегородская область' },
      path: 'nizhny-novgorod-region.json'
    },
    {
      id: 'north-ossetia-republic',
      name: { en: 'North Ossetia (Alania) Republic', ru: 'Республика Северная Осетия (Алания)' },
      path: 'north-ossetia-republic.json'
    },
    {
      id: 'novgorod-region',
      name: { en: 'Novgorod Region', ru: 'Новгородская область' },
      path: 'novgorod-region.json'
    },
    {
      id: 'novosibirsk-region',
      name: { en: 'Novosibirsk Region', ru: 'Новосибирская область' },
      path: 'novosibirsk-region.json'
    },
    {
      id: 'omsk-region',
      name: { en: 'Omsk Region', ru: 'Омская область' },
      path: 'omsk-region.json'
    },
    {
      id: 'orel-region',
      name: { en: 'Orel Region', ru: 'Орловская область' },
      path: 'orel-region.json'
    },
    {
      id: 'orenburg-region',
      name: { en: 'Orenburg Region', ru: 'Оренбургская область' },
      path: 'orenburg-region.json'
    },
    {
      id: 'penza-region',
      name: { en: 'Penza Region', ru: 'Пензенская область' },
      path: 'penza-region.json'
    },
    {
      id: 'perm-region',
      name: { en: 'Perm Region', ru: 'Пермский край' },
      path: 'perm-region.json'
    },
    {
      id: 'primorsky-region',
      name: { en: 'Primorsky Region', ru: 'Приморский край' },
      path: 'primorsky-region.json'
    },
    {
      id: 'pskov-region',
      name: { en: 'Pskov Region', ru: 'Псковская область' },
      path: 'pskov-region.json'
    },
    {
      id: 'rostov-region',
      name: { en: 'Rostov Region', ru: 'Ростовская область' },
      path: 'rostov-region.json'
    },
    {
      id: 'ryazan-region',
      name: { en: 'Ryazan Region', ru: 'Рязанская область' },
      path: 'ryazan-region.json'
    },
    {
      id: 'saint-petersburg',
      name: { en: 'Saint Petersburg', ru: 'Санкт-Петербург' },
      path: 'saint-petersburg.json'
    },
    {
      id: 'sakhalin-region',
      name: { en: 'Sakhalin Region', ru: 'Сахалинская область' },
      path: 'sakhalin-region.json'
    },
    {
      id: 'samara-region',
      name: { en: 'Samara Region', ru: 'Самарская область' },
      path: 'samara-region.json'
    },
    {
      id: 'saratov-region',
      name: { en: 'Saratov Region', ru: 'Саратовская область' },
      path: 'saratov-region.json'
    },
    {
      id: 'sevastopol',
      name: { en: 'Sevastopol', ru: 'Севастополь' },
      path: 'sevastopol.json'
    },
    {
      id: 'smolensk-region',
      name: { en: 'Smolensk Region', ru: 'Смоленская область' },
      path: 'smolensk-region.json'
    },
    {
      id: 'stavropol-region',
      name: { en: 'Stavropol Region', ru: 'Ставропольский край' },
      path: 'stavropol-region.json'
    },
    {
      id: 'sverdlovsk-region',
      name: { en: 'Sverdlovsk Region', ru: 'Свердловская область' },
      path: 'sverdlovsk-region.json'
    },
    {
      id: 'tambov-region',
      name: { en: 'Tambov Region', ru: 'Тамбовская область' },
      path: 'tambov-region.json'
    },
    {
      id: 'tatarstan-republic',
      name: { en: 'Republic of Tatarstan', ru: 'Республика Татарстан' },
      path: 'tatarstan-republic.json'
    },
    {
      id: 'tomsk-region',
      name: { en: 'Tomsk Region', ru: 'Томская область' },
      path: 'tomsk-region.json'
    },
    {
      id: 'tula-region',
      name: { en: 'Tula Region', ru: 'Тульская область' },
      path: 'tula-region.json'
    },
    {
      id: 'tuva-republic',
      name: { en: 'Tuva Republic', ru: 'Республика Тыва' },
      path: 'tuva-republic.json'
    },
    {
      id: 'tver-region',
      name: { en: 'Tver Region', ru: 'Тверская область' },
      path: 'tver-region.json'
    },
    {
      id: 'tyumen-region',
      name: { en: 'Tyumen Region', ru: 'Тюменская область' },
      path: 'tyumen-region.json'
    },
    {
      id: 'udmurt-republic',
      name: { en: 'Udmurt Republic', ru: 'Удмуртская республика' },
      path: 'udmurt-republic.json'
    },
    {
      id: 'ulyanovsk-region',
      name: { en: 'Ulyanovsk Region', ru: 'Ульяновская область' },
      path: 'ulyanovsk-region.json'
    },
    {
      id: 'vladimir-region',
      name: { en: 'Vladimir Region', ru: 'Владимирская область' },
      path: 'vladimir-region.json'
    },
    {
      id: 'volgograd-region',
      name: { en: 'Volgograd Region', ru: 'Волгоградская область' },
      path: 'volgograd-region.json'
    },
    {
      id: 'vologda-region',
      name: { en: 'Vologda Region', ru: 'Вологодская область' },
      path: 'vologda-region.json'
    },
    {
      id: 'voronezh-region',
      name: { en: 'Voronezh Region', ru: 'Воронежская область' },
      path: 'voronezh-region.json'
    },
    {
      id: 'yakutia-republic',
      name: { en: 'Yakutia (Sakha) Republic', ru: 'Республика Якутия (Саха)' },
      path: 'yakutia-republic.json'
    },
    {
      id: 'yamalo-nenets-autonomous-okrug',
      name: { en: 'Yamalo-Nenets Autonomous Okrug', ru: 'Ямало-Ненецкий автономный округ' },
      path: 'yamalo-nenets-autonomous-okrug.json'
    },
    {
      id: 'yaroslavl-region',
      name: { en: 'Yaroslavl Region', ru: 'Ярославская область' },
      path: 'yaroslavl-region.json'
    },
    {
      id: 'zabaykalsky-region',
      name: { en: 'Zabaykalsky Region', ru: 'Забайкальский край' },
      path: 'zabaykalsky-region.json'
    }
  ]
};
