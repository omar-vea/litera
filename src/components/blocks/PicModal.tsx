'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { withBase } from '@/lib/base';
import '@/styles/shared/modal.css';

export type Pic = { src: string; alt: string };

type Props = {
  /** Кадры группы; открытый — `index`. `null` — диалог закрыт. */
  pics: Pic[];
  index: number | null;
  onIndex: (i: number | null) => void;
};

const SWIPE = 40;

/**
 * Снимок во весь экран: листалка по кругу (стрелки, клавиатура, свайп)
 * и лупа с честными пикселями файла — только для мыши и только если файл
 * заметно крупнее показанного.
 */
export function PicModal({ pics, index, onIndex }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [lens, setLens] = useState<{
    on: boolean;
    x: number;
    y: number;
    bg: string;
    size: string;
    pos: string;
  }>({
    on: false,
    x: 0,
    y: 0,
    bg: '',
    size: '',
    pos: '',
  });
  const zoom = useRef(1);
  // лупа — только для мыши; узнаём после гидрации, на сервере мыши нет
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(matchMedia('(hover: hover) and (pointer: fine)').matches), []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const count = pics.length;
  const go = (delta: number) => index !== null && onIndex((index + delta + count) % count);
  const pic = index !== null ? pics[index] : null;

  return (
    <dialog
      ref={dialog}
      className="ls-modal ls-modal-pic"
      onClose={() => {
        onIndex(null);
        setLens((l) => ({ ...l, on: false }));
      }}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current.close();
      }}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      {pic && (
        // Снимок в исходном размере и без next/image: лупе нужны настоящие пиксели файла.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={withBase(pic.src)}
          alt={pic.alt}
          onLoad={(e) => {
            const el = e.currentTarget;
            const box = el.getBoundingClientRect();
            zoom.current = box.width ? el.naturalWidth / box.width : 1;
            setLens((l) => ({
              ...l,
              bg: `url("${el.currentSrc}")`,
              size: `${el.naturalWidth}px ${el.naturalHeight}px`,
            }));
          }}
          onMouseMove={(e) => {
            // меньше трети прибавки не стоит показа
            if (!fine || zoom.current < 1.3 || !img.current) return;
            const el = img.current;
            const box = el.getBoundingClientRect();
            const size = 220;
            const x = ((e.clientX - box.left) / box.width) * el.naturalWidth;
            const y = ((e.clientY - box.top) / box.height) * el.naturalHeight;
            setLens((l) => ({
              ...l,
              on: true,
              x: e.clientX,
              y: e.clientY,
              pos: `${size / 2 - x}px ${size / 2 - y}px`,
            }));
          }}
          onMouseLeave={() => setLens((l) => ({ ...l, on: false }))}
          onTouchStart={(e) => {
            if (e.touches.length === 1) touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            const start = touch.current;
            touch.current = null;
            if (!start || count < 2) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - start.x;
            if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(t.clientY - start.y)) return;
            go(dx < 0 ? 1 : -1);
          }}
        />
      )}
      <button
        type="button"
        className="ls-modal-close"
        aria-label="Закрыть"
        onClick={() => dialog.current?.close()}
      >
        <Icon name="close" width={22} height={22} />
      </button>
      <div className="ls-modal-nav" hidden={count < 2}>
        <button type="button" className="ls-modal-prev" aria-label="Предыдущий кадр" onClick={() => go(-1)}>
          <Icon name="prev" width={15} height={12} />
        </button>
        <span className="ls-modal-count" aria-live="polite">
          {index !== null ? `${index + 1} / ${count}` : ''}
        </span>
        <button type="button" className="ls-modal-next" aria-label="Следующий кадр" onClick={() => go(1)}>
          <Icon name="next" width={15} height={12} />
        </button>
      </div>
      {fine && (
        <i
          className={`ls-modal-lens${lens.on ? ' is-on' : ''}`}
          aria-hidden="true"
          // положение и фон лупы — от курсора, иначе никак
          style={{
            left: lens.x,
            top: lens.y,
            backgroundImage: lens.bg,
            backgroundSize: lens.size,
            backgroundPosition: lens.pos,
          }}
        />
      )}
    </dialog>
  );
}
