import { NextRequest, NextResponse } from 'next/server';
import { eventsData } from '@/lib/demo-data';

// GET /api/content/events?from=2026-04-01&to=2026-05-31
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let events = eventsData;

  if (from) {
    events = events.filter((e) => e.date >= from);
  }
  if (to) {
    events = events.filter((e) => e.date <= to);
  }

  return NextResponse.json({ events });
}
