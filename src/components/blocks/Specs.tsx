'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ServiceData, SpecRow } from '@/content/services/types';
import '@/styles/shared/rows.css';
import './Specs.css';
import '@/styles/shared/more.css';

/**
 * «Материалы и отделка»: группы строк с превью. На тач-экране превью
 * увеличивается касанием (мышью — наведением, это делает CSS); касание мимо
 * или прокрутка закрывают увеличенное.
 */
export function Specs({ title, cols }: NonNullable<ServiceData['specs']>) {
  const [zoomed, setZoomed] = useState<string | null>(null);

  useEffect(() => {
    if (!zoomed) return;
    const close = () => setZoomed(null);
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as Element).closest('.ls-thumb')) close();
    };
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('scroll', close, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('scroll', close);
    };
  }, [zoomed]);

  const row = (r: SpecRow, key: string) => (
    <li key={key} className="ls-row-body">
      {r.img ? (
        <span
          className={`ls-thumb${zoomed === key ? ' ls-is-zoom' : ''}`}
          onClick={() => {
            if (matchMedia('(hover: hover)').matches) return;
            setZoomed(zoomed === key ? null : key);
          }}
        >
          <Image src={r.img.src} width={r.img.w} height={r.img.h} alt={r.img.alt} sizes="104px" />
        </span>
      ) : (
        <span className="ls-thumb" aria-hidden="true" />
      )}
      <div>
        <b>{r.title}</b>
        <p>{r.text}</p>
      </div>
    </li>
  );

  return (
    <section className="ls-specs">
      <h2>{title}</h2>
      {cols.map((col, c) => (
        <div key={c} className="ls-spec-col">
          {col.map((g, gi) => (
            <div key={g.title} className="ls-spec-group">
              <h3>{g.title}</h3>
              <ul className="ls-rows">{g.rows.map((r, i) => row(r, `${c}-${gi}-${i}`))}</ul>
              {g.more && (
                <details className="ls-more">
                  <summary>
                    <span className="ls-s-closed">{g.more.label}</span>
                    <span className="ls-s-open">Свернуть</span>
                  </summary>
                  <ul className="ls-rows">{g.more.rows.map((r, i) => row(r, `${c}-${gi}-m${i}`))}</ul>
                </details>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
