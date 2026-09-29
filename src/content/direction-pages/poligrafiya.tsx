import type { DirectionPage } from './types';
import { poligrafiyaWorks } from '@/content/works';

/** Сгенерировано из прототипа (_pages/poligrafiya.html), дальше правится здесь. */
export const poligrafiya: DirectionPage = {
  slug: 'poligrafiya',
  meta: {
    title: 'Полиграфия — дизайн и печать в Москве — Литера.Студия',
    description:
      'Полиграфия от визитки до каталога: 11 разделов, 84 услуги. Нарисуем макет или напечатаем ваш на своём производстве.',
    canonical: '/poligrafiya',
    ogTitle: 'Полиграфия — дизайн и печать',
    ogDescription:
      'Полиграфия от визитки до каталога: 11 разделов, 84 услуги. Нарисуем макет или напечатаем ваш на своём производстве.',
    ogImage: '/img/works/luxe-1.jpg',
  },
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: 'https://litera.studio/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Полиграфия',
          item: 'https://litera.studio/poligrafiya',
        },
      ],
    },
  ],
  back: {
    href: '/',
    label: 'Главная',
  },
  title: 'Полиграфия',
  desc: 'От визитки до каталога в твёрдом переплёте. Нарисуем макет или напечатаем ваш\u00a0— на своём производстве, с отделкой.',
  sections: [
    {
      title: 'Листовая полиграфия',
      note: 'Всё, что печатается на одном листе',
      href: '/listovaya-poligrafiya',
      count: '17 услуг',
      img: {
        src: '/img/sections/listovaya.jpg',
        w: 800,
        h: 600,
        alt: 'Открытка с золотым тиснением',
      },
    },
    {
      title: 'Многостраничные издания',
      note: 'Всё, что сшивается: каталоги, книги, брошюры',
      href: 'https://litera.studio/dizajn-mnogostranichnoj-produkcii',
      count: '11 услуг',
      img: {
        src: '/img/sections/mnogostr.jpg',
        w: 800,
        h: 600,
        alt: 'Книга в красной обложке',
      },
    },
    {
      title: 'Вёрстка полиграфии',
      note: 'Ваш текст и картинки\u00a0— в макет под печать',
      href: 'https://litera.studio/verstka-poligrafii',
      count: '16 услуг',
      img: {
        src: '/img/sections/verstka.jpg',
        w: 800,
        h: 600,
        alt: 'Открытка к 23 февраля с объёмной звездой',
      },
    },
    {
      title: 'Календари',
      note: 'Настенные, настольные, карманные и адвент',
      href: 'https://litera.studio/dizajn-kalendarya',
      count: '6 услуг',
      img: {
        src: '/img/sections/kalendari.jpg',
        w: 800,
        h: 600,
        alt: 'Настольный календарь на подставке',
      },
    },
    {
      title: 'Широкоформатная',
      note: 'Крупный формат: стены, витрины, мероприятия',
      href: 'https://litera.studio/dizajn-shirokoformatnoj-poligrafii',
      count: '6 услуг',
      img: {
        src: '/img/sections/shirokoformat.jpg',
        w: 800,
        h: 600,
        alt: 'Рекламный щит агентства',
      },
    },
    {
      title: 'Меню и прайсы',
      note: 'Для кафе, баров и салонов красоты',
      href: '/dizajn-dlya-bara',
      count: '6 услуг',
      img: {
        src: '/img/sections/menu.jpg',
        w: 800,
        h: 600,
        alt: 'Меню ресторана с золотым тиснением',
      },
    },
    {
      title: 'Папки, печати, пластиковые карты',
      note: 'Офисная оснастка и карты для клиентов',
      href: 'https://litera.studio/pechati-papki-plastikovye-karty',
      count: '6 услуг',
      img: {
        src: '/img/sections/papki.jpg',
        w: 800,
        h: 600,
        alt: 'Папка с узором из овощей',
      },
    },
    {
      title: 'Свадебная полиграфия',
      note: 'Приглашения, рассадка, конверты\u00a0— в одном стиле',
      href: 'https://litera.studio/svadebnaya-poligrafiya',
      count: '5 услуг',
      img: {
        src: '/img/sections/svadba.jpg',
        w: 800,
        h: 600,
        alt: 'Свадебное приглашение с объёмной вырубкой',
      },
    },
    {
      title: 'Карты и настольные игры',
      note: 'Колоды, Таро, игры с полем и фишками',
      href: '/karty-i-nastolnye-igry',
      count: '4 услуги',
      img: {
        src: '/img/sections/igry.jpg',
        w: 800,
        h: 600,
        alt: 'Колода карт в коробке',
      },
    },
    {
      title: 'Иллюстрации',
      note: 'Рисунок под печать и упаковку',
      href: 'https://litera.studio/illyustracii',
      count: '4 услуги',
      img: {
        src: '/img/sections/illyustracii.jpg',
        w: 800,
        h: 600,
        alt: 'Иллюстрация — персонаж в очках',
      },
    },
    {
      title: 'Подготовка к печати',
      note: 'Проверка чужого макета перед тиражом',
      href: 'https://litera.studio/prepress',
      count: '3 услуги',
      img: {
        src: '/img/sections/prepress.jpg',
        w: 800,
        h: 600,
        alt: 'Визитки на тёмном картоне',
      },
    },
  ],
  works: poligrafiyaWorks,
  about: {
    title: 'О полиграфии',
    lead: (
      <>
        <p>
          Полиграфия у нас&nbsp;— это дизайн и печать в одном месте. Макет рисует дизайнер студии, печатает
          своё производство в Москве, поэтому за результат отвечает одна команда: не бывает «дизайнер сделал,
          а типография испортила». Если макет уже есть, проверим его и напечатаем как есть.
        </p>
      </>
    ),
    more: (
      <>
        <p>
          Печатаем цифровым способом: это выгодно на тиражах от десятков до нескольких тысяч, а именно такие и
          заказывают чаще всего&nbsp;— половина заявок у нас до ста штук. Отделка своя: тиснение фольгой,
          объёмный лак, шёлковая и матовая ламинация, вырубка, скругление углов, нумерация. Она делает из
          обычной листовки или визитки вещь, которую хочется взять в руки, и добавляет день-два к сроку.
        </p>
        <p>
          Что выбрать, подскажем по задаче: под знакомство&nbsp;— визитки и папки, под событие&nbsp;—
          приглашения и сертификаты, под продажи&nbsp;— меню, прайсы и каталоги, под подарок&nbsp;— календари
          и открытки. Перед тиражом покажем распечатку, чтобы цвет на бумаге не оказался сюрпризом, а тираж
          доставим или отдадим в офисе на Тульской.
        </p>
      </>
    ),
  },
};
