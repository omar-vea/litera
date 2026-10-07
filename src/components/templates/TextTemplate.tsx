import type { ReactNode } from 'react';
import type { Post } from '@/content/blog';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { PostRows } from '@/components/blocks/BlogList';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import '@/styles/shared/article.css';

export type TextData = {
  back: { href: string; label: string };
  title: string;
  meta?: string;
  /** текст страницы: документ или кейс */
  body?: ReactNode;
  /** или список записей: «Кейсы» */
  list?: Post[];
  /** доверие и форма под текстом — у кейсов; у документов их нет */
  form?: boolean;
};

/** Текстовая страница с прода: документы, кейсы и их список. */
export function TextTemplate({ data }: { data: TextData }) {
  return (
    <main className="ls-card" id="main">
      <SiteHeader noHero />
      <div className="ls-body">
        <BackLink href={data.back.href} label={data.back.label} />
        <h1 className="ls-title">{data.title}</h1>
        {data.meta && <p className="ls-article-meta">{data.meta}</p>}
      </div>
      <div className="ls-rest">
        <i className="ls-rest-sentinel" aria-hidden="true" />
        <i className="ls-chat-sentinel" aria-hidden="true" />
        {data.body && <article className="ls-article">{data.body}</article>}
        {data.list && (
          <section className="ls-blog">
            <PostRows posts={data.list} />
          </section>
        )}
        {data.form && (
          <>
            <Proof />
            <LeadForm />
          </>
        )}
      </div>
    </main>
  );
}
