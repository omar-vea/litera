'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Catalog, ProdProject } from '@/lib/prod';
import { BASE, withBase } from '@/lib/base';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { DirectionTemplate } from '@/components/templates/DirectionTemplate';
import { SectionTemplate } from '@/components/templates/SectionTemplate';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';
import { CaseTemplate } from '@/components/templates/CaseTemplate';
import { build, buildCase, type Page } from './build';
import './ProdPage.css';

const load = <T,>(name: string): Promise<T> => fetch(withBase(`/prod/${name}.json`)).then((r) => r.json());

/**
 * Страница прода в шаблоне прототипа. Живёт в 404: GitHub Pages отдаёт её
 * на любой адрес, которого нет в сборке, а она по адресу находит в снимке
 * направление, раздел, услугу или работу (`/projects/<id>`). Не нашла —
 * показывает обычную 404 (`fallback`).
 */
export function ProdPage({ fallback }: { fallback: ReactNode }) {
  const [page, setPage] = useState<Page | null | undefined>(undefined);

  useEffect(() => {
    const path = decodeURI(location.pathname.slice(BASE.length)).replace(/^\/|\/$/g, '');
    const work = path.match(/^projects\/(\d+)$/);
    if (!path || (path.includes('/') && !work)) return setPage(null);
    Promise.all([load<Catalog>('catalog'), load<ProdProject[]>('projects')])
      .then(([cat, projects]) => {
        const p = work ? buildCase(Number(work[1]), cat, projects) : build(path, cat, projects);
        setPage(p);
      })
      .catch(() => setPage(null));
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
  return <CaseTemplate data={page.data} />;
}
