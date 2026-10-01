/**
 * Статический экспорт: `next/image` с `unoptimized` не подставляет basePath
 * к локальным путям сам. Этот loader — только для сборки на GitHub Pages.
 */
export default function imageLoader({ src }: { src: string }) {
  if (src.startsWith('http')) return src;
  return `/litera${src}`;
}
