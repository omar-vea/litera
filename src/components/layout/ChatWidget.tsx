'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import './ChatWidget.css';

const channels = [
  { label: 'Telegram', href: site.messengers.telegram },
  { label: 'WhatsApp', href: site.messengers.whatsapp },
  { label: 'Max', href: site.messengers.max },
];

/**
 * Кнопка связи в углу. На телефоне не висит на первом экране — перекрывает
 * кадр и главную кнопку; появляется, когда первый экран ушёл под шапку
 * (метка `.ls-chat-sentinel` в разметке страницы).
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [away, setAway] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const fab = useRef<HTMLButtonElement>(null);

  const toggle = (next: boolean) => {
    setOpen(next);
    if (next) setEverOpened(true);
  };

  // Прячем на первом экране телефона.
  useEffect(() => {
    const mark = document.querySelector('.ls-chat-sentinel');
    if (!mark) return;
    const barHeight = document.querySelector<HTMLElement>('.ls-topbar')?.offsetHeight || 54;
    const narrow = window.matchMedia('(max-width: 1023px)');
    let past = false;

    const paint = () => {
      const isAway = narrow.matches && !past;
      setAway(isAway);
      if (isAway) setOpen(false);
    };
    // Положение метки считаем сами: «не пересекается» не говорит, выше она окна или ниже.
    const observer = new IntersectionObserver(
      () => {
        past = mark.getBoundingClientRect().top <= barHeight;
        paint();
      },
      { rootMargin: `-${barHeight}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(mark);
    narrow.addEventListener('change', paint);
    paint();
    return () => {
      observer.disconnect();
      narrow.removeEventListener('change', paint);
    };
  }, []);

  // Escape и клик мимо закрывают список.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        fab.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div ref={root} className={`ls-chat${away ? ' ls-is-away' : ''}`}>
      <div className={`ls-chat-list${open ? ' ls-is-open' : ''}`} id="chat-list" hidden={!everOpened}>
        {channels.map((c) => (
          <a
            key={c.label}
            className="ls-btn ls-btn-light ls-btn-s ls-chat-item"
            href={c.href}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
          >
            {c.label}
          </a>
        ))}
      </div>
      <button
        ref={fab}
        className="ls-chat-fab"
        type="button"
        aria-expanded={open}
        aria-controls="chat-list"
        aria-label={open ? 'Закрыть' : 'Связаться'}
        onClick={() => toggle(!open)}
      >
        <Icon name="talk" className="ls-chat-ico-talk" width={24} height={24} />
        <Icon name="close" className="ls-chat-ico-close" width={22} height={22} />
      </button>
    </div>
  );
}
