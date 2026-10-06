import Image from 'next/image';
import type { ServiceData } from '@/content/services/types';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { Messengers } from '@/components/blocks/Messengers';
import { Can } from '@/components/blocks/Can';
import { Works } from '@/components/blocks/Works';
import { Value } from '@/components/blocks/Value';
import { BeforeAfter } from '@/components/blocks/BeforeAfter';
import { Specs } from '@/components/blocks/Specs';
import { HowWeWork } from '@/components/blocks/HowWeWork';
import { Faq } from '@/components/blocks/Faq';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { About } from '@/components/blocks/About';
import { Related } from '@/components/blocks/Related';
import { JsonLd } from '@/components/ui/JsonLd';

/**
 * Карточка услуги. Первый экран — кадр, крошка, заголовок, кнопка; на десктопе
 * он прилипает, и страница наезжает на него слоем (`.ls-rest`). Дальше —
 * «Ваши лучшие», работы, доводы, материалы, шаги, вопросы, форма, текст
 * для поиска и соседние услуги. Блока без данных нет вовсе.
 */
export function ServiceTemplate({ data }: { data: ServiceData }) {
  const rest = (
    <>
      {data.can && <Can {...data.can} />}
      {data.works && <Works set={data.works} />}
      {data.value && <Value {...data.value} />}
      {data.beforeAfter && <BeforeAfter {...data.beforeAfter} />}
      {data.specs && <Specs {...data.specs} />}
      <HowWeWork steps={data.how?.steps} total={data.how?.total} />
      {data.faq && <Faq title={data.faq.title} items={data.faq.items} />}
      <Proof />
      <LeadForm />
      {data.about && <About {...data.about} />}
      {data.related && <Related {...data.related} />}
    </>
  );
  const jsonLd = data.jsonLd.map((ld, i) => <JsonLd key={i} data={ld} />);

  return (
    <>
      {/* JSON-LD вне <main>: внутри он сбивает правила :first-child/:last-child */}
      {jsonLd}
      <main className="ls-card" id="main" data-dir={data.dir}>
        <SiteHeader />

        <div className="ls-lead">
          <figure className="ls-hero">
            <Image
              src={data.hero.src}
              width={data.hero.w}
              height={data.hero.h}
              alt={data.hero.alt}
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </figure>
          <div className="ls-body">
            <i className="ls-body-sentinel ls-chat-sentinel" aria-hidden="true" />
            <BackLink href={data.back.href} label={data.back.label} />
            <h1 className="ls-title">{data.title}</h1>
            {data.desc && <p className="ls-desc">{data.desc}</p>}
          </div>
          <div className="ls-cta-group">
            <div className="ls-cta">
              <a className="ls-btn ls-btn-main" href="#zayavka">
                Обсудить задачу
              </a>
            </div>
            <Messengers />
          </div>
        </div>

        <div className="ls-rest">
          <i className="ls-rest-sentinel" aria-hidden="true" />
          {rest}
        </div>
      </main>
    </>
  );
}
