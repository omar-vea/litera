import type { Metadata } from 'next';
import type { PageMeta } from '@/content/sections/types';

/** Мета страницы из данных: заголовок целиком (без шаблона layout), canonical, превью. */
export function pageMetadata(meta: PageMeta): Metadata {
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: meta.canonical,
      images: [meta.ogImage],
    },
  };
}
