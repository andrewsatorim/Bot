'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Contacts() {
  const { t } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {}
  };

  return (
    <section id="contacts" className="min-h-screen flex items-center section-dark py-24">
      <div className="max-w-site mx-auto px-6 lg:px-8 w-full">
        <ScrollReveal>
          <h2 className="heading-h2 text-white text-center mb-16">{t.contacts.title}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Map placeholder */}
          <ScrollReveal>
            <div className="aspect-square lg:aspect-[4/3] bg-[#12110f] rounded-sm overflow-hidden border border-gold/10 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="font-bodoni text-gold/40 text-3xl mb-4">MAP</p>
                <p className="text-stone/50 text-xs">
                  Яндекс.Карта — подключить API
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Info + Form */}
          <div>
            <ScrollReveal delay={100}>
              <div className="mb-12 space-y-4">
                <p className="text-white text-sm">{t.contacts.address}</p>
                <p className="text-stone text-sm">{t.contacts.phone}</p>
                <p className="text-stone text-sm">{t.contacts.email}</p>

                <div className="flex gap-4 pt-4">
                  <a
                    href="https://t.me/kod1847"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-[10px] py-2 px-5"
                  >
                    Telegram
                  </a>
                  <a
                    href="https://instagram.com/kod1847"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-[10px] py-2 px-5"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h3 className="font-cormorant text-2xl text-white mb-8">{t.contacts.form.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  placeholder={t.contacts.form.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="input-field-dark"
                />
                <input
                  type="email"
                  placeholder={t.contacts.form.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="input-field-dark"
                />
                <textarea
                  placeholder={t.contacts.form.message}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="input-field-dark resize-none"
                />
                <button type="submit" className="btn-gold-filled">
                  {t.contacts.form.submit}
                </button>
                {submitted && (
                  <p className="text-gold text-sm animate-fade-up">{t.contacts.form.success}</p>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
