/**
 * Каталог в панели меню: четыре направления и их разделы.
 * В Payload строится из коллекций `directions` и `sections`.
 * `soon` — страницы ещё нет: пункт в разметке остаётся, но не показывается.
 */

export type MenuItem = { label: string; href: string; soon?: boolean };
export type MenuGroup = { title: string; href: string; items: MenuItem[] };

export const menu: MenuGroup[] = [
  {
    title: 'Полиграфия',
    href: '/poligrafiya',
    items: [
      {
        label: 'Листовая полиграфия',
        href: '/listovaya-poligrafiya',
      },
      {
        label: 'Многостраничные издания',
        href: '/dizajn-mnogostranichnoj-produkcii',
      },
      {
        label: 'Вёрстка полиграфии',
        href: '/verstka-poligrafii',
      },
      {
        label: 'Календари',
        href: '/dizajn-kalendarya',
      },
      {
        label: 'Широкоформатная',
        href: '/dizajn-shirokoformatnoj-poligrafii',
      },
      {
        label: 'Меню и прайсы',
        href: '/dizajn-dlya-bara',
      },
      {
        label: 'Папки, печати, пластиковые карты',
        href: '/pechati-papki-plastikovye-karty',
      },
      {
        label: 'Свадебная полиграфия',
        href: '/svadebnaya-poligrafiya',
      },
      {
        label: 'Карты и настольные игры',
        href: '/karty-i-nastolnye-igry',
      },
      {
        label: 'Иллюстрации',
        href: '/illyustracii',
      },
      {
        label: 'Подготовка к печати',
        href: '/prepress',
      },
    ],
  },
  {
    title: 'Упаковка и этикетки',
    href: '/upakovka-i-etiketki',
    items: [
      {
        label: 'Кашированные коробки',
        href: '/dizajn-i-pechat-kashirovannyh-korobok-iz-zhyostkogo-kartona',
      },
      {
        label: 'Картонные коробки',
        href: '/dizajn-i-pechat-korobok-iz-kartona',
      },
      {
        label: 'Коробки из МГК',
        href: '/dizajn-i-pechat-korobok-iz-mgk',
      },
      {
        label: 'Ложементы и вставки',
        href: '/dizajn-i-pechat-korobok-s-lozhementom',
      },
      {
        label: 'Этикетки и наклейки',
        href: '/dizajn-naklejki',
      },
      {
        label: 'Упаковочные материалы',
        href: '#',
        soon: true,
      },
    ],
  },
  {
    title: 'Логотип и фирменный стиль',
    href: '/razrabotka-dizajna-logotipa-kompanii',
    items: [
      {
        label: 'Маскот бренда',
        href: '/razrabotka-dizajna-maskota-brenda',
      },
      {
        label: 'Брендбук и гайдлайн',
        href: '/razrabotka-brendbuka',
      },
      {
        label: 'Фирменные носители',
        href: '/dizajn-firmennyh-nositelej',
      },
      {
        label: 'Редизайн логотипа',
        href: '/redizajn-logotipa-i-firmennyh-nositelej',
      },
    ],
  },
  {
    title: 'Корпоративный брендинг',
    href: '/korporativnyj-brending-suveniry',
    items: [
      {
        label: 'Корпоративный мерч',
        href: '/korporativnyj-merch',
      },
      {
        label: 'Брендирование сувениров',
        href: '/dizajn-suvenirnoj-produkcii',
      },
      {
        label: 'Подарочные наборы',
        href: '/korporativnye-podarochnye-nabory',
      },
    ],
  },
];
