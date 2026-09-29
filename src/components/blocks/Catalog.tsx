import Image from 'next/image';
import Link from 'next/link';
import type { CatalogGroup, Tile } from '@/content/sections/types';
import '@/styles/shared/rows.css';
import './Catalog.css';

function Row({ tile, sizes }: { tile: Tile; sizes: string }) {
  return (
    <li>
      <Link className="ls-row-body" href={tile.href}>
        {tile.img ? (
          <span className="ls-thumb">
            <Image
              src={tile.img.src}
              width={tile.img.w}
              height={tile.img.h}
              alt={tile.img.alt}
              sizes={sizes}
              loading={tile.eager ? 'eager' : 'lazy'}
            />
          </span>
        ) : (
          <span className="ls-thumb" aria-hidden="true" />
        )}
        <span className="ls-text">
          <span className="ls-row">
            <b>{tile.title}</b>
          </span>
          <span className="ls-note">{tile.note}</span>
        </span>
        {tile.count && <span className="ls-count">{tile.count}</span>}
      </Link>
    </li>
  );
}

/** Разделы направления строками: кадр, название, пояснение, число услуг. */
export function SectionList({ items }: { items: Tile[] }) {
  return (
    <section className="ls-catalog is-plain">
      <h2 className="ls-sr-only">Разделы</h2>
      <ul className="ls-rows">
        {items.map((t) => (
          <Row key={t.href} tile={t} sizes="(min-width: 1024px) 200px, 120px" />
        ))}
      </ul>
    </section>
  );
}

/**
 * Услуги раздела плитками по группам «зачем берут». Две колонки групп;
 * раскладку на десктопе выбирает CSS по размеру групп (`:has`), разметку
 * под неё менять не нужно. В CMS колонки делить на сервере: групп может
 * быть нечётное число.
 */
export function Catalog({ columns }: { columns: CatalogGroup[][] }) {
  return (
    <section className="ls-catalog is-tiles">
      <h2 className="ls-sr-only">Услуги раздела</h2>
      <div className="ls-rows-cols">
        {columns.map((groups, i) => (
          <div key={i} className="ls-cat-col">
            {groups.map((g) => (
              <div key={g.title} className="ls-cat-group">
                <h3>{g.title}</h3>
                <ul className="ls-rows">
                  {g.items.map((t) => (
                    <Row
                      key={t.href}
                      tile={t}
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 50vw"
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
