import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { Directions } from '@/components/blocks/Directions';
import { LeadForm } from '@/components/blocks/LeadForm';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false },
};

/**
 * 404. Сюда попадают по старым ссылкам: при переезде часть редиректов
 * неизбежно теряется. Вместо тупика — четыре направления и форма:
 * человек пришёл за услугой, а не за этой страницей.
 */
export default function NotFound() {
  return (
    <main className="ls-card" id="main">
      <SiteHeader noHero />
      <div className="ls-body">
        <BackLink href="/" label="Главная" />
        <h1 className="ls-title">Такой страницы нет</h1>
        <p className="ls-desc">
          Возможно, она переехала. Всё, что мы делаем, — ниже, а если не найдёте своё, напишите: подскажем.
        </p>
      </div>
      <div className="ls-rest">
        <i className="ls-rest-sentinel" aria-hidden="true" />
        <i className="ls-chat-sentinel" aria-hidden="true" />
        <Directions afterText />
        <LeadForm />
      </div>
    </main>
  );
}
