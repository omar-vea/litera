import Image from 'next/image';
import Link from 'next/link';
import '@/styles/shared/rows.css';
import './Related.css';

export type RelatedItem = {
  title: string;
  note: string;
  href: string;
  /** Нет кадра — серая заглушка того же размера. */
  img?: { src: string; alt: string };
};

type Props = {
  title: string;
  all: { href: string; label: string };
  items: RelatedItem[];
};

/** «Ещё из раздела» / «Ещё в полиграфии»: соседние услуги или разделы строками. */
export function Related({ title, all, items }: Props) {
  return (
    <section className="ls-related">
      <div className="ls-related-head">
        <h2>{title}</h2>
        <Link href={all.href}>{all.label}</Link>
      </div>
      <ul className="ls-rows">
        {items.map((it, i) => (
          <li key={`${it.href}-${i}`}>
            <Link className="ls-row-body" href={it.href}>
              {it.img ? (
                <span className="ls-thumb">
                  <Image src={it.img.src} width={416} height={416} alt={it.img.alt} sizes="80px" />
                </span>
              ) : (
                <span className="ls-thumb" aria-hidden="true" />
              )}
              <span className="ls-text">
                <span className="ls-row">
                  <b>{it.title}</b>
                </span>
                <span className="ls-note">{it.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
