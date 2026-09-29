import type { Metadata } from 'next';
import { sertifikat as data } from '@/content/services/dizajn-sertifikata';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: '/dizajn-sertifikata' },
  openGraph: {
    title: data.meta.ogTitle,
    description: data.meta.ogDescription,
    url: '/dizajn-sertifikata',
    images: data.meta.ogImage ? [data.meta.ogImage] : undefined,
  },
};

export default function Page() {
  return <ServiceTemplate data={data} />;
}
