'use client';

import { useEffect } from 'react';

/**
 * Ссылка менеджера ведёт на раздел требований по якорю (`#cvet`).
 * Раздел свёрнут — сам браузер его не раскроет, поэтому открываем
 * и доводим до него: при загрузке и при переходе по оглавлению.
 */
export function RequirementsAnchor() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!(el instanceof HTMLDetailsElement)) return;
      el.open = true;
      el.scrollIntoView();
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);
  return null;
}
