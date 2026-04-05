import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    about: {
      ru: 'Код 1847 — частный чайный клуб на Арбате. Место, где время замедляется, а разговоры обретают глубину.',
      en: 'Code 1847 is a private tea club on Arbat. A place where time slows down and conversations gain depth.',
    },
    address: { ru: 'Арбат, Москва', en: 'Arbat, Moscow' },
    phone: '+7 (495) 000-00-00',
    email: 'info@kod1847.ru',
    coordinates: { lat: 55.7520, lng: 37.5870 },
    socials: {
      telegram: 'https://t.me/kod1847',
      instagram: 'https://instagram.com/kod1847',
    },
    working_hours: {
      ru: 'Ежедневно 12:00 — 00:00',
      en: 'Daily 12:00 PM — 12:00 AM',
    },
  });
}
