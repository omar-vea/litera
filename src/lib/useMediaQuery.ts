'use client';

import { useSyncExternalStore } from 'react';

/**
 * Совпадает ли медиазапрос. На сервере — `false`: разметка рендерится
 * под телефон, широкий экран досчитывается после гидрации.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Пороги из CSS. Разойдутся с медиазапросами в стилях — вёрстка и логика поссорятся. */
export const WIDE = '(min-width: 1024px)';
export const SEARCH_IN_BAR = '(min-width: 1080px)';
