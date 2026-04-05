import { NextResponse } from 'next/server';

export async function GET() {
  const zones = [
    {
      id: 1,
      slug: 'tea_hall',
      name: { ru: 'Чайный зал', en: 'Tea Hall' },
      description: {
        ru: 'Главное пространство клуба. Высокие потолки, мягкий свет, тишина.',
        en: 'The main space of the club. High ceilings, soft light, silence.',
      },
      capacity: null,
      features: { ru: ['—'], en: ['—'] },
      images: [],
    },
    {
      id: 2,
      slug: 'lounge',
      name: { ru: 'Лаунж', en: 'Lounge' },
      description: {
        ru: 'Уютная зона для неформальных встреч.',
        en: 'A cozy area for informal meetings.',
      },
      capacity: null,
      features: { ru: ['—'], en: ['—'] },
      images: [],
    },
  ];

  return NextResponse.json({ zones });
}
