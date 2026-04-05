export const menuData = {
  tea: [
    { id: 1, name: { ru: 'Да Хун Пао', en: 'Da Hong Pao' }, description: { ru: 'Легендарный утёсный улун из Уишань. Глубокий, тёплый, многослойный', en: 'Legendary rock oolong from Wuyishan. Deep, warm, layered' }, price: 1200, flagship: true },
    { id: 2, name: { ru: 'Те Гуань Инь', en: 'Tie Guan Yin' }, description: { ru: 'Классический улун со сливочным послевкусием', en: 'Classic oolong with a creamy aftertaste' }, price: 900, flagship: false },
    { id: 3, name: { ru: 'Лун Цзин', en: 'Long Jing' }, description: { ru: 'Зелёный чай из Ханчжоу. Сладкий, ореховый, освежающий', en: 'Green tea from Hangzhou. Sweet, nutty, refreshing' }, price: 1100, flagship: true },
    { id: 4, name: { ru: 'Шу Пуэр 2015', en: 'Shu Puer 2015' }, description: { ru: 'Выдержанный пуэр с нотами земли и шоколада', en: 'Aged puer with notes of earth and chocolate' }, price: 800, flagship: false },
  ],
  hookah: [
    { id: 10, name: { ru: 'Классический', en: 'Classic' }, description: { ru: 'Традиционный табак, плавный дым', en: 'Traditional tobacco, smooth smoke' }, price: 2500, flagship: false },
    { id: 11, name: { ru: 'Авторский микс', en: 'Signature Mix' }, description: { ru: 'Сезонная композиция от мастера', en: 'Seasonal blend by our master' }, price: 3000, flagship: true },
    { id: 12, name: { ru: 'Фруктовый', en: 'Fruit' }, description: { ru: 'Лёгкий фруктовый микс', en: 'Light fruit blend' }, price: 2800, flagship: false },
  ],
  food: [
    { id: 20, name: { ru: 'Сырная тарелка', en: 'Cheese Board' }, description: { ru: 'Подборка выдержанных сыров с мёдом и орехами', en: 'Selection of aged cheeses with honey and nuts' }, price: 1800, flagship: true },
    { id: 21, name: { ru: 'Брускетта с томатами', en: 'Tomato Bruschetta' }, description: { ru: 'Хрустящий хлеб, свежие томаты, базилик', en: 'Crispy bread, fresh tomatoes, basil' }, price: 700, flagship: false },
    { id: 22, name: { ru: 'Десерт дня', en: 'Dessert of the Day' }, description: { ru: 'Авторский десерт от шефа', en: 'Chef\'s signature dessert' }, price: 900, flagship: false },
  ],
  drinks: [
    { id: 30, name: { ru: 'Лимонад Юдзу', en: 'Yuzu Lemonade' }, description: { ru: 'Свежий цитрусовый лимонад с юдзу', en: 'Fresh citrus lemonade with yuzu' }, price: 600, flagship: true },
    { id: 31, name: { ru: 'Морс клюквенный', en: 'Cranberry Mors' }, description: { ru: 'Домашний морс из свежей клюквы', en: 'Homemade cranberry juice' }, price: 450, flagship: false },
    { id: 32, name: { ru: 'Матча Латте', en: 'Matcha Latte' }, description: { ru: 'Японская матча на овсяном молоке', en: 'Japanese matcha on oat milk' }, price: 550, flagship: false },
  ],
};

export const eventsData = [
  {
    id: 1,
    title: { ru: 'Чайная церемония Гунфу', en: 'Gongfu Tea Ceremony' },
    description: { ru: 'Погружение в традиционную китайскую чайную церемонию', en: 'Deep dive into traditional Chinese tea ceremony' },
    date: '2026-04-12',
    time: '18:00',
    zone: 'tea_hall' as const,
    capacity: 12,
    registered: 5,
  },
  {
    id: 2,
    title: { ru: 'Вечер поэзии', en: 'Poetry Evening' },
    description: { ru: 'Камерный вечер современной поэзии', en: 'An intimate evening of contemporary poetry' },
    date: '2026-04-19',
    time: '19:30',
    zone: 'lounge' as const,
    capacity: 20,
    registered: 8,
  },
  {
    id: 3,
    title: { ru: 'Дегустация пуэров', en: 'Puer Tasting' },
    description: { ru: 'Сравнительная дегустация шу и шен пуэров разных лет', en: 'Comparative tasting of shu and sheng puers of different years' },
    date: '2026-04-26',
    time: '17:00',
    zone: 'tea_hall' as const,
    capacity: 8,
    registered: 3,
  },
  {
    id: 4,
    title: { ru: 'Джазовый вечер', en: 'Jazz Evening' },
    description: { ru: 'Живая музыка в камерной атмосфере клуба', en: 'Live music in the intimate atmosphere of the club' },
    date: '2026-05-03',
    time: '20:00',
    zone: 'lounge' as const,
    capacity: 30,
    registered: 15,
  },
  {
    id: 5,
    title: { ru: 'Мастер-класс по каллиграфии', en: 'Calligraphy Workshop' },
    description: { ru: 'Основы японской каллиграфии кистью', en: 'Basics of Japanese brush calligraphy' },
    date: '2026-05-10',
    time: '16:00',
    zone: 'tea_hall' as const,
    capacity: 10,
    registered: 2,
  },
];

export const galleryData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  alt: { ru: `Код 1847 — фото ${i + 1}`, en: `Code 1847 — photo ${i + 1}` },
}));
