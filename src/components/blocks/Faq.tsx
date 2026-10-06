import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Tile } from '@/content/sections/types';
import '@/styles/shared/faq.css';

export type QA = {
  q: string;
  a: ReactNode;
  /** Услуги под ответом «что выбрать»: карточки с кадром из каталога раздела. */
  links?: { href: string; label: string }[];
};

type Props = {
  title: string;
  items: QA[];
  /** «Что выбрать под задачу» на разделе: тот же аккордеон, другой класс и якорь. */
  variant?: 'faq' | 'choose';
  id?: string;
  /** Кадры услуг по адресу — для карточек под ответами «что выбрать». */
  thumbs?: Map<string, Tile['img']>;
  /** Что стоит под списком: ссылки на услуги у пар «что выбрать» и т. п. */
  children?: ReactNode;
};

/**
 * Вопросы-аккордеон на `<details name>`: открыт один ответ за раз,
 * без скрипта (атрибут `name` у details поддерживают все живые браузеры).
 */
export function Faq({ title, items, variant = 'faq', id, thumbs, children }: Props) {
  const group = id ?? variant;
  return (
    <section className={variant === 'choose' ? 'ls-faq ls-choose' : 'ls-faq'} id={id}>
      <h2>{title}</h2>
      <div className="ls-qa-list">
        {items.map((it) => (
          <details key={it.q} className="ls-qa" name={group}>
            <summary>
              <span className="ls-q">{it.q}</span>
              <span className="ls-sign" aria-hidden="true" />
            </summary>
            {it.a}
            {it.links && (
              <ul className="ls-qa-links">
                {it.links.map((l) => {
                  const img = thumbs?.get(l.href);
                  // Без кадра (заявка, а не услуга) — прежняя контурная кнопка.
                  return (
                    <li key={l.href + l.label}>
                      {img ? (
                        <Link className="ls-qa-card" href={l.href}>
                          <span className="ls-qa-pic">
                            <Image src={img.src} width={img.w} height={img.h} alt="" sizes="160px" />
                          </span>
                          {l.label}
                        </Link>
                      ) : (
                        <Link className="ls-btn ls-btn-line ls-btn-xs" href={l.href}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </details>
        ))}
      </div>
      {children}
    </section>
  );
}
