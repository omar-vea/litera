'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { Short, Work, WorksSet } from '@/content/works';
import { Icon } from '@/components/ui/Icon';
import '@/styles/shared/modal.css';
import './Works.css';
import './Shorts.css';
import '@/styles/shared/section-head.css';

/**
 * Работы: лента карточек, у карточки три кадра — наведение на треть
 * карточки показывает свой кадр. Если есть ролики — вкладки «Фото · Видео».
 * Без вкладок (кейс) — обычный заголовок.
 */

function WorkCard({ work }: { work: Work }) {
  if (work.shots.length < 2) {
    const [shot] = work.shots;
    return (
      <li className="ls-work">
        <Link href={work.href} data-cursor="Посмотреть работу">
          <Image
            src={shot.src}
            width={shot.w}
            height={shot.h}
            alt={shot.alt}
            sizes="(min-width: 1024px) 50vw, 80vw"
          />
          <b>{work.title}</b>
          {work.tags && <span className="ls-work-tags">{work.tags}</span>}
        </Link>
      </li>
    );
  }
  return (
    <li className="ls-work ls-has-shots">
      <Link href={work.href} data-cursor="Посмотреть работу">
        {work.shots.map((s) => (
          <i key={s.src} className="ls-zone" aria-hidden="true" />
        ))}
        <span className="ls-shots">
          {work.shots.map((s) => (
            <Image
              key={s.src}
              src={s.src}
              width={s.w}
              height={s.h}
              alt={s.alt}
              sizes="(min-width: 1024px) 50vw, 80vw"
            />
          ))}
        </span>
        <span className="ls-dots" aria-hidden="true">
          {work.shots.map((s) => (
            <i key={s.src} />
          ))}
        </span>
        <b>{work.title}</b>
        {work.tags && <span className="ls-work-tags">{work.tags}</span>}
      </Link>
    </li>
  );
}

function Shorts({ shorts, hidden }: { shorts: Short[]; hidden: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  const play = (e: React.MouseEvent, video: string) => {
    const [owner, id] = video.split('_');
    if (!owner || !id || !dialog.current?.showModal) return;
    e.preventDefault();
    setSrc(`https://vk.com/video_ext.php?oid=-${owner}&id=${id}&hd=2&autoplay=1`);
    dialog.current.showModal();
  };

  return (
    <>
      <ul
        className="ls-shorts-list"
        id="works-video"
        role="tabpanel"
        aria-labelledby="tab-video"
        hidden={hidden}
      >
        {shorts.map((s) => (
          <li key={s.video} className="ls-short">
            <a
              href={s.href}
              data-cursor="Смотреть ролик"
              target="_blank"
              rel="noopener"
              onClick={(e) => play(e, s.video)}
            >
              <Image
                src={s.poster}
                width={405}
                height={720}
                alt={s.alt}
                sizes="(min-width: 1024px) 25vw, 45vw"
              />
              <i className="ls-short-play" aria-hidden="true">
                <Icon name="play" width={15} height={18} />
              </i>
            </a>
          </li>
        ))}
      </ul>
      {/* src снимаем при закрытии: иначе ролик играет за кулисами */}
      <dialog
        ref={dialog}
        className="ls-modal ls-modal-video"
        onClose={() => setSrc(null)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        {src && (
          <iframe
            title="Ролик Литеры"
            src={src}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
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
      </dialog>
    </>
  );
}

export function Works({ set }: { set: WorksSet }) {
  const [tab, setTab] = useState<'photo' | 'video'>('photo');
  const withTabs = set.title === 'Работы';
  const tabs = set.shorts.length ? (['photo', 'video'] as const) : (['photo'] as const);

  const onKey = (e: React.KeyboardEvent) => {
    if (tabs.length < 2 || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    const next = tab === 'photo' ? 'video' : 'photo';
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section className="ls-works">
      <div className="ls-works-head">
        {withTabs ? (
          <div>
            <h2 className="ls-sr-only">Работы</h2>
            <div className="ls-works-tabs" role="tablist" aria-label="Что показывать" onKeyDown={onKey}>
              <button
                type="button"
                role="tab"
                id="tab-photo"
                aria-controls="works-photo"
                aria-selected={tab === 'photo'}
                tabIndex={tab === 'photo' ? 0 : -1}
                onClick={() => setTab('photo')}
              >
                Фото<em>{set.works.length}</em>
              </button>
              {set.shorts.length > 0 && (
                <>
                  <i aria-hidden="true">·</i>
                  <button
                    type="button"
                    role="tab"
                    id="tab-video"
                    aria-controls="works-video"
                    aria-selected={tab === 'video'}
                    tabIndex={tab === 'video' ? 0 : -1}
                    onClick={() => setTab('video')}
                  >
                    Видео<em>{set.shorts.length}</em>
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <h2>{set.title}</h2>
        )}
        <Link href={set.more.href}>{set.more.label}</Link>
      </div>

      <ul
        className="ls-works-list"
        id={withTabs ? 'works-photo' : undefined}
        role={withTabs ? 'tabpanel' : undefined}
        aria-labelledby={withTabs ? 'tab-photo' : undefined}
        hidden={tab !== 'photo'}
      >
        {set.works.map((w) => (
          <WorkCard key={w.title + w.shots[0]?.src} work={w} />
        ))}
      </ul>
      {set.shorts.length > 0 && <Shorts shorts={set.shorts} hidden={tab !== 'video'} />}
    </section>
  );
}
