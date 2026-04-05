import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, date, time, guests, zone, comment } = body;

    // Validation
    const errors: Record<string, { ru: string; en: string }> = {};
    if (!name?.trim()) errors.name = { ru: 'Укажите имя', en: 'Name is required' };
    if (!phone?.trim()) errors.phone = { ru: 'Укажите телефон', en: 'Phone is required' };
    if (!date) errors.date = { ru: 'Укажите дату', en: 'Date is required' };
    if (!time) errors.time = { ru: 'Укажите время', en: 'Time is required' };
    if (!guests || guests < 1 || guests > 20) {
      errors.guests = { ru: 'От 1 до 20 гостей', en: '1 to 20 guests' };
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: { ru: 'Ошибка валидации', en: 'Validation error' }, fields: errors } },
        { status: 400 }
      );
    }

    // TODO: Save to database
    // TODO: Send Telegram notification
    const id = `booking_${Date.now()}`;

    return NextResponse.json(
      { id, status: 'pending', message: { ru: 'Бронирование принято', en: 'Booking received' } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: { ru: 'Ошибка сервера', en: 'Server error' } } },
      { status: 500 }
    );
  }
}
