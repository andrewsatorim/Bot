import { NextResponse } from 'next/server';
import { galleryData } from '@/lib/demo-data';

export async function GET() {
  return NextResponse.json({
    gallery: galleryData.map((item) => ({
      ...item,
      url: null,
      thumb_url: null,
      sort_order: item.id,
    })),
  });
}
