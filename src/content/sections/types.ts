import type { ReactNode } from 'react';
import type { WorksSet } from '@/content/works';
import type { QA } from '@/components/blocks/Faq';
import type { RelatedItem } from '@/components/blocks/Related';

/** Плитка или строка каталога: услуга в разделе или раздел в направлении. */
export type Tile = {
  title: string;
  note: string;
  href: string;
  /** Число услуг — только у разделов в списке направления. */
  count?: string;
  /** Нет кадра — серая заглушка того же размера. */
  img?: { src: string; w: number; h: number; alt: string };
  /** Первые плитки первого экрана грузятся сразу, остальные — по прокрутке. */
  eager?: boolean;
};

export type CatalogGroup = { title: string; items: Tile[] };

/** Мета страницы из прототипа: заголовок, описание, адрес, превью для соцсетей. */
export type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

/** Раздел каталога (листовая полиграфия, игры, меню и прайсы, наборы). В Payload — коллекция `sections`. */
export type SectionPage = {
  slug: string;
  dir: 'poligrafiya' | 'upakovka' | 'logotip' | 'brending';
  meta: PageMeta;
  jsonLd: Record<string, unknown>[];
  back: { href: string; label: string };
  title: string;
  desc: string;
  /** Колонки групп: раскладку на десктопе держит CSS по числу услуг в группе. */
  catalog: CatalogGroup[][];
  choose?: { title: string; items: QA[] };
  works?: WorksSet;
  about?: { title: string; lead: ReactNode; more?: ReactNode };
  related?: { title: string; all: { href: string; label: string }; items: RelatedItem[] };
};
