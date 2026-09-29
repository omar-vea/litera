import type { Metadata } from 'next';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import { ContactChannels, ContactPlaces } from '@/components/blocks/Contacts';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { JsonLd } from '@/components/ui/JsonLd';

const description =
  'Литера.Студия: Москва, м. Тульская, Холодильный пер., 3к1с3. +7 495 021-35-77, zakaz@litera.studio. Как пройти, где забрать заказ, как оплатить, реквизиты.';

export const metadata: Metadata = {
  title: 'Контакты',
  description,
  alternates: { canonical: '/contacts' },
  openGraph: {
    title: `Контакты — ${site.name}`,
    description: 'Москва, м. Тульская, Холодильный пер., 3к1с3. +7 495 021-35-77, zakaz@litera.studio.',
    url: '/contacts',
    images: ['/img/contacts/office-entrance.jpg'],
  },
};

export default function ContactsPage() {
  return (
    <main className="ls-card" id="main">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Контакты', item: `${site.url}/contacts` },
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: site.name,
          url: `${site.url}/`,
          telephone: site.phone.display,
          email: site.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Москва',
            addressCountry: 'RU',
            streetAddress: 'Холодильный пер., 3к1с3, подъезд 6, этаж 2, офис 404',
            postalCode: '115191',
          },
          openingHours: 'Mo-Fr 10:00-19:00',
          hasMap: site.address.map,
        }}
      />
      <SiteHeader noHero />

      <div className="ls-body">
        <BackLink href="/" label="Главная" />
        <h1 className="ls-title">Контакты</h1>
        <p className="ls-desc">Офис у Тульской, склад у Автозаводской, тираж доставим в любой город.</p>
      </div>

      <div className="ls-rest">
        <i className="ls-rest-sentinel" aria-hidden="true" />
        <i className="ls-chat-sentinel" aria-hidden="true" />
        <ContactChannels />
        <ContactPlaces />
        <Proof />
        <LeadForm />
      </div>
    </main>
  );
}
