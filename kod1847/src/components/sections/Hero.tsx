'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/locale-context';

export default function Hero() {
  const { t } = useLocale();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center section-dark overflow-hidden">
      {/* Background placeholder with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#0a0a0c] to-ink">
        <div className="absolute inset-0 radial-glow-strong" />
      </div>

      {/* Steam particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/10"
            style={{
              left: `${15 + i * 14}%`,
              bottom: `${10 + i * 5}%`,
              animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Subtitle */}
        <p
          className={`label-caption text-gold mb-6 transition-all duration-[1100ms] ease-reveal ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.hero.subtitle}
        </p>

        {/* Title */}
        <h1
          className={`heading-h1 text-white mb-6 transition-all duration-[1100ms] ease-reveal delay-150 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.hero.title}{' '}
          <em className="italic">{t.hero.titleItalic}</em>
        </h1>

        {/* Gold divider */}
        <div
          className={`gold-line-h mb-8 transition-all duration-[1100ms] ease-reveal delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        />

        {/* CTA */}
        <div
          className={`transition-all duration-[1100ms] ease-reveal delay-[450ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a href="#booking" className="btn-gold">
            {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-[1100ms] ease-reveal delay-[600ms] ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="label-caption text-stone/50 text-[8px]">{t.hero.scroll}</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-80px) scale(1.5); opacity: 0.1; }
        }
      `}</style>
    </section>
  );
}
