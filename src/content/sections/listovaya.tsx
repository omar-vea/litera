import type { SectionPage } from './types';
import { listovayaWorks } from '@/content/works';

/** Сгенерировано из прототипа (_pages/category.html), дальше правится здесь. */
export const listovaya: SectionPage = {
  slug: 'listovaya',
  dir: 'poligrafiya',
  meta: {
    title: 'Листовая полиграфия — Литера.Студия',
    description:
      'Дизайн и печать листовой полиграфии: визитки, открытки, сертификаты, приглашения. 17 услуг.',
    canonical: '/listovaya-poligrafiya',
    ogTitle: 'Листовая полиграфия — дизайн и печать',
    ogDescription:
      'Дизайн и печать листовой полиграфии: визитки, открытки, сертификаты, приглашения. 17 услуг.',
    ogImage: '/img/p1.jpg',
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
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Листовая полиграфия',
          item: 'https://litera.studio/listovaya-poligrafiya',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Листовая полиграфия',
      url: 'https://litera.studio/listovaya-poligrafiya',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: 17,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Визитки',
            url: 'https://litera.studio/dizajn-vizitki',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Фирменные бланки',
            url: 'https://litera.studio/dizajn-blanka',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Конверты',
            url: 'https://litera.studio/dizajn-konverta',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Кубарики',
            url: 'https://litera.studio/dizajn-kubarika',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Приглашения',
            url: 'https://litera.studio/dizajn-priglasheniya',
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Билеты',
            url: 'https://litera.studio/dizajn-bileta',
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Бейджи',
            url: 'https://litera.studio/dizajn-bejdzha',
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'Дипломы',
            url: 'https://litera.studio/dizajn-diploma',
          },
          {
            '@type': 'ListItem',
            position: 9,
            name: 'Грамоты',
            url: 'https://litera.studio/dizajn-gramoty',
          },
          {
            '@type': 'ListItem',
            position: 10,
            name: 'Листовки',
            url: 'https://litera.studio/dizajn-listovki',
          },
          {
            '@type': 'ListItem',
            position: 11,
            name: 'Флаеры',
            url: 'https://litera.studio/dizajn-flaera',
          },
          {
            '@type': 'ListItem',
            position: 12,
            name: 'Буклеты и лифлеты',
            url: 'https://litera.studio/dizajn-bukleta-lifleta',
          },
          {
            '@type': 'ListItem',
            position: 13,
            name: 'Бирки',
            url: 'https://litera.studio/dizajn-birki',
          },
          {
            '@type': 'ListItem',
            position: 14,
            name: 'Подарочные сертификаты',
            url: 'https://litera.studio/dizajn-sertifikata',
          },
          {
            '@type': 'ListItem',
            position: 15,
            name: 'Сертификаты для салонов',
            url: 'https://litera.studio/dizajn-sertifikata-dlya-salona-krasoty',
          },
          {
            '@type': 'ListItem',
            position: 16,
            name: 'Абонементы',
            url: 'https://litera.studio/dizajn-abonementov',
          },
          {
            '@type': 'ListItem',
            position: 17,
            name: 'Открытки',
            url: 'https://litera.studio/dizajn-otkrytki',
          },
        ],
      },
    },
  ],
  back: {
    href: '/poligrafiya',
    label: 'Полиграфия',
  },
  title: 'Листовая полиграфия',
  desc: 'Всё, что печатается на одном листе: от визитки до наградного диплома. Нарисуем макет или напечатаем ваш.',
  catalog: [
    [
      {
        title: 'Офис и знакомство',
        items: [
          {
            title: 'Визитки',
            note: 'Классика знакомства: плотный картон, тиснение, скругление углов',
            href: '/dizajn-vizitki',
            img: {
              src: '/img/services/vizitki.jpg',
              w: 416,
              h: 416,
              alt: 'Визитки с блинтовым тиснением',
            },
            eager: true,
          },
          {
            title: 'Фирменные бланки',
            note: 'Для писем и договоров, с реквизитами и логотипом',
            href: 'https://litera.studio/dizajn-blanka',
            img: {
              src: '/img/services/blanki.jpg',
              w: 416,
              h: 416,
              alt: 'Фирменный бланк с логотипом',
            },
            eager: true,
          },
          {
            title: 'Конверты',
            note: 'Под сертификат, приглашение или документы',
            href: 'https://litera.studio/dizajn-konverta',
            img: {
              src: '/img/services/konverty.jpg',
              w: 416,
              h: 416,
              alt: 'Конверты с фирменным дизайном',
            },
            eager: true,
          },
          {
            title: 'Кубарики',
            note: 'Блок для записей с логотипом, склеенный или в подставке',
            href: 'https://litera.studio/dizajn-kubarika',
          },
        ],
      },
      {
        title: 'События',
        items: [
          {
            title: 'Приглашения',
            note: 'Свадьба, открытие, корпоратив\u00a0— от простых до конвертов с вкладышами',
            href: 'https://litera.studio/dizajn-priglasheniya',
            img: {
              src: '/img/services/priglasheniya.jpg',
              w: 416,
              h: 416,
              alt: 'Приглашения на плотной бумаге',
            },
          },
          {
            title: 'Билеты',
            note: 'С нумерацией, отрывным корешком и защитой от подделки',
            href: 'https://litera.studio/dizajn-bileta',
          },
          {
            title: 'Бейджи',
            note: 'Для мероприятий и персонала, с держателем или лентой',
            href: 'https://litera.studio/dizajn-bejdzha',
            img: {
              src: '/img/services/bejdzhi.jpg',
              w: 416,
              h: 416,
              alt: 'Бейдж на ленте',
            },
          },
          {
            title: 'Дипломы',
            note: 'Для курсов, конкурсов и внутренних наград',
            href: 'https://litera.studio/dizajn-diploma',
            img: {
              src: '/img/services/diplomy.jpg',
              w: 416,
              h: 416,
              alt: 'Благодарность на чёрной бумаге',
            },
          },
          {
            title: 'Грамоты',
            note: 'Наградные бланки на плотной бумаге, с фольгой или тиснением',
            href: 'https://litera.studio/dizajn-gramoty',
            img: {
              src: '/img/services/gramoty.jpg',
              w: 416,
              h: 416,
              alt: 'Грамота на плотной бумаге',
            },
          },
        ],
      },
    ],
    [
      {
        title: 'Раздача и торговля',
        items: [
          {
            title: 'Листовки',
            note: 'Раздаточный тираж: акция, открытие, распродажа',
            href: 'https://litera.studio/dizajn-listovki',
            img: {
              src: '/img/services/listovki.jpg',
              w: 416,
              h: 416,
              alt: 'Листовка ювелирного бренда',
            },
          },
          {
            title: 'Флаеры',
            note: 'Небольшой формат под раздачу и вложение',
            href: 'https://litera.studio/dizajn-flaera',
            img: {
              src: '/img/services/flaery.jpg',
              w: 416,
              h: 416,
              alt: 'Флаер с акцией',
            },
          },
          {
            title: 'Буклеты и лифлеты',
            note: 'Сложение в два-три фальца, под каталог услуг или инструкцию',
            href: 'https://litera.studio/dizajn-bukleta-lifleta',
            img: {
              src: '/img/services/buklety.jpg',
              w: 416,
              h: 416,
              alt: 'Буклеты с фигурной вырубкой',
            },
          },
          {
            title: 'Бирки',
            note: 'На товар и упаковку, с отверстием под шнур',
            href: 'https://litera.studio/dizajn-birki',
            img: {
              src: '/img/services/birki.jpg',
              w: 416,
              h: 416,
              alt: 'Бирка на рубашке',
            },
          },
        ],
      },
      {
        title: 'Подарки',
        items: [
          {
            title: 'Подарочные сертификаты',
            note: 'Номинал, нумерация, срок действия\u00a0— деньги вперёд услуги',
            href: '/dizajn-sertifikata',
            img: {
              src: '/img/services/sertifikaty.jpg',
              w: 416,
              h: 416,
              alt: 'Подарочный сертификат BOURBAKI в конверте',
            },
          },
          {
            title: 'Сертификаты для салонов',
            note: 'Отраслевой вариант: под процедуры и абонементы',
            href: 'https://litera.studio/dizajn-sertifikata-dlya-salona-krasoty',
            img: {
              src: '/img/services/salon.jpg',
              w: 416,
              h: 416,
              alt: 'Сертификат салона красоты на дизайнерской бумаге',
            },
          },
          {
            title: 'Абонементы',
            note: 'На занятия и услуги, с отрывными купонами',
            href: 'https://litera.studio/dizajn-abonementov',
            img: {
              src: '/img/services/abonementy.jpg',
              w: 416,
              h: 416,
              alt: 'Стопка абонементов',
            },
          },
          {
            title: 'Открытки',
            note: 'К празднику и к заказу\u00a0— с конвертом или отдельно',
            href: 'https://litera.studio/dizajn-otkrytki',
            img: {
              src: '/img/services/otkrytki.jpg',
              w: 416,
              h: 416,
              alt: 'Открытка с яркой печатью',
            },
          },
        ],
      },
    ],
  ],
  choose: {
    title: 'Что выбрать под задачу',
    items: [
      {
        q: 'Бейдж или бирка',
        a: (
          <>
            <p>
              Бейдж носит человек&nbsp;— на ленте или клипсе, с именем и должностью. Бирка вешается на товар:
              состав, размер, цена, отверстие под шнур.
            </p>
            <p className="ls-qa-links">
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-bejdzha">
                Бейджи
              </a>
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-birki">
                Бирки
              </a>
            </p>
          </>
        ),
      },
      {
        q: 'Листовка или флаер',
        a: (
          <>
            <p>
              Листовка крупнее, обычно А5 или А6, и на ней помещается текст: условия акции, адреса, схема
              проезда. Флаер меньше и рассчитан на раздачу в руки&nbsp;— одна мысль, один призыв.
            </p>
            <p className="ls-qa-links">
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-listovki">
                Листовки
              </a>
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-flaera">
                Флаеры
              </a>
            </p>
          </>
        ),
      },
      {
        q: 'Буклет или лифлет',
        a: (
          <>
            <p>
              Разница в сложении: у буклета один сгиб, у лифлета два и больше. Чем больше сгибов, тем больше
              блоков текста помещается, но тем аккуратнее нужна вёрстка.
            </p>
            <p className="ls-qa-links">
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-bukleta-lifleta">
                Буклеты и лифлеты
              </a>
            </p>
          </>
        ),
      },
      {
        q: 'Диплом или грамота',
        a: (
          <>
            <p>
              Диплом выдают за пройденный курс или занятое место, грамоту&nbsp;— за заслугу или достижение. На
              печати разницы нет, отличается только текст и вёрстка.
            </p>
            <p className="ls-qa-links">
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-diploma">
                Дипломы
              </a>
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-gramoty">
                Грамоты
              </a>
            </p>
          </>
        ),
      },
      {
        q: 'Сертификат или абонемент',
        a: (
          <>
            <p>
              Сертификат на сумму: человек тратит номинал, как хочет. Абонемент на количество: восемь занятий,
              пять процедур. Абонементу нужны отрывные купоны или поле для отметок.
            </p>
            <p className="ls-qa-links">
              <a className="ls-btn ls-btn-line ls-btn-xs" href="/dizajn-sertifikata">
                Сертификаты
              </a>
              <a className="ls-btn ls-btn-line ls-btn-xs" href="https://litera.studio/dizajn-abonementov">
                Абонементы
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  works: listovayaWorks,
  about: {
    title: 'О листовой полиграфии',
    lead: (
      <>
        <p>
          Листовая полиграфия&nbsp;— всё, что печатается на одном листе и не требует сшивки: визитки,
          листовки, открытки, сертификаты, бланки, дипломы. Тираж такой продукции делается быстро, поэтому её
          берут под срок: к открытию, к празднику, к выставке.
        </p>
      </>
    ),
    more: (
      <>
        <p>
          Цена зависит от трёх вещей. Первая&nbsp;— бумага: дизайнерская с фактурой стоит дороже мелованной,
          но и выглядит иначе. Вторая&nbsp;— тираж: подготовка стоит одинаково и на пятидесяти экземплярах, и
          на тысяче, поэтому за штуку большой тираж выходит заметно дешевле. Третья&nbsp;— отделка: тиснение
          фольгой, ламинация, скругление углов, нумерация. Отделка добавляет и стоимость, и день-два к сроку.
        </p>
        <p>
          Если макет уже есть, мы проверим его перед печатью и скажем, что поправить: вылеты, цветовой
          профиль, шрифты в кривых. Если макета нет&nbsp;— нарисуем с нуля и покажем распечатку до тиража,
          чтобы цвет не оказался сюрпризом.
        </p>
      </>
    ),
  },
  related: {
    title: 'Ещё в полиграфии',
    all: {
      href: '/poligrafiya',
      label: 'Все разделы',
    },
    items: [
      {
        title: 'Карты и настольные игры',
        note: 'Игры, колоды, поля, фишки и правила',
        href: '/karty-i-nastolnye-igry',
        img: {
          src: '/img/igry/nastolka.jpg',
          alt: 'Коробка настольной игры',
        },
      },
      {
        title: 'Меню и прайсы',
        note: 'Для кафе, баров и салонов: обложки, вкладыши, планшеты',
        href: '/dizajn-dlya-bara',
        img: {
          src: '/img/menu/menu-tile.jpg',
          alt: 'Меню кофейни в плотной обложке',
        },
      },
    ],
  },
};
