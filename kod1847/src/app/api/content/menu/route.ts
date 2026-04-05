import { NextRequest, NextResponse } from 'next/server';
import { menuData } from '@/lib/demo-data';

// GET /api/content/menu?category=tea — menu items
// GET /api/content/menu?flagship=true — flagship items only
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const flagship = searchParams.get('flagship');

  if (category && category in menuData) {
    const items = menuData[category as keyof typeof menuData];
    return NextResponse.json({ items });
  }

  if (flagship === 'true') {
    const allItems = Object.values(menuData).flat().filter((item) => item.flagship);
    return NextResponse.json({ items: allItems });
  }

  // Return categories
  const categories = [
    { id: 1, slug: 'tea', name: { ru: 'Чай', en: 'Tea' }, sort_order: 1, is_active: true },
    { id: 2, slug: 'hookah', name: { ru: 'Кальян', en: 'Hookah' }, sort_order: 2, is_active: true },
    { id: 3, slug: 'food', name: { ru: 'Еда', en: 'Food' }, sort_order: 3, is_active: true },
    { id: 4, slug: 'drinks', name: { ru: 'Напитки', en: 'Drinks' }, sort_order: 4, is_active: true },
  ];

  return NextResponse.json({ categories });
}
