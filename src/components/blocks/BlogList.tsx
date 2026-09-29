import Image from 'next/image';
import Link from 'next/link';
import type { Post, Rubric } from '@/content/blog';
import { typo } from '@/lib/typo';
import '@/styles/shared/rows.css';
import './BlogList.css';

/* Обложки статей пока на живом сайте (litera.studio/wp-content, см. remotePatterns в next.config). */

function Cover({ src, width, height }: { src: string; width: number; height: number }) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt=""
      sizes={width > 200 ? '(min-width: 1024px) 50vw, 100vw' : '76px'}
    />
  );
}

/** Список статей: две главные крупно, дальше рубрики двумя колонками. */
export function BlogList({ top, columns }: { top: Post[]; columns: Rubric[][] }) {
  return (
    <section className="ls-blog">
      <h2 className="ls-sr-only">Статьи</h2>
      <h3>Новое</h3>
      <ul className="ls-blog-top">
        {top.map((p) => (
          <li key={p.href}>
            <Link href={p.href}>
              <Cover src={p.cover} width={544} height={300} />
              <b>{typo(p.title)}</b>
            </Link>
          </li>
        ))}
      </ul>
      <div className="ls-blog-cols">
        {columns.map((col, i) => (
          <div key={i}>
            {col.map((r) => (
              <RubricList key={r.title} rubric={r} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function RubricList({ rubric }: { rubric: Rubric }) {
  return (
    <>
      <h3>{rubric.title}</h3>
      <PostRows posts={rubric.posts} />
    </>
  );
}

/** Статьи строками: миниатюра и название. Рубрика в блоге и «Ещё про…» под статьёй. */
export function PostRows({ posts }: { posts: Post[] }) {
  return (
    <ul className="ls-rows">
      {posts.map((p) => (
        <li key={p.href}>
          <Link className="ls-row-body" href={p.href}>
            <span className="ls-thumb">
              <Cover src={p.cover} width={76} height={76} />
            </span>
            <span className="ls-text">
              <b>{typo(p.title)}</b>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
