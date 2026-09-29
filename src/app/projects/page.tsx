import type { Metadata } from 'next';
import { Suspense } from 'react';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { ProjectsGrid } from '@/components/blocks/ProjectsGrid';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Работы',
  description:
    'Работы студии: полиграфия, упаковка, логотипы и фирменный стиль, корпоративный брендинг. Фото настоящих тиражей.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `Работы — ${site.name}`,
    description: 'Работы студии: полиграфия, упаковка, логотипы и фирменный стиль, корпоративный брендинг.',
    url: '/projects',
    images: ['/img/works/gift-1.jpg'],
  },
};

export default function ProjectsPage() {
  return (
    <main className="ls-card" id="main">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Работы', item: `${site.url}/projects` },
          ],
        }}
      />
      <SiteHeader noHero />
      <div className="ls-body">
        <BackLink href="/" label="Главная" />
        <h1 className="ls-title">Работы</h1>
        <p className="ls-desc">
          Что нарисовали и напечатали за тринадцать лет&nbsp;— от визитки до кашированной коробки.
        </p>
      </div>
      {/* Метка виджета связи: кадра здесь нет, поэтому своя, не общая с шапкой. */}
      <i className="ls-chat-sentinel" aria-hidden="true" />
      <div className="ls-rest">
        <i className="ls-rest-sentinel" aria-hidden="true" />
        {/* Фильтр читает адрес — без Suspense страница не собралась бы статически. */}
        <Suspense>
          <ProjectsGrid />
        </Suspense>
        <Proof />
        <LeadForm />
      </div>
    </main>
  );
}
