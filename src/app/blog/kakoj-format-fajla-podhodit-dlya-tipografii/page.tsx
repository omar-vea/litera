import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';
import { kakojFormatFajla as data } from '@/content/articles/kakoj-format-fajla-podhodit-dlya-tipografii';

const url = `/blog/${data.slug}`;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.description,
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    title: data.metaTitle,
    description: data.description,
    url,
    images: [data.image],
  },
};

export default function Page() {
  return <ArticleTemplate data={data} />;
}
