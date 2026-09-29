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
        href: 'https://litera.studio/dizajn-mnogostranichnoj-produkcii',
      },
      {
        label: 'Вёрстка полиграфии',
        href: 'https://litera.studio/verstka-poligrafii',
      },
      {
        label: 'Календари',
        href: 'https://litera.studio/dizajn-kalendarya',
      },
      {
        label: 'Широкоформатная',
        href: 'https://litera.studio/dizajn-shirokoformatnoj-poligrafii',
      },
      {
        label: 'Меню и прайсы',
        href: '/dizajn-dlya-bara',
      },
      {
        label: 'Папки, печати, пластиковые карты',
        href: 'https://litera.studio/pechati-papki-plastikovye-karty',
      },
      {
        label: 'Свадебная полиграфия',
        href: 'https://litera.studio/svadebnaya-poligrafiya',
      },
      {
        label: 'Карты и настольные игры',
        href: '/karty-i-nastolnye-igry',
      },
      {
        label: 'Иллюстрации',
        href: 'https://litera.studio/illyustracii',
      },
      {
        label: 'Подготовка к печати',
        href: 'https://litera.studio/prepress',
      },
    ],
  },
  {
    title: 'Упаковка и этикетки',
    href: 'https://litera.studio/upakovka-i-etiketki',
    items: [
      {
        label: 'Кашированные коробки',
        href: 'https://litera.studio/dizajn-i-pechat-kashirovannyh-korobok-iz-zhyostkogo-kartona',
      },
      {
        label: 'Картонные коробки',
        href: 'https://litera.studio/dizajn-i-pechat-korobok-iz-kartona',
      },
      {
        label: 'Коробки из МГК',
        href: 'https://litera.studio/dizajn-i-pechat-korobok-iz-mgk',
      },
      {
        label: 'Ложементы и вставки',
        href: 'https://litera.studio/dizajn-i-pechat-korobok-s-lozhementom',
      },
      {
        label: 'Этикетки и наклейки',
        href: 'https://litera.studio/dizajn-naklejki',
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
    href: 'https://litera.studio/razrabotka-dizajna-logotipa-kompanii',
    items: [
      {
        label: 'Маскот бренда',
        href: 'https://litera.studio/razrabotka-dizajna-maskota-brenda',
      },
      {
        label: 'Брендбук и гайдлайн',
        href: 'https://litera.studio/razrabotka-brendbuka',
      },
      {
        label: 'Фирменные носители',
        href: 'https://litera.studio/dizajn-firmennyh-nositelej',
      },
      {
        label: 'Редизайн логотипа',
        href: 'https://litera.studio/redizajn-logotipa-i-firmennyh-nositelej',
      },
    ],
  },
  {
    title: 'Корпоративный брендинг',
    href: '/korporativnyj-brending-suveniry',
    items: [
      {
        label: 'Корпоративный мерч',
        href: 'https://litera.studio/korporativnyj-merch',
      },
      {
        label: 'Брендирование сувениров',
        href: 'https://litera.studio/dizajn-suvenirnoj-produkcii',
      },
      {
        label: 'Подарочные наборы',
        href: '/korporativnye-podarochnye-nabory',
      },
    ],
  },
];
