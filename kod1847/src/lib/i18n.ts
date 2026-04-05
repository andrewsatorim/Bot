export type Locale = 'ru' | 'en';

export const defaultLocale: Locale = 'ru';

export const translations = {
  ru: {
    nav: {
      teaHall: 'Чайный зал',
      library: 'Библиотека',
      wardrobe: 'Гардероб',
      reserve: 'Резерв',
    },
    hero: {
      subtitle: 'ЧАСТНЫЙ ЧАЙНЫЙ КЛУБ · АРБАТ',
      title: 'Пространство доверия',
      titleItalic: 'и смысла',
      cta: 'РЕЗЕРВ',
      scroll: 'Листайте вниз',
    },
    about: {
      label: 'О КЛУБЕ',
      title: 'Остров тишины',
      text: 'Код 1847 — частный чайный клуб на Арбате. Место, где время замедляется, а разговоры обретают глубину. Здесь встречаются люди, которые ценят паузу, осмысленность и тепло настоящего общения. Мы храним традиции, оставаясь современными.',
      since: 'SINCE 1847',
    },
    zones: {
      label: 'ЗОНЫ КЛУБА',
      teaHall: {
        label: 'TEA HALL',
        name: 'Чайный зал',
        description: 'Главное пространство клуба. Высокие потолки, мягкий свет, тишина. Идеально для чайных церемоний и камерных встреч.',
        capacity: '—',
        cta: 'Забронировать',
      },
      lounge: {
        label: 'LOUNGE',
        name: 'Лаунж',
        description: 'Уютная зона для неформальных встреч. Мягкие кресла, приглушённый свет, атмосфера расслабленного разговора.',
        capacity: '—',
        cta: 'Забронировать',
      },
    },
    menu: {
      label: 'ИЗБРАННОЕ',
      title: 'Меню',
      tabs: ['Чай', 'Кальян', 'Еда', 'Напитки'],
      fullMenu: 'ПОЛНОЕ МЕНЮ',
      pageTitle: 'Меню',
      categories: {
        tea: 'Чай',
        hookah: 'Кальян',
        food: 'Еда',
        drinks: 'Напитки',
      },
    },
    events: {
      label: 'РАСПИСАНИЕ',
      title: 'Мероприятия',
      signUp: 'Записаться',
      pageTitle: 'Мероприятия',
      calendar: 'Календарь',
      form: {
        title: 'Запись на мероприятие',
        name: 'Имя',
        phone: 'Телефон',
        email: 'Email',
        event: 'Мероприятие',
        submit: 'Записаться',
        success: 'Заявка отправлена!',
      },
    },
    gallery: {
      title: 'Галерея',
    },
    contacts: {
      title: 'Контакты',
      address: 'Арбат, Москва',
      phone: '+7 (495) 000-00-00',
      email: 'info@kod1847.ru',
      form: {
        title: 'Обратная связь',
        name: 'Имя',
        email: 'Email',
        message: 'Сообщение',
        submit: 'Отправить',
        success: 'Сообщение отправлено!',
      },
    },
    booking: {
      title: 'Бронирование',
      date: 'Дата',
      time: 'Время',
      guests: 'Количество гостей',
      name: 'Имя',
      phone: 'Телефон',
      comment: 'Комментарий',
      submit: 'Забронировать',
      success: 'Бронирование отправлено!',
    },
    club: {
      title: 'Членство',
      subtitle: 'Станьте частью клуба',
      levels: {
        visit: {
          name: 'Разовое посещение',
          description: 'Познакомьтесь с клубом. Один визит — без обязательств.',
          price: 'По запросу',
        },
        member: {
          name: 'Член клуба',
          description: 'Регулярный доступ, приоритетное бронирование, участие в закрытых мероприятиях.',
          price: 'По запросу',
          featured: true,
        },
        resident: {
          name: 'Резидент',
          description: 'Полный доступ ко всем пространствам и событиям клуба. Персональный сервис.',
          price: 'По запросу',
        },
      },
      form: {
        title: 'Заявка на членство',
        name: 'Имя',
        phone: 'Телефон',
        email: 'Email',
        source: 'Как узнали о клубе',
        message: 'Сообщение',
        submit: 'Отправить заявку',
        success: 'Заявка отправлена!',
      },
    },
    footer: {
      privacy: 'Политика конфиденциальности',
      rights: '© 2026 Код 1847. Все права защищены.',
    },
  },
  en: {
    nav: {
      teaHall: 'Tea Hall',
      library: 'Library',
      wardrobe: 'Wardrobe',
      reserve: 'Reserve',
    },
    hero: {
      subtitle: 'PRIVATE TEA CLUB · ARBAT',
      title: 'A space of trust',
      titleItalic: 'and meaning',
      cta: 'RESERVE',
      scroll: 'Scroll down',
    },
    about: {
      label: 'ABOUT',
      title: 'An Island of Silence',
      text: 'Code 1847 is a private tea club on Arbat. A place where time slows down and conversations gain depth. Here, people who value pause, mindfulness, and the warmth of genuine connection come together. We honor tradition while staying contemporary.',
      since: 'SINCE 1847',
    },
    zones: {
      label: 'CLUB ZONES',
      teaHall: {
        label: 'TEA HALL',
        name: 'Tea Hall',
        description: 'The main space of the club. High ceilings, soft light, silence. Perfect for tea ceremonies and intimate gatherings.',
        capacity: '—',
        cta: 'Book Now',
      },
      lounge: {
        label: 'LOUNGE',
        name: 'Lounge',
        description: 'A cozy area for informal meetings. Soft armchairs, dim lighting, an atmosphere of relaxed conversation.',
        capacity: '—',
        cta: 'Book Now',
      },
    },
    menu: {
      label: 'SELECTION',
      title: 'Menu',
      tabs: ['Tea', 'Hookah', 'Food', 'Drinks'],
      fullMenu: 'FULL MENU',
      pageTitle: 'Menu',
      categories: {
        tea: 'Tea',
        hookah: 'Hookah',
        food: 'Food',
        drinks: 'Drinks',
      },
    },
    events: {
      label: 'SCHEDULE',
      title: 'Events',
      signUp: 'Sign Up',
      pageTitle: 'Events',
      calendar: 'Calendar',
      form: {
        title: 'Event Registration',
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        event: 'Event',
        submit: 'Sign Up',
        success: 'Registration submitted!',
      },
    },
    gallery: {
      title: 'Gallery',
    },
    contacts: {
      title: 'Contacts',
      address: 'Arbat, Moscow',
      phone: '+7 (495) 000-00-00',
      email: 'info@kod1847.ru',
      form: {
        title: 'Contact Us',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send',
        success: 'Message sent!',
      },
    },
    booking: {
      title: 'Reservation',
      date: 'Date',
      time: 'Time',
      guests: 'Number of Guests',
      name: 'Name',
      phone: 'Phone',
      comment: 'Comment',
      submit: 'Reserve',
      success: 'Reservation submitted!',
    },
    club: {
      title: 'Membership',
      subtitle: 'Become a part of the club',
      levels: {
        visit: {
          name: 'Single Visit',
          description: 'Get to know the club. One visit — no commitment.',
          price: 'On Request',
        },
        member: {
          name: 'Club Member',
          description: 'Regular access, priority booking, attendance at private events.',
          price: 'On Request',
          featured: true,
        },
        resident: {
          name: 'Resident',
          description: 'Full access to all spaces and club events. Personal service.',
          price: 'On Request',
        },
      },
      form: {
        title: 'Membership Application',
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        source: 'How did you hear about us',
        message: 'Message',
        submit: 'Submit Application',
        success: 'Application submitted!',
      },
    },
    footer: {
      privacy: 'Privacy Policy',
      rights: '© 2026 Code 1847. All rights reserved.',
    },
  },
} as const;

export type Translations = typeof translations.ru;

export function t(locale: Locale): Translations {
  return translations[locale];
}
