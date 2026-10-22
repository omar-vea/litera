import type { ReactNode } from 'react';
import type { WorksSet } from '@/content/works';
import type { Direction } from '@/content/directions';
import type { PageMeta, Tile } from '@/content/sections/types';
import type { Step } from '@/components/blocks/HowWeWork';

/** Страница направления (полиграфия, брендинг). В Payload — коллекция `directions`. */
export type DirectionPage = {
  slug: Direction['slug'];
  meta: PageMeta;
  jsonLd: Record<string, unknown>[];
  back: { href: string; label: string };
  title: string;
  desc: string;
  /** Разделы направления строками, с числом услуг. */
  sections: Tile[];
  /** Работы — если по тегам направления их набирается хотя бы три. */
  works?: WorksSet;
  /** Свои шаги «Как мы работаем»; нет — общие. */
  how?: { steps: Step[]; total: ReactNode };
  about?: { title: string; lead: ReactNode; more?: ReactNode };
};
