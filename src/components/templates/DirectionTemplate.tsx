import type { Metadata } from 'next';
import type { DirectionPage } from '@/content/direction-pages/types';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageLead } from '@/components/blocks/PageLead';
import { SectionList } from '@/components/blocks/Catalog';
import { Works } from '@/components/blocks/Works';
import { HowWeWork } from '@/components/blocks/HowWeWork';
import { About } from '@/components/blocks/About';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { Directions } from '@/components/blocks/Directions';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata } from './metadata';

export const directionMetadata = (page: DirectionPage): Metadata => pageMetadata(page.meta);

/**
 * Направление: разделы строками, работы (если набираются), шаги, текст
 * о направлении, довод и форма, а в конце — остальные направления.
 * «О …» здесь до формы: за формой встык идут плитки направлений.
 */
export function DirectionTemplate({ page }: { page: DirectionPage }) {
  return (
    <>
      {/* JSON-LD вне <main>: внутри он сбивал правила :first-child/:last-child
          (шапка съезжала на пиксель, низ страницы терял отступ). */}
      {page.jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <main className="ls-card ls-no-hero" id="main" data-dir={page.slug}>
        <SiteHeader noHero />

        <PageLead back={page.back} title={page.title} desc={page.desc} />
        <SectionList items={page.sections} />
        {page.works && <Works set={page.works} />}
        <HowWeWork />
        {page.about && <About {...page.about} />}
        <Proof />
        <LeadForm />
        <Directions title="Другие направления" exclude={page.slug} more />
      </main>
    </>
  );
}
