import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { directions, directionsTotal, type Direction } from '@/content/directions';
import './Directions.css';

type Props = {
  title?: string;
  /** Своё направление убирается из «Других направлений». */
  exclude?: Direction['slug'];
  /** Вариант внизу страницы направления: без счёта, встык к форме. */
  more?: boolean;
  /** На 404 полосы идут за текстом, а не за тёмным первым экраном. */
  afterText?: boolean;
  children?: ReactNode;
};

/** Развилка на четыре направления: главная, 404 и «Другие направления». */
export function Directions({ title = 'Что делаем', exclude, more, afterText, children }: Props) {
  const list = directions.filter((d) => d.slug !== exclude);
  const className = ['ls-dirs', more && 'ls-dirs-more', afterText && 'ls-dirs-after-text']
    .filter(Boolean)
    .join(' ');
  return (
    <section className={className}>
      <div className="ls-dirs-head">
        <h2>{title}</h2>
        {!more && <p>4 направления · {directionsTotal}</p>}
      </div>
      <div className="ls-dirs-in">
        <ul>
          {list.map((d) => (
            <li key={d.slug} data-dir={d.slug}>
              <Link href={d.href}>
                <span className="ls-dir-num">{d.num}</span>
                <span className="ls-dir-count">{d.count}</span>
                <span className="ls-dir-text">
                  <b>{d.title}</b>
                  <span className="ls-dir-note">{d.note}</span>
                </span>
                <span className="ls-dir-shot is-set">
                  <Image
                    src={d.shot.src}
                    width={1100}
                    height={1100}
                    alt={d.shot.alt}
                    sizes="(min-width: 1024px) 25vw, 40vw"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </section>
  );
}
