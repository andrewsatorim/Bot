import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const errors: Record<string, { ru: string; en: string }> = {};
    if (!name?.trim()) errors.name = { ru: 'Укажите имя', en: 'Name is required' };
    if (!email?.trim() || !email.includes('@')) errors.email = { ru: 'Укажите корректный email', en: 'Valid email is required' };
    if (!message?.trim()) errors.message = { ru: 'Напишите сообщение', en: 'Message is required' };

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: { ru: 'Ошибка валидации', en: 'Validation error' }, fields: errors } },
        { status: 400 }
      );
    }

    const id = `contact_${Date.now()}`;

    return NextResponse.json(
      { id, status: 'pending', message: { ru: 'Сообщение отправлено', en: 'Message sent' } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: { ru: 'Ошибка сервера', en: 'Server error' } } },
      { status: 500 }
    );
  }
}
