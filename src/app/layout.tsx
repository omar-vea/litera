import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site } from '@/content/site';
import { Footer } from '@/components/layout/Footer';
import { CookieNotice } from '@/components/layout/CookieNotice';
import { ChatWidget } from '@/components/layout/ChatWidget';
import { CursorLabel } from '@/components/layout/CursorLabel';
import { CopyContact } from '@/components/layout/CopyContact';
import '@/styles/site.css';

// Inter двумя файлами с диапазонами символов, как в прототипе: кириллица
// и латиница отдельно. Подгоночный запасной шрифт next/font отключён — иначе
// знаки, которых нет в Inter (стрелка «→»), рисовались бы Arial, а не системным.
// Значения — литералами: next/font читает их при сборке и переменных не понимает.
const interCyrillic = localFont({
  src: './fonts/inter-cyrillic.woff2',
  weight: '100 900',
  variable: '--font-inter-cyrillic',
  display: 'swap',
  adjustFontFallback: false,
  fallback: [],
  declarations: [{ prop: 'unicode-range', value: 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116' }],
});

const interLatin = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '100 900',
  variable: '--font-inter-latin',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Inter', 'system-ui', 'sans-serif'],
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
    },
  ],
});

const raptor = localFont({
  src: './fonts/raptor-v2-premium-700.woff2',
  weight: '700',
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — дизайн и печать в Москве`, template: `%s — ${site.name}` },
  openGraph: { type: 'website', siteName: site.name, locale: 'ru_RU' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Переключается в useStickyBar: тёмный на кадре, белый — когда шапка белая.
  themeColor: '#111112',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${interCyrillic.variable} ${interLatin.variable} ${raptor.variable}`}>
      <body>
        <a className="ls-skip" href="#main">
          К содержанию
        </a>
        {children}
        <Footer />
        <CookieNotice />
        <ChatWidget />
        <CursorLabel />
        <CopyContact />
      </body>
    </html>
  );
}
