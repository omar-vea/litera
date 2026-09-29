'use client';

import { useEffect, useRef, useState } from 'react';
import './CopyContact.css';

/**
 * На широком экране телефон и почта не звонят и не пишут, а копируются:
 * на компьютере `tel:` и `mailto:` чаще открывают не то приложение.
 * Над ссылкой — подсказка «Скопировать» / «Скопировано». Адрес ведёт
 * на Яндекс.Карты — у него та же подсказка, но клик не перехватываем.
 *
 * Один компонент на сайт (подключается в layout), слушатели делегированы
 * на документ — ссылки из любой части страницы подхватываются без разметки.
 */

const LINKS = 'a[href^="tel:"],a[href^="mailto:"]';
const MAP = '.ls-addr a[href*="yandex"]';

type Tip = { on: boolean; text: string; done: boolean; left: number; top: number; below: boolean };

async function copy(text: string) {
  // Clipboard API есть везде на https и на localhost; других адресов у сайта нет.
  await navigator.clipboard.writeText(text);
}

export function CopyContact() {
  const [tip, setTip] = useState<Tip>({ on: false, text: '', done: false, left: 0, top: 0, below: false });
  const current = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    let timer = 0;

    const place = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      // У телефона в шапке над ним нет места — подсказка падает вниз.
      const below = r.top < 56;
      return {
        left: Math.round(r.left + r.width / 2),
        top: Math.round(below ? r.bottom + 8 : r.top - 8),
        below,
      };
    };
    const show = (el: HTMLAnchorElement, text: string, done = false) => {
      current.current = el;
      setTip({ on: true, text, done, ...place(el) });
    };
    // Текст и место оставляем: подсказка гаснет переходом, а не пропадает.
    const hide = () => {
      current.current = null;
      setTip((t) => ({ ...t, on: false }));
    };
    const linkOf = (e: Event) =>
      (e.target as Element | null)?.closest?.<HTMLAnchorElement>(`${LINKS},${MAP}`) ?? null;
    const label = (a: HTMLAnchorElement) => (a.matches(MAP) ? 'Открыть на Яндекс.Картах' : 'Скопировать');

    const offer = (e: Event) => {
      const a = linkOf(e);
      if (a && wide.matches && a !== current.current) show(a, label(a));
    };
    const leave = (e: Event) => {
      const a = linkOf(e);
      const to = (e as MouseEvent | FocusEvent).relatedTarget as Node | null;
      if (a && a === current.current && !(to && a.contains(to))) {
        window.clearTimeout(timer);
        hide();
      }
    };
    const click = (e: MouseEvent) => {
      const a = linkOf(e);
      if (!a || !wide.matches || a.matches(MAP)) return;
      e.preventDefault();
      // берём то, что видно: неразрывные пробелы сводим к обычным
      const text = (a.textContent ?? '').replace(/\s+/g, ' ').trim();
      copy(text).then(
        () => {
          window.clearTimeout(timer);
          show(a, 'Скопировано', true);
          timer = window.setTimeout(() => {
            if (current.current === a) show(a, 'Скопировать');
          }, 1600);
        },
        () => {
          window.location.href = a.href;
        },
      );
    };
    // подсказка привязана к месту на экране, а не к странице
    const follow = () => {
      const el = current.current;
      if (el) setTip((t) => ({ ...t, ...place(el) }));
    };
    const onWide = () => {
      if (!wide.matches) hide();
    };

    document.addEventListener('mouseover', offer);
    document.addEventListener('focusin', offer);
    document.addEventListener('mouseout', leave);
    document.addEventListener('focusout', leave);
    document.addEventListener('click', click);
    window.addEventListener('scroll', follow, { passive: true });
    window.addEventListener('resize', follow);
    wide.addEventListener('change', onWide);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseover', offer);
      document.removeEventListener('focusin', offer);
      document.removeEventListener('mouseout', leave);
      document.removeEventListener('focusout', leave);
      document.removeEventListener('click', click);
      window.removeEventListener('scroll', follow);
      window.removeEventListener('resize', follow);
      wide.removeEventListener('change', onWide);
    };
  }, []);

  const className = [
    'ls-copy-tip',
    tip.on && 'ls-is-on',
    tip.done && 'ls-is-done',
    tip.below && 'ls-is-below',
  ]
    .filter(Boolean)
    .join(' ');

  // Координаты — единственное, что задаётся из скрипта: они зависят от ссылки под курсором.
  return (
    <span className={className} aria-live="polite" style={{ left: tip.left, top: tip.top }}>
      <svg
        className="ls-copy-ok"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 6.5l2.5 2.5L10 3.5" />
      </svg>
      <span className="ls-copy-text">{tip.text}</span>
    </span>
  );
}
