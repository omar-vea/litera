/**
 * Статический экспорт: `next/image` с `unoptimized` не подставляет basePath
 * к локальным путям сам. Этот loader — только для сборки на GitHub Pages.
 */
import { withBase } from './base';

export default function imageLoader({ src }: { src: string }) {
  return withBase(src);
}
