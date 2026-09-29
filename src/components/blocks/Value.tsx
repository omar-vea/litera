import Link from 'next/link';
import type { ServiceData } from '@/content/services/types';
import '@/styles/shared/button-row.css';

/** «Зачем … бизнесу» / «От чего зависит цена»: доводы строками со знаком. */
export function Value({ title, items, link }: ServiceData['value']) {
  return (
    <section className="ls-value">
      <h2>{title}</h2>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            <svg className="ls-mark" viewBox="0 0 113.12 161.82" aria-hidden="true">
              <use href="/icons.svg#i-mark" />
            </svg>
            <b>{it.title}</b>
            <p>{it.text}</p>
          </li>
        ))}
      </ul>
      {link && (
        <p className="ls-req-pdf">
          <Link className="ls-btn ls-btn-line ls-btn-s" href={link.href}>
            {link.label}
          </Link>
        </p>
      )}
    </section>
  );
}
