'use client';

import { useLocale } from '@/lib/locale-context';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="min-h-screen flex items-center section-light py-24">
      <div className="max-w-site mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image placeholder */}
          <ScrollReveal>
            <div className="corner-frame">
              <div className="aspect-[3/4] bg-gradient-to-br from-linen to-gold-light rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-stone/30">
                  <span className="font-bodoni text-6xl">1847</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <div>
            <ScrollReveal delay={100}>
              <p className="label-caption text-stone mb-4">{t.about.label}</p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h2 className="heading-h2 text-ink mb-8">{t.about.title}</h2>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-stone leading-[2] mb-8 max-w-lg">{t.about.text}</p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-gold" />
                <span className="font-bodoni text-gold text-lg tracking-wider">
                  {t.about.since}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
