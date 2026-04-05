'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Zones() {
  const { t } = useLocale();
  const [hovered, setHovered] = useState<'left' | 'right' | null>(null);

  const zones = [
    {
      key: 'left' as const,
      ...t.zones.teaHall,
      gradient: 'from-[#1a1510] to-ink',
    },
    {
      key: 'right' as const,
      ...t.zones.lounge,
      gradient: 'from-ink to-[#1a1510]',
    },
  ];

  return (
    <section id="zones" className="h-screen section-dark relative overflow-hidden snap-start">
      {/* Label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <ScrollReveal>
          <p className="label-caption text-gold">{t.zones.label}</p>
        </ScrollReveal>
      </div>

      <div className="flex h-full flex-col lg:flex-row">
        {zones.map((zone, i) => (
          <div
            key={zone.key}
            className={`relative flex-1 flex flex-col justify-end p-8 lg:p-12 transition-all duration-[800ms] ease-smooth cursor-pointer bg-gradient-to-b ${zone.gradient}`}
            style={{
              flex: hovered === zone.key ? 1.3 : hovered && hovered !== zone.key ? 0.7 : 1,
            }}
            onMouseEnter={() => setHovered(zone.key)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Image placeholder area */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="font-bodoni text-8xl text-gold">{i + 1}</span>
            </div>

            {/* Radial glow */}
            <div className="absolute inset-0 radial-glow pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <ScrollReveal delay={i * 200}>
                <p className="font-bodoni text-xs tracking-[0.4em] text-gold/60 mb-2">
                  {zone.label}
                </p>
                <h3 className="font-cormorant text-3xl lg:text-4xl text-white font-light mb-3">
                  {zone.name}
                </h3>
                <p className="text-stone text-sm leading-relaxed mb-4 max-w-sm">
                  {zone.description}
                </p>
                <p className="text-stone/50 text-xs mb-6">
                  {zone.capacity}
                </p>
                <a href="#booking" className="btn-gold text-[10px]">
                  {zone.cta}
                </a>
              </ScrollReveal>
            </div>
          </div>
        ))}

        {/* Gold vertical divider */}
        <div className="hidden lg:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-gold/20 z-10" />
      </div>
    </section>
  );
}
