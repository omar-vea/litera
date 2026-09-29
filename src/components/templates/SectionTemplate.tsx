import type { Metadata } from 'next';
import type { SectionPage } from '@/content/sections/types';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageLead } from '@/components/blocks/PageLead';
import { Catalog } from '@/components/blocks/Catalog';
import { Faq } from '@/components/blocks/Faq';
import { Works } from '@/components/blocks/Works';
import { HowWeWork } from '@/components/blocks/HowWeWork';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { About } from '@/components/blocks/About';
import { Related } from '@/components/blocks/Related';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata } from './metadata';

export const sectionMetadata = (page: SectionPage): Metadata => pageMetadata(page.meta);

/**
 * Раздел каталога: первый экран без кадра, услуги плитками по группам,
 * «Что выбрать под задачу», работы, шаги, довод и форма, текст о разделе
 * и соседние разделы. «О …» стоит после формы: это текст для поиска.
 */
export function SectionTemplate({ page }: { page: SectionPage }) {
  return (
    <>
      {/* JSON-LD вне <main>: внутри он сбивал правила :first-child/:last-child
          (шапка съезжала на пиксель, низ страницы терял отступ). */}
      {page.jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <main className="ls-card ls-no-hero" id="main" data-dir={page.dir}>
        <SiteHeader noHero />

        <PageLead back={page.back} title={page.title} desc={page.desc} solo />
        <p className="ls-cat-hint">
          <a href="#vybor">{page.choose.title}</a>
        </p>
        <i className="ls-chat-sentinel" aria-hidden="true" />

        <Catalog columns={page.catalog} />
        <Faq title={page.choose.title} items={page.choose.items} variant="choose" id="vybor" />
        <Works set={page.works} />
        <HowWeWork />
        <Proof />
        <LeadForm />
        <About {...page.about} />
        <Related {...page.related} />
      </main>
    </>
  );
}
