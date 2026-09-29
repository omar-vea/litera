import type { Metadata } from 'next';
import { site } from '@/content/site';
import { blogColumns, blogTop } from '@/content/blog';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { BlogList } from '@/components/blocks/BlogList';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { JsonLd } from '@/components/ui/JsonLd';

const description =
  'Как подготовить макет к печати, чем тиснение отличается от фольги, какую коробку выбрать. Статьи из типографии.';

export const metadata: Metadata = {
  title: 'Блог',
  description,
  alternates: { canonical: '/blog' },
  openGraph: { title: `Блог — ${site.name}`, description, url: '/blog', images: ['/img/works/gift-1.jpg'] },
};

export default function BlogPage() {
  return (
    <main className="ls-card" id="main">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Блог', item: `${site.url}/blog` },
          ],
        }}
      />
      <SiteHeader noHero />
      <div className="ls-body">
        <BackLink href="/" label="Главная" />
        <h1 className="ls-title">Блог</h1>
        <p className="ls-desc">
          Как подготовить макет, чем тиснение отличается от фольги и когда заказывать календари. Пишем из
          типографии, а не из интернета.
        </p>
      </div>
      <div className="ls-rest">
        <i className="ls-rest-sentinel" aria-hidden="true" />
        <i className="ls-chat-sentinel" aria-hidden="true" />
        <BlogList top={blogTop} columns={blogColumns} />
        <Proof />
        <LeadForm />
      </div>
    </main>
  );
}
