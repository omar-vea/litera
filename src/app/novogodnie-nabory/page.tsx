import type { Metadata } from 'next';
import { naborNg as data } from '@/content/services/novogodnie-nabory';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: '/novogodnie-nabory' },
  openGraph: {
    title: data.meta.ogTitle,
    description: data.meta.ogDescription,
    url: '/novogodnie-nabory',
    images: data.meta.ogImage ? [data.meta.ogImage] : undefined,
  },
};

export default function Page() {
  return <ServiceTemplate data={data} />;
}
