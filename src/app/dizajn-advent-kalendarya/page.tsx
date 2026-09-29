import type { Metadata } from 'next';
import { advent as data } from '@/content/services/dizajn-advent-kalendarya';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: '/dizajn-advent-kalendarya' },
  openGraph: {
    title: data.meta.ogTitle,
    description: data.meta.ogDescription,
    url: '/dizajn-advent-kalendarya',
    images: data.meta.ogImage ? [data.meta.ogImage] : undefined,
  },
};

export default function Page() {
  return <ServiceTemplate data={data} />;
}
