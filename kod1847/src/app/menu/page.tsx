'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { menuData } from '@/lib/demo-data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n';
import type { MenuCategory } from '@/types';

const categoryKeys: MenuCategory[] = ['tea', 'hookah', 'food', 'drinks'];

export default function MenuPage() {
  const { locale, t } = useLocale();
  const [activeTab, setActiveTab] = useState<MenuCategory>('tea');
  const items = menuData[activeTab];

  return (
    <div className="min-h-screen section-dark pt-24 pb-16">
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h1 className="heading-h1 text-white text-center mb-4">{t.menu.pageTitle}</h1>
          <div className="gold-line-h mb-16" />
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categoryKeys.map((key, i) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-2.5 font-raleway text-xs uppercase tracking-[0.2em] border transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'border-gold/20 text-stone hover:border-gold/40 hover:text-white'
                }`}
              >
                {t.menu.tabs[i]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Items */}
        <div className="max-w-3xl mx-auto space-y-8">
          {items.map((item, i) => (
            <ScrollReveal key={item.id} delay={100 + i * 80}>
              <div className="group border-b border-gold/10 pb-6 hover:border-gold/30 transition-colors duration-300">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-cormorant text-2xl text-white font-light">
                        {item.name[locale as Locale]}
                      </h3>
                      {item.flagship && (
                        <span className="text-[8px] uppercase tracking-[0.3em] text-gold border border-gold/30 px-2 py-0.5">
                          ★
                        </span>
                      )}
                    </div>
                    <p className="text-stone text-sm mt-2 leading-relaxed">
                      {item.description[locale as Locale]}
                    </p>
                  </div>
                  <span className="font-bodoni text-xl text-gold flex-shrink-0">
                    {item.price} ₽
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
