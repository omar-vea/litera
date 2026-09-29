'use client';

import { useEffect, useState } from 'react';

/**
 * Шапка прозрачная поверх кадра и белая, как только до неё доходит белый
 * слой страницы. Слой начинается в разных местах: на широком экране это блок
 * под первым экраном (`.ls-rest-sentinel`), на телефоне — текст под кадром
 * (`.ls-body-sentinel`). Если своих меток у страницы нет — решает метка
 * сразу под шапкой (`.ls-scroll-sentinel`).
 *
 * Заодно красим холст под страницей (класс на body): тёмный на первом экране
 * и у футера, светлый в середине — иначе при оттяжке видна белая полоса.
 */
export function useStickyBar(noHero: boolean) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.ls-topbar');
    const top = document.querySelector('.ls-scroll-sentinel');
    if (!bar || !top) return;

    const barHeight = () => bar.offsetHeight || 54;
    const wide = window.matchMedia('(min-width: 1024px)');
    const marks = {
      wide: document.querySelector('.ls-rest-sentinel'),
      narrow: document.querySelector('.ls-body-sentinel'),
    };
    const theme = document.querySelector('meta[name="theme-color"]');
    const foot = document.querySelector('.ls-foot');
    let topVisible = true;
    let atTop = true;
    let atFoot = false;
    const below = { wide: true, narrow: true };

    const paintCanvas = () => {
      document.body.classList.toggle('ls-canvas-light', !atTop && !atFoot);
      document.body.classList.toggle('ls-canvas-foot', atFoot);
    };
    const apply = (on: boolean) => {
      setStuck(on);
      theme?.setAttribute('content', on || noHero ? '#ffffff' : '#111112');
      atTop = !on;
      paintCanvas();
    };
    const decide = () => {
      const key = wide.matches ? 'wide' : 'narrow';
      apply(marks[key] ? !below[key] : !topVisible);
    };

    const observers: IntersectionObserver[] = [];
    const topObserver = new IntersectionObserver(([e]) => {
      topVisible = e.isIntersecting;
      if (!marks.wide && !marks.narrow) apply(!topVisible);
    });
    topObserver.observe(top);
    observers.push(topObserver);

    (Object.keys(marks) as (keyof typeof marks)[]).forEach((key) => {
      const mark = marks[key];
      if (!mark) return;
      // Не isIntersecting, а положение метки: метка ниже окна — тоже «слой не дошёл».
      const o = new IntersectionObserver(
        ([e]) => {
          below[key] = e.boundingClientRect.top > barHeight();
          decide();
        },
        { rootMargin: `-${barHeight()}px 0px 0px 0px` },
      );
      o.observe(mark);
      observers.push(o);
    });

    if (foot) {
      const o = new IntersectionObserver(([e]) => {
        atFoot = e.isIntersecting;
        paintCanvas();
      });
      o.observe(foot);
      observers.push(o);
    }

    // Страховка от рывка: при быстрой прокрутке наблюдатель не всегда успевает.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const key = wide.matches ? 'wide' : 'narrow';
        const mark = marks[key];
        if (!mark) return;
        const isBelow = mark.getBoundingClientRect().top > barHeight();
        if (below[key] !== isBelow) {
          below[key] = isBelow;
          decide();
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    wide.addEventListener('change', decide);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
      wide.removeEventListener('change', decide);
    };
  }, [noHero]);

  return stuck;
}
