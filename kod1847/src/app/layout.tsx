import type { Metadata } from 'next';
import '@/styles/globals.css';
import { LocaleProvider } from '@/lib/locale-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';

export const metadata: Metadata = {
  title: 'Код 1847 — Частный чайный клуб · Арбат',
  description: 'Частный чайный клуб на Арбате. Пространство доверия и смысла.',
  openGraph: {
    title: 'Код 1847 — Частный чайный клуб',
    description: 'Частный чайный клуб на Арбате. Пространство доверия и смысла.',
    locale: 'ru_RU',
    alternateLocale: 'en_US',
    type: 'website',
    siteName: 'Код 1847',
  },
  alternates: {
    languages: {
      ru: 'https://kod1847.ru',
      en: 'https://kod1847.ru?lang=en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="font-raleway antialiased">
        <LocaleProvider>
          <Preloader />
          <Header />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
