'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ServiceData } from '@/content/services/types';
import { Icon } from '@/components/ui/Icon';
import './Can.css';

/**
 * «Ваши лучшие …»: что можно добавить сверх обычного тиража. Лента
 * прокручивается вбок; стрелки и полоса прокрутки появляются, только
 * когда карточкам тесно.
 */
export function Can({ title, items }: ServiceData['can']) {
  const list = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ scrollable: false, atStart: true, atEnd: false, knob: 100, shift: 0 });

  const sync = useCallback(() => {
    const el = list.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const visible = el.clientWidth / el.scrollWidth;
    setState({
      scrollable: max > 1,
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft >= max - 1,
      knob: visible * 100,
      shift: max > 0 ? (el.scrollLeft / max) * (100 / visible - 100) : 0,
    });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  // Шаг — карточка с промежутком: лента всегда встаёт по краю кадра.
  const step = (dir: 1 | -1) => {
    const el = list.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  return (
    <section className="ls-can">
      <div className="ls-can-head">
        <h2>{title}</h2>
        <div className="ls-can-nav" hidden={!state.scrollable}>
          <button
            type="button"
            className="ls-can-prev"
            aria-label="Предыдущие"
            disabled={state.atStart}
            onClick={() => step(-1)}
          >
            <Icon name="prev" width={15} height={12} />
          </button>
          <button
            type="button"
            className="ls-can-next"
            aria-label="Следующие"
            disabled={state.atEnd}
            onClick={() => step(1)}
          >
            <Icon name="next" width={15} height={12} />
          </button>
        </div>
      </div>
      <ul ref={list} onScroll={sync}>
        {items.map((it, i) => (
          <li key={i}>
            <span className="ls-can-pic">
              {it.img && (
                <Image
                  src={it.img.src}
                  width={it.img.w}
                  height={it.img.h}
                  alt={it.img.alt}
                  sizes="(min-width: 1024px) 25vw, 70vw"
                  priority={i === 0}
                />
              )}
            </span>
            <b>{it.title}</b>
            <p>{it.text}</p>
          </li>
        ))}
      </ul>
      <div className="ls-can-bar" aria-hidden="true" hidden={!state.scrollable}>
        {/* ширина и сдвиг бегунка считаются по прокрутке — только так */}
        <i style={{ width: `${state.knob}%`, translate: `${state.shift}%` }} />
      </div>
    </section>
  );
}
