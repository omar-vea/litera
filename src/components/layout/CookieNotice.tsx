'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import { withBase } from '@/lib/base';
import './CookieNotice.css';

const KEY = 'litera-cookie-ok';
const SHOW_DELAY = 900;
const HIDE_DURATION = 350;

type Phase = 'hidden' | 'mounted' | 'shown';

function wasAccepted(): boolean {
  try {
    return Boolean(localStorage.getItem(KEY));
  } catch {
    return true; // приватный режим: не надоедаем при каждом заходе
  }
}

/** Уведомление о куках: появляется с задержкой, пока его не закрыли. */
export function CookieNotice() {
  const [phase, setPhase] = useState<Phase>('hidden');

  useEffect(() => {
    if (wasAccepted()) return;
    setPhase('mounted');
    const timer = setTimeout(() => setPhase('shown'), SHOW_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    setPhase('mounted');
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* приватный режим */
    }
    setTimeout(() => setPhase('hidden'), HIDE_DURATION);
  };

  if (phase === 'hidden') return null;

  return (
    <div
      className={`ls-cookie${phase === 'shown' ? ' ls-is-shown' : ''}`}
      role="region"
      aria-label="О сборе данных"
    >
      <p>
        Собираем обезличенные данные о посещениях&nbsp;— по ним видно, что на сайте помогает, а что мешает.
        Подробности в{' '}
        {site.legal[2].href ? (
          <a href={withBase(site.legal[2].href)} target="_blank" rel="noopener">
            положении о файлах cookies
          </a>
        ) : (
          'положении о файлах cookies'
        )}
        .
      </p>
      <button className="ls-btn ls-btn-light ls-btn-s ls-cookie-ok" type="button" onClick={accept}>
        Хорошо
      </button>
    </div>
  );
}
