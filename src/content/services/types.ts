import type { ReactNode } from 'react';
import type { QA } from '@/components/blocks/Faq';
import type { RelatedItem } from '@/components/blocks/Related';
import type { WorksSet } from '@/content/works';

/**
 * Карточка услуги. Порядок блоков задаёт шаблон (`ServiceTemplate`),
 * здесь — только содержимое. Необязательный блок без данных не выводится.
 * В Payload — коллекция `services`; богатый текст станет полями lexical.
 */

export type Img = { src: string; w: number; h: number; alt: string };

export type SpecRow = { title: ReactNode; text: ReactNode; img?: Img };
export type SpecGroup = { title: string; rows: SpecRow[]; more?: { label: string; rows: SpecRow[] } };

import type { Step } from '@/components/blocks/HowWeWork';

export type ServiceStep = Step;

export type ServiceData = {
  slug: string;
  /** Направление: красит акценты страницы (`data-dir`). */
  dir: 'poligrafiya' | 'upakovka' | 'logotip' | 'brending';
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: string;
  };
  jsonLd: Record<string, unknown>[];
  back: { href: string; label: string };
  title: ReactNode;
  desc: ReactNode;
  /** Фото первого экрана; не загружено — обложка из карточки. */
  hero: Img;
  /** «Ваши лучшие …»: что добавляется сверх обычного тиража. */
  can?: { title: ReactNode; items: { img?: Img; title: ReactNode; text: ReactNode }[] };
  works?: WorksSet;
  /** «Зачем … бизнесу» / «От чего зависит цена». */
  value?: {
    title: ReactNode;
    items: { title: ReactNode; text: ReactNode }[];
    link?: { href: string; label: string };
  };
  beforeAfter?: {
    title: string;
    before: Img;
    after: Img;
    text: ReactNode;
    cta: { title: string; text: ReactNode; button: string };
  };
  specs?: { title: string; cols: SpecGroup[][] };
  /** Шаги со сроками под продукт; без них — общие шаги. */
  how?: { steps: ServiceStep[]; total: ReactNode };
  faq?: { title: string; items: QA[] };
  about?: { title: string; lead: ReactNode; more?: ReactNode };
  related?: { title: string; all: { href: string; label: string }; items: RelatedItem[] };
};
