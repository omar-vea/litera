import type { ReactNode } from 'react';
import '@/styles/shared/faq.css';

export type QA = { q: string; a: ReactNode };

type Props = {
  title: string;
  items: QA[];
  /** «Что выбрать под задачу» на разделе: тот же аккордеон, другой класс и якорь. */
  variant?: 'faq' | 'choose';
  id?: string;
  /** Что стоит под списком: ссылки на услуги у пар «что выбрать» и т. п. */
  children?: ReactNode;
};

/**
 * Вопросы-аккордеон на `<details name>`: открыт один ответ за раз,
 * без скрипта (атрибут `name` у details поддерживают все живые браузеры).
 */
export function Faq({ title, items, variant = 'faq', id, children }: Props) {
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
          </details>
        ))}
      </div>
      {children}
    </section>
  );
}
