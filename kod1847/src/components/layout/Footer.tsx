'use client';

import { useLocale } from '@/lib/locale-context';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-ink border-t border-gold/10 py-12">
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-bodoni text-lg text-white tracking-wider">К·18/47</span>
          </div>

          <div className="flex items-center gap-6 text-stone text-xs">
            <a
              href="https://t.me/kod1847"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
            >
              Telegram
            </a>
            <a
              href="https://instagram.com/kod1847"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="/privacy"
              className="hover:text-gold transition-colors duration-300"
            >
              {t.footer.privacy}
            </a>
          </div>

          <p className="text-stone/60 text-xs">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
