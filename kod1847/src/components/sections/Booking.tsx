'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Booking() {
  const { t } = useLocale();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/forms/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: '', phone: '', date: '', time: '', guests: 2, comment: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {}
  };

  return (
    <section id="booking" className="min-h-screen flex items-center section-dark py-24 radial-glow">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 w-full">
        <ScrollReveal>
          <h2 className="heading-h2 text-white text-center mb-4">{t.booking.title}</h2>
          <div className="gold-line-h mb-12" />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={t.booking.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="input-field-dark"
              />
              <input
                type="tel"
                placeholder={t.booking.phone}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="input-field-dark"
              />
              <input
                type="date"
                placeholder={t.booking.date}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="input-field-dark"
              />
              <input
                type="time"
                placeholder={t.booking.time}
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                className="input-field-dark"
              />
            </div>

            <div>
              <label className="block text-stone text-xs mb-2">{t.booking.guests}</label>
              <input
                type="number"
                min={1}
                max={20}
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                className="input-field-dark w-24"
              />
            </div>

            <textarea
              placeholder={t.booking.comment}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={3}
              className="input-field-dark resize-none"
            />

            <div className="text-center pt-4">
              <button type="submit" className="btn-gold-filled">
                {t.booking.submit}
              </button>
              {submitted && (
                <p className="text-gold text-sm mt-4 animate-fade-up">{t.booking.success}</p>
              )}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
