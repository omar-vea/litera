/**
 * Префикс basePath для путей, которые Next сам не переписывает:
 * `<use href>`, `fetch`, `<img>` и `<a>` без `next/link`.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const withBase = (path: string) => (path.startsWith('/') ? BASE + path : path);
