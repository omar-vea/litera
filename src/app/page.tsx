import Image from 'next/image';
import type { Metadata } from 'next';
import { site } from '@/content/site';
import { homeWorks } from '@/content/works';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Directions } from '@/components/blocks/Directions';
import { Messengers } from '@/components/blocks/Messengers';
import { Works } from '@/components/blocks/Works';
import { HowWeWork } from '@/components/blocks/HowWeWork';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { JsonLd } from '@/components/ui/JsonLd';
import './home.css';
import './small-runs.css';

export const metadata: Metadata = {
  title: { absolute: `${site.name} — дизайн и печать в Москве` },
  description:
    'Дизайн-студия со своей типографией в Москве: полиграфия, упаковка, логотипы и фирменный стиль, корпоративный брендинг. Нарисуем макет и напечатаем тираж.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${site.name} — дизайн и печать в Москве`,
    description:
      'Дизайн-студия со своей типографией: полиграфия, упаковка, логотипы, корпоративный брендинг.',
    url: '/',
    images: ['/img/home-hero.jpg'],
  },
};

// Заявки с сайта: люди приходят с малыми тиражами и боятся, что их не возьмут.
const smallRuns = [
  {
    quote:
      'Сможете ли вы изготовить коробки малым тиражом? Коробка желательно с окном, размер 30×30×15\u00a0см, тираж 35\u00a0шт.',
    when: 'Заявка с сайта, сентябрь 2025',
  },
  {
    quote:
      'Хотели бы под корпоративный стиль в новогоднем дизайне разработать настольную игру для партнёров в качестве подарка. Тираж\u00a0— 50\u00a0шт.',
    when: 'Заявка с сайта, август 2024',
  },
  {
    quote: 'Сориентируйте, пожалуйста, сможете ли вы сделать суперобложку для книг? Тираж: 50\u00a0шт.',
    when: 'Заявка с сайта, ноябрь 2025',
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD вне <main>: внутри он сбивает правила :first-child/:last-child */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          url: `${site.url}/`,
          telephone: site.phone.display,
          email: site.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Москва',
            addressCountry: 'RU',
            streetAddress: 'Холодильный пер., 3к1с3',
          },
        }}
      />
      <main className="ls-card" id="main">
        <SiteHeader />

        <div className="ls-home-lead">
          <figure className="ls-hero ls-home-hero">
            <Image
              src="/img/home-hero.jpg"
              width={1430}
              height={830}
              priority
              sizes="100vw"
              alt="Белая полиграфия и упаковка на чёрном: тиснение знака, перфорация, крашеный обрез, коробка с лентой"
            />
          </figure>
          <section className="ls-home-head">
            <h1 className="ls-title">Дизайн-студия со своей типографией</h1>
            <p className="ls-desc">
              Рисуем макет и печатаем тираж в Москве, без посредников. Посчитаем под ваш тираж и срок.
            </p>
            <div className="ls-cta">
              <a className="ls-btn ls-btn-main" href="#zayavka">
                Обсудить задачу
              </a>
            </div>
            <Messengers />
          </section>
        </div>

        <div className="ls-rest">
          <i className="ls-rest-sentinel" aria-hidden="true" />
          <i className="ls-body-sentinel ls-chat-sentinel" aria-hidden="true" />

          <Directions>
            <p className="ls-dirs-else">
              Не нашли своё&nbsp;— всё равно напишите. К нам приходят с колодой Таро, суперобложкой для книги
              и настольной игрой. <a href="#zayavka">Опишите задачу</a>&nbsp;— разберёмся.
            </p>
          </Directions>

          <section className="ls-small">
            <span className="ls-small-num" aria-hidden="true">
              ½
            </span>
            <h2>Половина заказов у нас&nbsp;— до ста штук</h2>
            <p>
              Возьмёмся и за тридцать. Дизайн на таком тираже стоит дороже печати, поэтому считаем прежде
              всего работу студии, а бумагу и станки подбираем под неё.
            </p>
            <ul className="ls-small-ex">
              {smallRuns.map((r) => (
                <li key={r.when}>
                  <svg
                    className="ls-small-ico"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="1.5" y="4" width="17" height="12" rx="1.5" />
                    <path d="M2 5l8 6 8-6" />
                  </svg>
                  <div>
                    <q>{r.quote}</q>
                    <span>{r.when}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <Works set={homeWorks} />
          <HowWeWork />
          <Proof />
          <LeadForm />
        </div>
      </main>
    </>
  );
}
