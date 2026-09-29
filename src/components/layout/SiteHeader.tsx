'use client';

import Link from 'next/link';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { menu } from '@/content/menu';
import { Icon } from '@/components/ui/Icon';
import { SEARCH_IN_BAR, WIDE, useMediaQuery } from '@/lib/useMediaQuery';
import { MenuSearch } from './MenuSearch';
import { useStickyBar } from './useStickyBar';
import './SiteHeader.css';
import './Menu.css';

type Props = {
  /** Страница без кадра под шапкой: шапка сразу белая. */
  noHero?: boolean;
  /** Куда ведёт «Обсудить». По умолчанию — форма заявки на этой же странице. */
  ctaHref?: string;
};

/** Последнее слово названия со стрелкой не разрываются: иначе стрелка висит одна. */
function GroupName({ title }: { title: string }) {
  const at = title.lastIndexOf(' ');
  const head = at > 0 ? title.slice(0, at + 1) : '';
  const tail = at > 0 ? title.slice(at + 1) : title;
  return (
    <span className="ls-menu-group-name">
      {head}
      <span className="ls-nw">
        {tail} <Icon name="chevron" width={14} height={14} />
      </span>
    </span>
  );
}

// На iOS overflow:hidden страницу не держит — фиксируем body и возвращаем позицию.
function lockPage(on: boolean, saved: { y: number }) {
  const b = document.body;
  if (on) {
    saved.y = window.scrollY;
    Object.assign(b.style, { position: 'fixed', top: `${-saved.y}px`, left: '0', right: '0', width: '100%' });
  } else {
    Object.assign(b.style, { position: '', top: '', left: '', right: '', width: '' });
    void b.offsetHeight;
    window.scrollTo({ top: saved.y, behavior: 'instant' });
  }
}

export function SiteHeader({ noHero = false, ctaHref = '#zayavka' }: Props) {
  const wide = useMediaQuery(WIDE);
  const searchInBar = useMediaQuery(SEARCH_IN_BAR);
  const stuck = useStickyBar(noHero);

  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [section, setSection] = useState<number | null>(null);
  const [searchReset, setSearchReset] = useState(0);
  const bar = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const saved = useRef({ y: 0 });

  useEffect(() => {
    document.documentElement.classList.toggle('ls-no-hero', noHero);
  }, [noHero]);

  const setMenu = useCallback((on: boolean) => {
    setOpen(on);
    if (on) setEverOpened(true);
    else setSearchReset((n) => n + 1);
    document.body.classList.toggle('ls-is-menu', on);
    // строка статуса должна совпасть с тёмной шапкой
    if (on) document.body.classList.remove('ls-canvas-light');
    // на десктопе панель падает из-под шапки — держать страницу незачем
    if (!window.matchMedia(WIDE).matches) lockPage(on, saved.current);
  }, []);

  // Escape и клик мимо (только на широком: на телефоне панель во весь экран).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        lastTrigger.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!window.matchMedia(WIDE).matches) return;
      const t = e.target as Node;
      if (panel.current?.contains(t) || bar.current?.contains(t)) return;
      setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, setMenu]);

  const trigger = (e: React.MouseEvent<HTMLButtonElement>) => {
    lastTrigger.current = e.currentTarget;
    setMenu(!open);
  };

  // Закрыть меню и доехать до формы, когда прокрутка снова возможна.
  const goToForm = (text?: string) => {
    const task = document.querySelector<HTMLTextAreaElement>('#task');
    if (task && text) {
      task.value = text.trim();
      task.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (open) setMenu(false);
    const form = document.querySelector('#zayavka');
    if (form) setTimeout(() => form.scrollIntoView({ block: 'start' }), 340);
    else window.location.href = '/#zayavka';
  };

  const ctaVisible = open || wide || stuck;
  const search = <MenuSearch onAsk={goToForm} resetKey={searchReset} />;

  return (
    <>
      <header ref={bar} className={`ls-topbar${stuck ? ' ls-is-stuck' : ''}${open ? ' ls-menu-open' : ''}`}>
        <Link className="ls-wordmark" href="/">
          <span className="ls-sr-only">{site.name}&nbsp;— дизайн и печать</span>
          <i className="ls-wordmark-mark" aria-hidden="true" />
          <span className="ls-wordmark-text" aria-hidden="true">
            <i className="ls-wordmark-name" />
            <span className="ls-wordmark-tag">дизайн и печать</span>
          </span>
        </Link>
        <nav className="ls-topnav" aria-label="Разделы сайта">
          <button
            className="ls-topnav-menu"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            onClick={trigger}
          >
            Услуги
            <Icon name="chevron" width={14} height={14} />
          </button>
          <Link href="/projects">Работы</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>
        <div className="ls-topbar-search">{searchInBar && search}</div>
        <div className="ls-topbar-tel">
          <a className="ls-topbar-phone" href={site.phone.href}>
            {site.phone.display}
          </a>
          <span className="ls-topbar-tel-note">{site.phone.note}</span>
        </div>
        <a
          className="ls-btn ls-btn-main ls-btn-xs ls-topbar-cta"
          href={ctaHref}
          tabIndex={ctaVisible ? 0 : -1}
          aria-hidden={!ctaVisible}
          onClick={(e) => {
            if (!open) return;
            e.preventDefault();
            goToForm();
          }}
        >
          Обсудить
        </a>
        <button
          className="ls-burger"
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Меню'}
          aria-expanded={open}
          aria-controls="menu"
          onClick={trigger}
        >
          <span className="ls-ico" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </header>
      <i className="ls-scroll-sentinel" aria-hidden="true" />

      <div
        ref={panel}
        className={`ls-menu${open ? ' ls-is-open' : ''}`}
        id="menu"
        aria-label="Меню"
        hidden={!everOpened}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t.closest('a') && !t.closest('.ls-menu-group')) setMenu(false);
        }}
      >
        {!searchInBar && search}
        <nav className="ls-menu-main" aria-label="Разделы">
          {menu.map((g, i) => {
            // На широком экране разделы колонками и раскрыты все; на телефоне — аккордеон.
            const expanded = wide || section === i;
            return (
              <Fragment key={g.href}>
                <Link
                  className="ls-menu-group"
                  href={g.href}
                  aria-expanded={expanded}
                  aria-controls={`sub${i}`}
                  onClick={(e) => {
                    if (wide) return;
                    e.preventDefault();
                    setSection(section === i ? null : i);
                  }}
                >
                  <GroupName title={g.title} />
                </Link>
                <div className={`ls-menu-sub${expanded ? ' ls-is-open' : ''}`} id={`sub${i}`}>
                  <div>
                    <Link className="ls-menu-all" href={g.href}>
                      Все услуги раздела
                    </Link>
                    {g.items
                      .filter((it) => !it.soon)
                      .map((it) => (
                        <Link key={it.href} href={it.href}>
                          {it.label}
                        </Link>
                      ))}
                  </div>
                </div>
              </Fragment>
            );
          })}
        </nav>
        <nav className="ls-menu-more" aria-label="Информация">
          <Link href="/projects">Работы</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>
        <div className="ls-menu-foot">
          <a href={site.phone.href}>{site.phone.display}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p className="ls-menu-links">
            <a href={site.messengers.telegram}>Telegram</a>
            <a href={site.messengers.whatsapp}>WhatsApp</a>
            <a href={site.messengers.max}>Max</a>
          </p>
        </div>
      </div>
    </>
  );
}
