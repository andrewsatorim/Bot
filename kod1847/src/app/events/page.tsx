'use client';

import { useState, useMemo } from 'react';
import { useLocale } from '@/lib/locale-context';
import { eventsData } from '@/lib/demo-data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Locale } from '@/lib/i18n';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday first
}

export default function EventsPage() {
  const { locale, t } = useLocale();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const now = new Date();
  const months = [
    { year: now.getFullYear(), month: now.getMonth() },
    { year: now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear(), month: (now.getMonth() + 1) % 12 },
  ];

  const eventDates = useMemo(
    () => new Set(eventsData.map((e) => e.date)),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    try {
      await fetch('/api/forms/event-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, event_id: selectedEvent }),
      });
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {}
  };

  return (
    <div className="min-h-screen section-dark pt-24 pb-16">
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h1 className="heading-h1 text-white text-center mb-4">{t.events.pageTitle}</h1>
          <div className="gold-line-h mb-16" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Events list */}
          <div className="lg:col-span-2 space-y-6">
            {eventsData.map((event, i) => {
              const d = new Date(event.date);
              const day = d.getDate().toString();
              const month = d.toLocaleDateString(locale === 'ru' ? 'ru' : 'en', { month: 'long' });
              const zoneName = event.zone === 'tea_hall'
                ? (locale === 'ru' ? 'Чайный зал' : 'Tea Hall')
                : (locale === 'ru' ? 'Лаунж' : 'Lounge');

              return (
                <ScrollReveal key={event.id} delay={i * 100}>
                  <div
                    className={`border p-6 lg:p-8 transition-all duration-300 cursor-pointer ${
                      selectedEvent === event.id
                        ? 'border-gold bg-gold/5'
                        : 'border-gold/10 hover:border-gold/30'
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 text-center">
                        <span className="font-bodoni text-4xl text-gold block leading-none">{day}</span>
                        <span className="text-stone text-xs capitalize">{month}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-cormorant text-2xl text-white font-light mb-2">
                          {event.title[locale as Locale]}
                        </h3>
                        <p className="text-stone text-sm mb-3 leading-relaxed">
                          {event.description[locale as Locale]}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-stone/60">
                          <span>{event.time}</span>
                          <span>·</span>
                          <span>{zoneName}</span>
                          <span>·</span>
                          <span>{event.registered}/{event.capacity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Sidebar: calendar + form */}
          <div className="space-y-8">
            {/* Mini calendars */}
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                {months.map(({ year, month }) => {
                  const daysInMonth = getDaysInMonth(year, month);
                  const firstDay = getFirstDayOfWeek(year, month);
                  const monthName = new Date(year, month).toLocaleDateString(
                    locale === 'ru' ? 'ru' : 'en',
                    { month: 'long', year: 'numeric' }
                  );

                  return (
                    <div key={`${year}-${month}`} className="border border-gold/10 p-6">
                      <p className="font-cormorant text-lg text-white text-center mb-4 capitalize">
                        {monthName}
                      </p>
                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
                          <span key={d} className="text-stone/40 py-1">{d}</span>
                        ))}
                        {Array.from({ length: firstDay }).map((_, i) => (
                          <span key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                          const hasEvent = eventDates.has(dateStr);
                          return (
                            <span
                              key={day}
                              className={`py-1 rounded-full text-xs ${
                                hasEvent
                                  ? 'bg-gold text-ink font-medium'
                                  : 'text-stone/60'
                              }`}
                            >
                              {day}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Registration form */}
            <ScrollReveal delay={300}>
              <div className="border border-gold/10 p-6">
                <h3 className="font-cormorant text-xl text-white mb-6">{t.events.form.title}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder={t.events.form.name}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="input-field-dark"
                  />
                  <input
                    type="tel"
                    placeholder={t.events.form.phone}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="input-field-dark"
                  />
                  <input
                    type="email"
                    placeholder={t.events.form.email}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field-dark"
                  />
                  <select
                    value={selectedEvent ?? ''}
                    onChange={(e) => setSelectedEvent(Number(e.target.value) || null)}
                    className="input-field-dark bg-ink"
                  >
                    <option value="">{t.events.form.event}</option>
                    {eventsData.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.title[locale as Locale]}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn-gold-filled w-full mt-2" disabled={!selectedEvent}>
                    {t.events.form.submit}
                  </button>
                  {submitted && (
                    <p className="text-gold text-sm text-center">{t.events.form.success}</p>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
