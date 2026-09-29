import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Post } from '@/content/blog';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { PostRows } from '@/components/blocks/BlogList';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { JsonLd } from '@/components/ui/JsonLd';
import '@/styles/shared/article.css';
import '@/styles/shared/section-head.css';

export type ArticleData = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  image: string;
  /** Даты остаются в разметке для поиска; на экране их нет (см. article.css). */
  published: string;
  modified: string;
  readingTime: string;
  rubric: { title: string; short: string; more: string };
  body: ReactNode;
  related: Post[];
};

/** Статья блога: текст, врезка «пришлите макет», соседние статьи рубрики, форма. */
export function ArticleTemplate({ data }: { data: ArticleData }) {
  const url = `${site.url}/blog/${data.slug}`;
  return (
    <main className="ls-card" id="main">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Блог', item: `${site.url}/blog` },
            { '@type': 'ListItem', position: 3, name: data.rubric.short, item: url },
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.metaTitle,
          datePublished: data.published,
          dateModified: data.modified,
          image: data.image,
          author: { '@type': 'Organization', name: site.name },
          publisher: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
        }}
      />
      <SiteHeader noHero />
      <div className="ls-body">
        <BackLink href="/blog" label="Блог" />
        <h1 className="ls-title">{data.title}</h1>
        <p className="ls-article-meta">
          {data.readingTime} · <Link href="/blog">{data.rubric.title}</Link>
        </p>
      </div>
      <div className="ls-rest">
        <i className="ls-rest-sentinel" aria-hidden="true" />
        <i className="ls-chat-sentinel" aria-hidden="true" />
        <article className="ls-article">
          {data.body}
          <aside className="ls-article-cta">
            <p>
              <b>Не уверены, что с файлом всё в порядке?</b> Пришлите как есть&nbsp;— проверим и скажем, что
              поправить. Бесплатно и до того, как считать тираж.
            </p>
            <div className="ls-article-cta-row">
              <a className="ls-btn ls-btn-main" href="#zayavka">
                Прислать макет
              </a>
              <Link href="/trebovaniya-k-maketam">Требования к макетам</Link>
            </div>
          </aside>
        </article>
        <section className="ls-article-more ls-blog">
          <div className="ls-works-head">
            <h2>{data.rubric.more}</h2>
            <Link href="/blog">Все статьи</Link>
          </div>
          <PostRows posts={data.related} />
        </section>
        <Proof />
        <LeadForm />
      </div>
    </main>
  );
}
