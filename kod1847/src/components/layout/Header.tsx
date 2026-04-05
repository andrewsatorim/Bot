'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/lib/locale-context';
import type { Locale } from '@/lib/i18n';

export default function Header() {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { label: t.nav.teaHall, href: '#zones' },
    { label: t.nav.library, href: '#gallery' },
    { label: t.nav.wardrobe, href: '#contacts' },
  ];

  const toggleLocale = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-site mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-white">
            <span className="font-bodoni text-lg tracking-wider">К·18/47</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-raleway text-xs uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleLocale}
              className="font-raleway text-xs uppercase tracking-[0.2em] text-white/50 hover:text-gold transition-colors duration-300"
            >
              <span className={locale === 'ru' ? 'text-white' : ''}>RU</span>
              <span className="mx-1 text-gold/30">|</span>
              <span className={locale === 'en' ? 'text-white' : ''}>EN</span>
            </button>
            <a href="#booking" className="btn-gold text-[10px] py-2 px-6">
              {t.nav.reserve}
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-cormorant text-3xl text-white hover:text-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="gold-line-h my-2" />
          <button
            onClick={toggleLocale}
            className="font-raleway text-sm uppercase tracking-[0.3em] text-stone hover:text-gold transition-colors"
          >
            <span className={locale === 'ru' ? 'text-white' : ''}>RU</span>
            <span className="mx-2 text-gold/30">|</span>
            <span className={locale === 'en' ? 'text-white' : ''}>EN</span>
          </button>
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="btn-gold mt-4"
          >
            {t.nav.reserve}
          </a>
        </nav>
      </div>
    </>
  );
}
