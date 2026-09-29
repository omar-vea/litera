/**
 * Работы и ролики по страницам. В Payload — коллекция `works` с тегами
 * услуги и направления; блок на странице выбирает по тегу: минимум три
 * работы (меньше — блок скрыт), максимум по месту.
 */

export type Shot = { src: string; w: number; h: number; alt: string };
export type Work = { title: string; tags: string; href: string; shots: Shot[] };
export type Short = { href: string; video: string; poster: string; alt: string };
export type WorksSet = {
  title: string;
  works: Work[];
  shorts: Short[];
  more: { href: string; label: string };
};

export const adventWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Календарь с дверцами на 31 день',
      tags: 'Корпоративный подарок · кашировка, вырубка дверец',
      href: '/projects',
      shots: [
        {
          src: '/img/advent/w-ny-1.jpg',
          w: 900,
          h: 600,
          alt: 'Закрытый зелёный адвент-календарь с гирляндой и шарами на створках',
        },
        {
          src: '/img/advent/w-ny-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/advent/w-ny-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Шкатулка с ящичками FIRDAWS',
      tags: 'Мода · тиснение, лента, ящички под размер',
      href: '/projects',
      shots: [
        {
          src: '/img/advent/w-firdaws.jpg',
          w: 900,
          h: 600,
          alt: 'Шкатулка FIRDAWS с выдвижными ящичками двух оттенков коричневого',
        },
      ],
    },
    {
      title: 'Коробка с окошком CHOCOhunter',
      tags: 'Шоколад · картон, окошко-шкала',
      href: '/projects',
      shots: [
        {
          src: '/img/advent/w-choco.jpg',
          w: 900,
          h: 600,
          alt: 'Картонные коробки CHOCOhunter с окошком и стопкой шоколадок рядом',
        },
      ],
    },
  ],
  shorts: [],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};

export const caseBourbakiWorks: WorksSet = {
  title: 'Ещё работы',
  works: [
    {
      title: 'Сертификаты в конвертах',
      tags: 'Ресторан · конверт под формат',
      href: '/projects/sertifikat-bourbaki',
      shots: [
        {
          src: '/img/p1.jpg',
          w: 900,
          h: 457,
          alt: 'Сертификаты в конвертах',
        },
      ],
    },
    {
      title: 'Сертификаты с QR-кодом',
      tags: 'Фитнес-студия · QR и сквозной номер',
      href: '/projects/sertifikat-bourbaki',
      shots: [
        {
          src: '/img/p5.jpg',
          w: 900,
          h: 457,
          alt: 'Сертификаты с QR-кодом',
        },
      ],
    },
  ],
  shorts: [],
  more: {
    href: '/projects?dir=poligrafiya&prod=Абонементы и сертификаты',
    label: 'Все сертификаты',
  },
};

