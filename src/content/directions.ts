/**
 * Четыре направления каталога. Одни и те же пункты на главной («Что делаем»),
 * в «Других направлениях» на странице направления, в футере и в меню.
 * В Payload — коллекция `directions`; счёт услуг считается по опубликованным
 * услугам, здесь он вписан до подключения CMS.
 */

export type Direction = {
  slug: 'poligrafiya' | 'upakovka' | 'logotip' | 'brending';
  num: string;
  title: string;
  note: string;
  count: string;
  href: string;
  shot: { src: string; alt: string };
};

export const directions: Direction[] = [
  {
    slug: 'poligrafiya',
    num: '01',
    title: 'Полиграфия',
    count: '84 услуги',
    note: 'Визитки, открытки, сертификаты, каталоги, бланки',
    href: '/poligrafiya',
    shot: {
      src: '/img/dirs/poligrafiya-set.jpg',
      alt: 'Фирменный набор на хлопковой бумаге: бланк с номером, конверт, визитки и папка с синим корешком, знак вытиснен вслепую',
    },
  },
  {
    slug: 'upakovka',
    num: '02',
    title: 'Упаковка и этикетки',
    count: '56 услуг',
    note: 'Коробки, пакеты, этикетки, подарочные наборы',
    href: '/upakovka-i-etiketki',
    shot: {
      src: '/img/dirs/upakovka-set.jpg',
      alt: 'Упаковка: пакет, коробка с наклейкой и бейдж, знак вытиснен вслепую, розовый акцент',
    },
  },
  {
    slug: 'logotip',
    num: '03',
    title: 'Логотип и фирменный стиль',
    count: '9 услуг',
    note: 'Знак, гайдлайн, носители, макеты под печать',
    href: '/razrabotka-dizajna-logotipa-kompanii',
    shot: {
      src: '/img/dirs/logotip-set.jpg',
      alt: 'Разворот гайдлайна с построением знака, эскизы, визитки, бирка и значок, лаймовый акцент',
    },
  },
  {
    slug: 'brending',
    num: '04',
    title: 'Корпоративный брендинг',
    count: '25 услуг',
    note: 'Мерч, обвесы, оформление событий и офисов',
    href: '/korporativnyj-brending-suveniry',
    shot: {
      src: '/img/dirs/brending-set.jpg',
      alt: 'Корпоративный набор: коробка, блокнот, кружка, значок, бирки и обвесы на шнурке, жёлтый акцент',
    },
  },
];

export const directionsTotal = '174 услуги';
