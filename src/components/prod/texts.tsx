import type { Texts, ProdText } from '@/lib/prod';
import type { ArticleData } from '@/components/templates/ArticleTemplate';
import type { TextData } from '@/components/templates/TextTemplate';
import { blogColumns } from '@/content/blog';
import { Rich } from './Rich';

export type TextPage =
  { kind: 'article'; data: ArticleData; title: string } | { kind: 'text'; data: TextData; title: string };

const minutes = (n: number) =>
  `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'минута' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'минуты' : 'минут'}`;

const body = (t: ProdText) => <Rich root={t.body} doc />;

/** Статья блога: рубрика и соседние статьи — из списка блога (`blogColumns`). */
function article(t: ProdText): TextPage {
  const href = `/blog/${t.slug}`;
  const rubric = blogColumns.flat().find((r) => r.posts.some((p) => p.href === href));
  return {
    kind: 'article',
    title: t.seo.title,
    data: {
      slug: t.slug,
      title: t.title,
      metaTitle: t.seo.title,
      description: t.seo.description,
      image: t.img?.src ?? '',
      published: t.date.slice(0, 10),
      modified: t.date.slice(0, 10),
      readingTime: minutes(t.read || 1),
      rubric: {
        title: rubric?.title ?? 'Блог',
        short: t.title,
        more: rubric ? `Ещё в рубрике «${rubric.title}»` : 'Ещё статьи',
      },
      body: body(t),
      related: (rubric?.posts ?? []).filter((p) => p.href !== href).slice(0, 3),
    },
  };
}

/** Блог, кейсы и страницы-документы прода по адресу; ничего нет — null. */
export function buildText(path: string, texts: Texts): TextPage | null {
  const [head, slug] = path.split('/');
  if (head === 'blog' && slug) {
    const t = texts.blog.find((x) => x.slug === slug);
    return t ? article(t) : null;
  }
  if (head === 'case' && slug) {
    const t = texts.cases.find((x) => x.slug === slug);
    return t
      ? {
          kind: 'text',
          title: t.seo.title,
          data: {
            back: { href: '/cases', label: 'Кейсы' },
            title: t.title,
            meta: minutes(t.read || 1),
            body: body(t),
            form: true,
          },
        }
      : null;
  }
  if (path === 'cases') {
    return {
      kind: 'text',
      title: 'Кейсы — Литера.Студия',
      data: {
        back: { href: '/', label: 'Главная' },
        title: 'Кейсы',
        list: [...texts.cases]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((t) => ({ title: t.title, href: `/case/${t.slug}`, cover: t.img?.src ?? '' })),
        form: true,
      },
    };
  }
  const t = !slug && texts.pages.find((x) => x.slug === head);
  return t
    ? {
        kind: 'text',
        title: t.seo.title,
        data: { back: { href: '/', label: 'Главная' }, title: t.title, body: body(t) },
      }
    : null;
}
