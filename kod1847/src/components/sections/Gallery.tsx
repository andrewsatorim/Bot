'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { galleryData } from '@/lib/demo-data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n';

const placeholderColors = [
  'from-[#2a2520] to-[#1a1510]',
  'from-[#1a1815] to-[#0f0d0a]',
  'from-[#25201a] to-[#15120e]',
  'from-[#201c18] to-[#121010]',
  'from-[#1f1a15] to-[#0d0b09]',
  'from-[#2a2218] to-[#181410]',
  'from-[#221e1a] to-[#100e0c]',
  'from-[#1c1814] to-[#0e0c0a]',
  'from-[#261f18] to-[#141210]',
  'from-[#201a15] to-[#0c0a08]',
];

export default function Gallery() {
  const { locale, t } = useLocale();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="min-h-screen section-light py-24">
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="heading-h2 text-ink text-center mb-16">{t.gallery.title}</h2>
        </ScrollReveal>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryData.map((item, i) => (
            <ScrollReveal
              key={item.id}
              delay={i * 80}
              className={i === 0 ? 'md:row-span-2 md:col-span-1' : ''}
            >
              <button
                onClick={() => setLightbox(i)}
                className={`w-full h-full bg-gradient-to-br ${placeholderColors[i]} rounded-sm overflow-hidden
                           transition-all duration-300 hover:opacity-90 cursor-pointer
                           flex items-center justify-center group ${
                             i === 0 ? 'min-h-[416px]' : 'min-h-[200px]'
                           }`}
              >
                <span className="font-bodoni text-2xl text-gold/20 group-hover:text-gold/40 transition-colors duration-300">
                  {item.id}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="max-w-4xl w-full aspect-[4/3] bg-gradient-to-br from-[#2a2520] to-[#1a1510] rounded flex items-center justify-center">
            <div className="text-center">
              <span className="font-bodoni text-6xl text-gold/30">{galleryData[lightbox].id}</span>
              <p className="text-stone mt-4 text-sm">
                {galleryData[lightbox].alt[locale as Locale]}
              </p>
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold text-3xl transition-colors"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(galleryData.length - 1, lightbox + 1)); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold text-3xl transition-colors"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}
