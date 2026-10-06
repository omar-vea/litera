'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ServiceData } from '@/content/services/types';
import '@/styles/shared/article.css';
import './BeforeAfter.css';

type Props = NonNullable<ServiceData['beforeAfter']>;

/**
 * «Лечим макеты»: шторка до/после. При появлении шторка один раз проходит
 * туда-сюда, чтобы было видно, что кадр живой. Мышь ведёт шторку наведением,
 * палец — касанием; ползунок остаётся для клавиатуры.
 * Рядом — приём макета: кнопка ведёт к форме и открывает выбор файла,
 * файл можно бросить прямо на блок.
 */
export function BeforeAfter({ title, before, after, text, cta }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [demo, setDemo] = useState(false);
  const [easing, setEasing] = useState(false);
  const [over, setOver] = useState(false);
  const [fine, setFine] = useState(true);
  const pointer = useRef<number | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    setFine(matchMedia('(hover: hover) and (pointer: fine)').matches);
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setDemo(true);
        io.disconnect();
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // За курсором и пальцем — покадрово: событий больше, чем перерисовок.
  const follow = (clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const next = Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100));
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setPos(next));
  };

  const fileInput = () => document.querySelector<HTMLInputElement>('.ls-lead-form input[type="file"]');

  const frameClass = ['ls-ba-frame', demo && 'is-demo', easing && 'is-easing'].filter(Boolean).join(' ');

  return (
    <section className="ls-ba">
      <h2>{title}</h2>
      <div
        ref={frame}
        className={frameClass}
        // положение шторки — переменная для CSS (clip-path и ручка)
        style={{ '--pos': `${pos}%` } as React.CSSProperties}
        onAnimationEnd={() => setDemo(false)}
        onMouseEnter={() => fine && setDemo(false)}
        onMouseMove={(e) => fine && follow(e.clientX)}
        onMouseLeave={() => {
          if (!fine) return;
          setEasing(true);
          setPos(50);
          setTimeout(() => setEasing(false), 320);
        }}
        onPointerDown={(e) => {
          if (fine) return;
          pointer.current = e.pointerId;
          setDemo(false);
          e.currentTarget.setPointerCapture(e.pointerId);
          follow(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!fine && e.pointerId === pointer.current) follow(e.clientX);
        }}
        onPointerUp={(e) => {
          if (e.pointerId === pointer.current) pointer.current = null;
        }}
        onPointerCancel={(e) => {
          if (e.pointerId === pointer.current) pointer.current = null;
        }}
      >
        <span className="ls-ba-before">
          <Image
            src={before.src}
            width={before.w}
            height={before.h}
            alt={before.alt}
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <span className="ls-ba-tag">До</span>
        </span>
        <span className="ls-ba-after">
          <Image
            src={after.src}
            width={after.w}
            height={after.h}
            alt={after.alt}
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <span className="ls-ba-tag">После</span>
        </span>
        <span className="ls-ba-handle" aria-hidden="true" />
        <input
          className="ls-ba-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          aria-label="Сравнить макет до правки и после"
          // на тач-экране ползунок не спорит за палец: шторку ведёт рамка
          style={fine ? undefined : { pointerEvents: 'none' }}
          onChange={(e) => setPos(Number(e.target.value))}
        />
      </div>
      <div className="ls-ba-side">
        <p>{text}</p>
        <div
          className={`ls-ba-cta${over ? ' is-over' : ''}`}
          onDragEnter={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            const input = fileInput();
            if (!input || !e.dataTransfer.files.length) return;
            // Файл уходит в форму заявки: её список файлов слушает change.
            input.files = e.dataTransfer.files;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            document.querySelector('.ls-lead-form')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
          }}
        >
          <b>{cta.title}</b>
          <p>{cta.text}</p>
          <a
            className="ls-btn ls-btn-main ls-btn-s"
            href="#zayavka"
            // выбор файла — когда страница доехала до формы, иначе непонятно, куда попал файл
            onClick={() => setTimeout(() => fileInput()?.click(), 600)}
          >
            {cta.button}
          </a>
          <span className="ls-ba-drop">или перетащите файл сюда</span>
        </div>
      </div>
    </section>
  );
}
