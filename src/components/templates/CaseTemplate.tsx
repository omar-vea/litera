import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Direction } from '@/content/directions';
import type { WorksSet } from '@/content/works';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { Works } from '@/components/blocks/Works';
import { LeadForm } from '@/components/blocks/LeadForm';
import { typo } from '@/lib/typo';
import { PicGallery, GalleryPic } from '@/components/blocks/PicGallery';
import './CaseTemplate.css';

type Pic = { src: string; alt: string };

export type CaseData = {
  slug: string;
  dir: Direction['slug'];
  title: string;
  metaTitle: string;
  description: string;
  hero: Pic;
  facts: { label: string; value: ReactNode }[];
  task?: string;
  /** Кадр между текстами. Если второго текста нет — уходит в галерею после широкого кадра. */
  inline?: Pic & { caption: string };
  done?: string[];
  gallery: (Pic & { caption: string; wide?: boolean })[];
  service: { href: string; label: string };
  works: WorksSet;
};

/** Карточка работы: кадр, факты, задача, что сделали, галерея, выход в услугу и форма. */
export function CaseTemplate({ data }: { data: CaseData }) {
  const bothTexts = Boolean(data.task && data.done?.length);
  // Одинокий текст с крупной врезкой смотрелся бы обрывком: врезка идёт в галерею.
  const gallery = [...data.gallery];
  if (data.inline && !bothTexts) {
    const at = gallery.findIndex((g) => g.wide) + 1;
    gallery.splice(at, 0, data.inline);
  }
  // порядок листалки — порядок на странице: врезка стоит раньше галереи
  const ordered = data.inline && bothTexts ? [data.inline, ...gallery] : gallery;

  return (
    <main className="ls-card" id="main" data-dir={data.dir}>
      <SiteHeader />
      <figure className="ls-hero ls-case-hero">
        <Image src={data.hero.src} width={1200} height={800} alt={data.hero.alt} priority sizes="100vw" />
      </figure>

      <PicGallery pics={ordered}>
        <div className="ls-rest ls-case">
          <i className="ls-rest-sentinel" aria-hidden="true" />
          <i className="ls-body-sentinel ls-chat-sentinel" aria-hidden="true" />

          <section className="ls-case-head">
            <BackLink href="/projects" label="Работы" />
            <h1 className="ls-title">{data.title}</h1>
            <p className="ls-desc">{typo(data.description)}</p>
          </section>

          {data.facts.length > 0 && (
            <section className="ls-case-facts">
              <dl>
                {data.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {data.task && (
            <section className="ls-case-text">
              <h2>Задача</h2>
              <p>{typo(data.task)}</p>
            </section>
          )}

          {data.inline && bothTexts && (
            <figure className="ls-case-inline">
              <GalleryPic src={data.inline.src} alt={data.inline.alt} />
              <figcaption>{data.inline.caption}</figcaption>
            </figure>
          )}

          {data.done?.length ? (
            <section className="ls-case-text">
              <h2>Что сделали</h2>
              <ol className="ls-case-steps">
                {data.done.map((d) => (
                  <li key={d}>{typo(d)}</li>
                ))}
              </ol>
            </section>
          ) : null}

          {gallery.length > 0 && (
            <section className="ls-case-gallery">
              {gallery.map((g) => (
                <figure key={g.src} className={'wide' in g && g.wide ? 'is-wide' : undefined}>
                  <GalleryPic src={g.src} alt={g.alt} />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </section>
          )}

          <section className="ls-case-next">
            <h2>Напечатаем такой же</h2>
            <p>Или другой: тираж, бумагу и отделку подберём под повод и бюджет.</p>
            <div className="ls-case-next-cta">
              <a className="ls-btn ls-btn-main" href="#zayavka">
                Обсудить задачу
              </a>
              <Link className="ls-case-next-link" href={data.service.href}>
                {data.service.label}
              </Link>
            </div>
          </section>

          {data.works.works.length > 0 && <Works set={data.works} />}
          <LeadForm />
        </div>
      </PicGallery>
    </main>
  );
}
