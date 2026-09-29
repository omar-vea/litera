import type { Metadata } from 'next';
import { vizitki as data } from '@/content/services/dizajn-vizitki';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: '/dizajn-vizitki' },
  openGraph: {
    title: data.meta.ogTitle,
    description: data.meta.ogDescription,
    url: '/dizajn-vizitki',
    images: data.meta.ogImage ? [data.meta.ogImage] : undefined,
  },
};

export default function Page() {
  return <ServiceTemplate data={data} />;
}
