'use client';

import { useLocale } from '@/lib/locale-context';
import { eventsData } from '@/lib/demo-data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return { day: d.getDate().toString(), month: d.toLocaleDateString('ru', { month: 'short' }).replace('.', '') };
}

export default function Events() {
  const { locale, t } = useLocale();
  const upcoming = eventsData.slice(0, 3);

  return (
    <section id="events" className="min-h-screen flex items-center section-dark py-24">
      <div className="max-w-site mx-auto px-6 lg:px-8 w-full">
        <ScrollReveal>
          <p className="label-caption text-gold text-center mb-4">{t.events.label}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="heading-h2 text-white text-center mb-16">{t.events.title}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {upcoming.map((event, i) => {
            const { day, month } = formatDate(event.date);
            const zoneName = event.zone === 'tea_hall'
              ? (locale === 'ru' ? 'Чайный зал' : 'Tea Hall')
              : (locale === 'ru' ? 'Лаунж' : 'Lounge');

            return (
              <ScrollReveal key={event.id} delay={200 + i * 150}>
                <div className="group border border-gold/10 p-8 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  {/* Date */}
                  <div className="mb-6">
                    <span className="font-bodoni text-5xl text-gold leading-none">{day}</span>
                    <span className="block font-raleway text-xs uppercase tracking-[0.2em] text-stone mt-1">
                      {month}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-cormorant text-2xl text-white font-light mb-3">
                    {event.title[locale as Locale]}
                  </h3>

                  {/* Meta */}
                  <p className="text-stone text-xs mb-6">
                    {event.time} · {zoneName}
                  </p>

                  {/* CTA */}
                  <a href="/events" className="btn-gold text-[10px]">
                    {t.events.signUp}
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
