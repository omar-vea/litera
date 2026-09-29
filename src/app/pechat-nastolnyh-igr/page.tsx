import type { Metadata } from 'next';
import { nastolka as data } from '@/content/services/pechat-nastolnyh-igr';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: '/pechat-nastolnyh-igr' },
  openGraph: {
    title: data.meta.ogTitle,
    description: data.meta.ogDescription,
    url: '/pechat-nastolnyh-igr',
    images: data.meta.ogImage ? [data.meta.ogImage] : undefined,
  },
};

export default function Page() {
  return <ServiceTemplate data={data} />;
}
