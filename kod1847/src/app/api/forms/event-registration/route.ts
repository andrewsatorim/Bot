import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_id, name, phone, email, guests } = body;

    const errors: Record<string, { ru: string; en: string }> = {};
    if (!event_id) errors.event_id = { ru: 'Выберите мероприятие', en: 'Select an event' };
    if (!name?.trim()) errors.name = { ru: 'Укажите имя', en: 'Name is required' };
    if (!phone?.trim()) errors.phone = { ru: 'Укажите телефон', en: 'Phone is required' };

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: { ru: 'Ошибка валидации', en: 'Validation error' }, fields: errors } },
        { status: 400 }
      );
    }

    const id = `event_reg_${Date.now()}`;

    return NextResponse.json(
      { id, status: 'pending', message: { ru: 'Запись на мероприятие принята', en: 'Event registration received' } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: { ru: 'Ошибка сервера', en: 'Server error' } } },
      { status: 500 }
    );
  }
}