export const listovayaWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Визитки Woodberry Beauty',
      tags: 'Салон красоты · плотный картон, узор на обороте',
      href: '/projects',
      shots: [
        {
          src: '/img/works/woodberry-1.jpg',
          w: 900,
          h: 600,
          alt: 'Визитки Woodberry Beauty: белая лицевая сторона и оборот с узором',
        },
        {
          src: '/img/works/woodberry-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/woodberry-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Приглашение на премию в туризме',
      tags: 'Событие · фольга, конверт, объёмная вклейка',
      href: '/projects',
      shots: [
        {
          src: '/img/works/premia-1.jpg',
          w: 900,
          h: 600,
          alt: 'Чёрное приглашение с золотой фольгой и раскладным силуэтом Москвы',
        },
        {
          src: '/img/works/premia-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/premia-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Буклеты Intourist',
      tags: 'Туризм · фигурная вырубка, лифлет',
      href: '/projects',
      shots: [
        {
          src: '/img/works/intourist-1.jpg',
          w: 900,
          h: 600,
          alt: 'Буклеты Intourist с фигурной вырубкой по верхнему краю',
        },
        {
          src: '/img/works/intourist-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/intourist-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Сертификат BOURBAKI',
      tags: 'Мода · тиснение фольгой, конверт',
      href: '/projects/sertifikat-bourbaki',
      shots: [
        {
          src: '/img/works/bourbaki-1.jpg',
          w: 900,
          h: 600,
          alt: 'Подарочный сертификат BOURBAKI в конверте с золотой рамкой',
        },
        {
          src: '/img/works/bourbaki-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/bourbaki-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
  ],
  shorts: [
    {
      href: 'https://vk.com/video191195025_456239176',
      video: '191195025_456239176',
      poster: '/img/shorts/v1.jpg',
      alt: 'Печать подарочных сертификатов',
    },
    {
      href: 'https://vk.com/video191195025_456239214',
      video: '191195025_456239214',
      poster: '/img/shorts/v2.jpg',
      alt: 'Сертификаты с тиснением, крупный план',
    },
    {
      href: 'https://vk.com/video191195025_456239129',
      video: '191195025_456239129',
      poster: '/img/shorts/v3.jpg',
      alt: 'Готовый тираж сертификатов',
    },
  ],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};

export const igryWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Настольная игра LifeSync',
      tags: 'Ритейл · кашировка, коробка-пенал',
      href: '/projects',
      shots: [
        {
          src: '/img/works/lifesync-igra-1.jpg',
          w: 900,
          h: 600,
          alt: 'Белая коробка настольной игры LifeSync с карточками',
        },
        {
          src: '/img/works/lifesync-igra-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/lifesync-igra-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Колода по вселенной «Дюны»',
      tags: 'Премиальная колода · окрашенный торец, акрил',
      href: '/projects',
      shots: [
        {
          src: '/img/works/duna-1.jpg',
          w: 900,
          h: 600,
          alt: 'Колода по вселенной «Дюны» с коробкой и акриловой картой',
        },
        {
          src: '/img/works/duna-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/duna-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Колода Таро Уэйта',
      tags: '78 арканов · объёмная фольга',
      href: '/projects',
      shots: [
        {
          src: '/img/works/taro-ueyta-1.jpg',
          w: 900,
          h: 600,
          alt: 'Колода Таро Уэйта с голографической фольгой на чёрном',
        },
        {
          src: '/img/works/taro-ueyta-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/taro-ueyta-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Настольная игра «Газполия»',
      tags: 'Корпоративный подарок · поле, коробка, карты',
      href: '/projects',
      shots: [
        {
          src: '/img/works/gazpolia-1.jpg',
          w: 900,
          h: 600,
          alt: 'Игровое поле «Газполия» с карточками и коробкой',
        },
        {
          src: '/img/works/gazpolia-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/gazpolia-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
  ],
  shorts: [],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};

export const homeWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Каталог LUXE CITY',
      tags: 'Полиграфия · твёрдый переплёт, выборочный лак',
      href: '/projects',
      shots: [
        {
          src: '/img/works/luxe-1.jpg',
          w: 900,
          h: 600,
          alt: 'Каталог LUXE CITY: чёрная обложка с выборочным лаком и разворот с интерьерами',
        },
        {
          src: '/img/works/luxe-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/luxe-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Коробка для премиального подарка',
      tags: 'Упаковка · кашировка, объёмная фольга',
      href: '/projects',
      shots: [
        {
          src: '/img/works/gift-1.jpg',
          w: 900,
          h: 600,
          alt: 'Кашированная коробка с золотой фольгой на синем фоне',
        },
        {
          src: '/img/works/gift-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/gift-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Фирменный стиль «Любимая кружка»',
      tags: 'Логотип и фирменный стиль · маскот, гайдлайн',
      href: '/projects',
      shots: [
        {
          src: '/img/works/kruzhka-1.jpg',
          w: 900,
          h: 600,
          alt: 'Разворот гайдлайна кофейни «Любимая кружка» с маскотом',
        },
        {
          src: '/img/works/kruzhka-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/kruzhka-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Бизнес-набор «Амбар»',
      tags: 'Корпоративный брендинг · шоппер, блокнот, паттерн',
      href: '/projects',
      shots: [
        {
          src: '/img/works/ambar-1.jpg',
          w: 900,
          h: 600,
          alt: 'Холщовый шоппер и блокнот с паттерном из логотипов «Амбар»',
        },
        {
          src: '/img/works/ambar-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/ambar-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
  ],
  shorts: [
    {
      href: 'https://vk.com/video191195025_456239176',
      video: '191195025_456239176',
      poster: '/img/shorts/v1.jpg',
      alt: 'Печать подарочных сертификатов',
    },
    {
      href: 'https://vk.com/video191195025_456239214',
      video: '191195025_456239214',
      poster: '/img/shorts/v2.jpg',
      alt: 'Сертификаты с тиснением, крупный план',
    },
    {
      href: 'https://vk.com/video191195025_456239129',
      video: '191195025_456239129',
      poster: '/img/shorts/v3.jpg',
      alt: 'Готовый тираж сертификатов',
    },
  ],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};

export const menuPraysWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Премиальное меню для ресторана',
      tags: 'Рестораны · твёрдый переплёт, фольга',
      href: '/projects',
      shots: [
        {
          src: '/img/works/opera-menu-1.jpg',
          w: 900,
          h: 600,
          alt: 'Чёрное меню ресторана с золотой фольгой',
        },
        {
          src: '/img/works/opera-menu-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/opera-menu-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Меню для ресторана «Ohana»',
      tags: 'Рестораны · сменные листы на болтах',
      href: '/projects',
      shots: [
        {
          src: '/img/works/ohana-1.jpg',
          w: 900,
          h: 600,
          alt: 'Фиолетовое меню Ohana на столе',
        },
        {
          src: '/img/works/ohana-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/ohana-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Прайс для салона «SalvaDali»',
      tags: 'Салон красоты · кашировка, ламинация',
      href: '/projects',
      shots: [
        {
          src: '/img/works/salvadali-1.jpg',
          w: 900,
          h: 600,
          alt: 'Прайс салона SalvaDali в твёрдой обложке',
        },
        {
          src: '/img/works/salvadali-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/salvadali-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Меню с блинтовым тиснением',
      tags: 'Рестораны · блинт, кашировка',
      href: '/projects',
      shots: [
        {
          src: '/img/works/blint-menu-1.jpg',
          w: 900,
          h: 600,
          alt: 'Оранжевое меню с блинтовым тиснением знака',
        },
        {
          src: '/img/works/blint-menu-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/blint-menu-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
  ],
  shorts: [],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};

export const naboryWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Коробка к 30-летию «Аресбанка»',
      tags: 'Банк · объёмная фольга, ложемент',
      href: '/projects',
      shots: [
        {
          src: '/img/works/aresbank-1.jpg',
          w: 900,
          h: 600,
          alt: 'Чёрная коробка к 30-летию Аресбанка с золотой фольгой',
        },
        {
          src: '/img/works/aresbank-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/aresbank-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Набор к 23 Февраля',
      tags: 'Корпоративный подарок · кашировка, фольга',
      href: '/projects',
      shots: [
        {
          src: '/img/works/23-fevralya-1.jpg',
          w: 900,
          h: 600,
          alt: 'Коричневая коробка набора к 23 Февраля',
        },
        {
          src: '/img/works/23-fevralya-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/23-fevralya-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Набор к 8 Марта',
      tags: 'Корпоративный подарок · фольга, открытка',
      href: '/projects',
      shots: [
        {
          src: '/img/works/8-marta-1.jpg',
          w: 900,
          h: 600,
          alt: 'Коробка набора к 8 Марта с открыткой',
        },
        {
          src: '/img/works/8-marta-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/8-marta-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Набор к 8 Марта для «Модум-Транс»',
      tags: 'Логистика · коробка с ручкой, текстиль',
      href: '/projects',
      shots: [
        {
          src: '/img/works/modum-8-marta-1.jpg',
          w: 900,
          h: 600,
          alt: 'Голубая коробка с текстилем и открыткой к 8 Марта',
        },
        {
          src: '/img/works/modum-8-marta-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/modum-8-marta-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
  ],
  shorts: [],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};

export const poligrafiyaWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Каталог LUXE CITY',
      tags: 'Полиграфия · твёрдый переплёт, выборочный лак',
      href: '/projects',
      shots: [
        {
          src: '/img/works/luxe-1.jpg',
          w: 900,
          h: 600,
          alt: 'Каталог LUXE CITY: чёрная обложка с выборочным лаком и разворот с интерьерами',
        },
        {
          src: '/img/works/luxe-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/luxe-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Сертификат BOURBAKI',
      tags: 'Мода · тиснение фольгой, конверт',
      href: '/projects/sertifikat-bourbaki',
      shots: [
        {
          src: '/img/works/bourbaki-1.jpg',
          w: 900,
          h: 600,
          alt: 'Подарочный сертификат BOURBAKI в конверте с золотой рамкой',
        },
        {
          src: '/img/works/bourbaki-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/bourbaki-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Календарь с дверцами на 31 день',
      tags: 'Корпоративный подарок · кашировка, вырубка дверец',
      href: '/projects',
      shots: [
        {
          src: '/img/advent/w-ny-1.jpg',
          w: 900,
          h: 600,
          alt: 'Закрытый зелёный адвент-календарь с гирляндой и шарами на створках',
        },
        {
          src: '/img/advent/w-ny-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/advent/w-ny-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Приглашение на премию в туризме',
      tags: 'Событие · фольга, конверт, объёмная вклейка',
      href: '/projects',
      shots: [
        {
          src: '/img/works/premia-1.jpg',
          w: 900,
          h: 600,
          alt: 'Чёрное приглашение с золотой фольгой и раскладным силуэтом Москвы',
        },
        {
          src: '/img/works/premia-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/premia-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
  ],
  shorts: [
    {
      href: 'https://vk.com/video191195025_456239176',
      video: '191195025_456239176',
      poster: '/img/shorts/v1.jpg',
      alt: 'Печать подарочных сертификатов',
    },
    {
      href: 'https://vk.com/video191195025_456239214',
      video: '191195025_456239214',
      poster: '/img/shorts/v2.jpg',
      alt: 'Сертификаты с тиснением, крупный план',
    },
    {
      href: 'https://vk.com/video191195025_456239129',
      video: '191195025_456239129',
      poster: '/img/shorts/v3.jpg',
      alt: 'Готовый тираж сертификатов',
    },
  ],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};

export const sertifikatWorks: WorksSet = {
  title: 'Работы',
  works: [
    {
      title: 'Подарочный сертификат для «BOURBAKI»',
      tags: 'Мода · тиснение фольгой',
      href: '/projects',
      shots: [
        {
          src: '/img/works/bourbaki-1.jpg',
          w: 900,
          h: 600,
          alt: 'Подарочный сертификат BOURBAKI в упаковке, тиснение фольгой',
        },
        {
          src: '/img/works/bourbaki-2.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
        {
          src: '/img/works/bourbaki-3.jpg',
          w: 900,
          h: 600,
          alt: '',
        },
      ],
    },
    {
      title: 'Подарочный сертификат для «Complex Smile»',
      tags: 'Медицина',
      href: '/projects',
      shots: [
        {
          src: '/img/works/cert-complexsmile.jpg',
          w: 900,
          h: 600,
          alt: 'Сертификат Complex Smile на зелёном конверте',
        },
      ],
    },
    {
      title: 'Сертификат с тиснением фольгой',
      tags: 'Производство',
      href: '/projects',
      shots: [
        {
          src: '/img/works/cert-tisnenie.jpg',
          w: 900,
          h: 600,
          alt: 'Сертификат с тиснением в обложке, перевязанной лентой',
        },
      ],
    },
    {
      title: 'Подарочный сертификат для «AG-Smile»',
      tags: 'Медицина · объёмный лак',
      href: '/projects',
      shots: [
        {
          src: '/img/works/cert-agsmile.jpg',
          w: 900,
          h: 600,
          alt: 'Сертификат AG Smile на 5000 рублей с конвертом и сургучом',
        },
      ],
    },
    {
      title: 'Подарочный сертификат для «IZGIB»',
      tags: 'Спорт · цифровая печать',
      href: '/projects',
      shots: [
        {
          src: '/img/works/cert-izgib.jpg',
          w: 900,
          h: 600,
          alt: 'Сертификат IZGIB на бокале',
        },
      ],
    },
    {
      title: 'Абонементы для «Woodberry beauty»',
      tags: 'Салон красоты · объёмный лак',
      href: '/projects',
      shots: [
        {
          src: '/img/works/cert-woodberry.jpg',
          w: 900,
          h: 600,
          alt: 'Абонементы Woodberry beauty с объёмным лаком',
        },
      ],
    },
  ],
  shorts: [
    {
      href: 'https://vk.com/video191195025_456239176',
      video: '191195025_456239176',
      poster: '/img/shorts/v1.jpg',
      alt: 'Печать подарочных сертификатов',
    },
    {
      href: 'https://vk.com/video191195025_456239214',
      video: '191195025_456239214',
      poster: '/img/shorts/v2.jpg',
      alt: 'Сертификаты с тиснением, крупный план',
    },
    {
      href: 'https://vk.com/video191195025_456239129',
      video: '191195025_456239129',
      poster: '/img/shorts/v3.jpg',
      alt: 'Готовый тираж сертификатов',
    },
  ],
  more: {
    href: '/projects',
    label: 'В портфолио',
  },
};
