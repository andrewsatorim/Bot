'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { menuData } from '@/lib/demo-data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n';
import type { MenuCategory } from '@/types';

const categoryKeys: MenuCategory[] = ['tea', 'hookah', 'food', 'drinks'];

export default function MenuPreview() {
  const { locale, t } = useLocale();
  const [activeTab, setActiveTab] = useState<MenuCategory>('tea');

  const items = menuData[activeTab].slice(0, 4);

  return (
    <section id="menu" className="min-h-screen flex items-center section-light py-24">
      <div className="max-w-site mx-auto px-6 lg:px-8 w-full">
        <ScrollReveal>
          <p className="label-caption text-stone text-center mb-4">{t.menu.label}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="heading-h2 text-ink text-center mb-12">{t.menu.title}</h2>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center gap-8 mb-16 overflow-x-auto">
            {categoryKeys.map((key, i) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="relative font-raleway text-xs uppercase tracking-[0.2em] pb-2 transition-colors duration-300"
                style={{ color: activeTab === key ? '#08080A' : '#9A958B' }}
              >
                {t.menu.tabs[i]}
                <span
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-center transition-transform duration-[400ms]"
                  style={{
                    transform: activeTab === key ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Menu Items */}
        <div className="max-w-2xl mx-auto space-y-6">
          {items.map((item, i) => (
            <ScrollReveal key={item.id} delay={300 + i * 100}>
              <div className="flex items-baseline gap-2 group">
                <div className="flex-shrink-0">
                  <h4 className="font-cormorant text-xl text-ink">
                    {item.name[locale as Locale]}
                  </h4>
                  <p className="text-stone text-xs mt-1">
                    {item.description[locale as Locale]}
                  </p>
                </div>
                <div className="dot-leader" />
                <span className="font-bodoni text-lg text-gold flex-shrink-0">
                  {item.price} ₽
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={700}>
          <div className="text-center mt-16">
            <a href="/menu" className="btn-gold">
              {t.menu.fullMenu}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
