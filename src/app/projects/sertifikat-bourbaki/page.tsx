import type { Metadata } from 'next';
import { CaseTemplate } from '@/components/templates/CaseTemplate';
import { JsonLd } from '@/components/ui/JsonLd';
import { sertifikatBourbaki as data } from '@/content/cases/sertifikat-bourbaki';
import { site } from '@/content/site';

const url = `/projects/${data.slug}`;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.description,
  alternates: { canonical: url },
  openGraph: { title: data.title, description: data.description, url, images: [data.hero.src] },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Работы', item: `${site.url}/projects` },
            { '@type': 'ListItem', position: 3, name: data.title, item: `${site.url}${url}` },
          ],
        }}
      />
      <CaseTemplate data={data} />
    </>
  );
}
