'use client';

import { useEffect, useRef } from 'react';
import './CursorLabel.css';

/**
 * Подпись у курсора над карточками: что случится по клику. Текст — из
 * `data-cursor` на ссылке. Только для мыши: на тач-экранах курсора нет.
 * Одна плашка на страницу, слушатель делегирован на документ.
 */
export function CursorLabel() {
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = label.current;
    if (!el) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let current: Element | null = null;

    const draw = () => {
      frame = 0;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element).closest?.('[data-cursor]') ?? null;
      if (target !== current) {
        current = target;
        el.textContent = target?.getAttribute('data-cursor') ?? '';
        el.classList.toggle('is-on', Boolean(target));
      }
      if (target && !frame) frame = requestAnimationFrame(draw);
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={label} className="ls-cursor" aria-hidden="true" />;
}
