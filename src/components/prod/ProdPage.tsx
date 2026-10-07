'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Catalog, ProdProject, Texts } from '@/lib/prod';
import { BASE, withBase } from '@/lib/base';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { DirectionTemplate } from '@/components/templates/DirectionTemplate';
import { SectionTemplate } from '@/components/templates/SectionTemplate';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';
import { CaseTemplate } from '@/components/templates/CaseTemplate';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';
import { TextTemplate } from '@/components/templates/TextTemplate';
import { build, buildCase, type Page } from './build';
import { buildText, type TextPage } from './texts';
import './ProdPage.css';

const load = <T,>(name: string): Promise<T> => fetch(withBase(`/prod/${name}.json`)).then((r) => r.json());

/**
 * Страница прода в шаблоне прототипа. Живёт в 404: GitHub Pages отдаёт её
 * на любой адрес, которого нет в сборке, а она по адресу находит в снимке
 * направление, раздел, услугу, работу (`/projects/<id>`), статью (`/blog/<slug>`),
 * кейс (`/case/<slug>`, список — `/cases`) или документ. Не нашла —
 * показывает обычную 404 (`fallback`).
 */
export function ProdPage({ fallback }: { fallback: ReactNode }) {
  const [page, setPage] = useState<Page | TextPage | null | undefined>(undefined);

  useEffect(() => {
    const path = decodeURI(location.pathname.slice(BASE.length)).replace(/^\/|\/$/g, '');
    const work = path.match(/^projects\/(\d+)$/);
    const text = /^(blog|case)\/[^/]+$/.test(path);
    if (!path || (path.includes('/') && !work && !text)) return setPage(null);
    const fromTexts = () => load<Texts>('texts').then((t) => buildText(path, t));
    if (text) {
      fromTexts().then(setPage, () => setPage(null));
      return;
    }
    Promise.all([load<Catalog>('catalog'), load<ProdProject[]>('projects')])
      .then(([cat, projects]): Page | TextPage | null | Promise<TextPage | null> => {
        const p = work ? buildCase(Number(work[1]), cat, projects) : build(path, cat, projects);
        // не каталог — может быть документ или список кейсов
        return p ?? (work ? null : fromTexts());
      })
      .then(setPage, () => setPage(null));
  }, []);

  // Заголовок 404 из метаданных Next ставится в разное время, иногда позже
  // нас, — поэтому следим за <head> и возвращаем свой.
  useEffect(() => {
    if (!page) return;
    const set = () => {
      if (document.title !== page.title) document.title = page.title;
    };
    set();
    const watch = new MutationObserver(set);
    watch.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => watch.disconnect();
  }, [page]);

  if (page === undefined) {
    return (
      <main className="ls-card ls-no-hero" id="main">
        <SiteHeader noHero />
        <p className="ls-prod-loading" role="status">
          Загружаем страницу…
        </p>
      </main>
    );
  }
  if (page === null) return <>{fallback}</>;
  if (page.kind === 'direction') return <DirectionTemplate page={page.page} />;
  if (page.kind === 'section') return <SectionTemplate page={page.page} />;
  if (page.kind === 'service') return <ServiceTemplate data={page.data} />;
  if (page.kind === 'article') return <ArticleTemplate data={page.data} />;
  if (page.kind === 'text') return <TextTemplate data={page.data} />;
  return <CaseTemplate data={page.data} />;
}
