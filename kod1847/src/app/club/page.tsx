'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import ScrollReveal from '@/components/ui/ScrollReveal';

type MemberLevel = 'visit' | 'member' | 'resident';

export default function ClubPage() {
  const { t } = useLocale();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    source: '',
    message: '',
    level: '' as MemberLevel | '',
  });
  const [submitted, setSubmitted] = useState(false);

  const levels: { key: MemberLevel; data: typeof t.club.levels.visit & { featured?: boolean } }[] = [
    { key: 'visit', data: t.club.levels.visit },
    { key: 'member', data: t.club.levels.member },
    { key: 'resident', data: t.club.levels.resident },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/forms/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', source: '', message: '', level: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {}
  };

  return (
    <div className="min-h-screen section-dark pt-24 pb-16">
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <p className="label-caption text-gold text-center mb-4">{t.club.subtitle}</p>
          <h1 className="heading-h1 text-white text-center mb-4">{t.club.title}</h1>
          <div className="gold-line-h mb-20" />
        </ScrollReveal>

        {/* Membership levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {levels.map((level, i) => {
            const isFeatured = level.key === 'member';
            return (
              <ScrollReveal key={level.key} delay={i * 150}>
                <div
                  className={`relative p-8 lg:p-10 border transition-all duration-300 h-full flex flex-col ${
                    isFeatured
                      ? 'border-gold bg-gold/5 scale-[1.02]'
                      : 'border-gold/15 hover:border-gold/40'
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute -top-px left-0 right-0 h-px bg-gold" />
                  )}
                  <h3 className="font-cormorant text-2xl text-white font-light mb-4">
                    {level.data.name}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed mb-8 flex-1">
                    {level.data.description}
                  </p>
                  <div className="mt-auto">
                    <span className="font-bodoni text-2xl text-gold">{level.data.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      setForm({ ...form, level: level.key });
                      document.getElementById('membership-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`mt-6 ${isFeatured ? 'btn-gold-filled' : 'btn-gold'} text-center w-full`}
                  >
                    {t.club.form.submit}
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Membership form */}
        <div id="membership-form" className="max-w-xl mx-auto">
          <ScrollReveal>
            <h2 className="heading-h2 text-white text-center mb-4">{t.club.form.title}</h2>
            <div className="gold-line-h mb-12" />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder={t.club.form.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="input-field-dark"
                />
                <input
                  type="tel"
                  placeholder={t.club.form.phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="input-field-dark"
                />
              </div>
              <input
                type="email"
                placeholder={t.club.form.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="input-field-dark"
              />
              <input
                type="text"
                placeholder={t.club.form.source}
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="input-field-dark"
              />
              <textarea
                placeholder={t.club.form.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="input-field-dark resize-none"
              />
              <div className="text-center pt-4">
                <button type="submit" className="btn-gold-filled">
                  {t.club.form.submit}
                </button>
                {submitted && (
                  <p className="text-gold text-sm mt-4">{t.club.form.success}</p>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
