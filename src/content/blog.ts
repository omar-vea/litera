/**
 * Блог: статьи и рубрики. Статьи — настоящие, с litera.studio/blog; своя
 * вёрстка у одной, остальные рисует `ProdPage` из снимка прода. Обложки —
 * оттуда же, в Payload это медиатека записи (коллекция `blog`).
 */

export type Post = { title: string; href: string; cover: string };
export type Rubric = { title: string; posts: Post[] };

const posts = {
  p0: {
    title: 'Готовим макет к печати: какой формат файла подходит для типографии',
    href: '/blog/kakoj-format-fajla-podhodit-dlya-tipografii',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/kakoi_format-min-544x300.jpg',
  },
  p1: {
    title: 'Как сделать визитку в Photoshop за 20\u00a0минут',
    href: '/blog/kak-sdelat-vizitku-v-photoshop-za-20-minut',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/kak-sdelat-vizitku-v-phoroshop-za-20-minut-544x300.jpg',
  },
  p2: {
    title: 'Почему цвет при печати не такой, как на экране?',
    href: '/blog/pochemu-cvet-pri-pechati-ne-takoj-kak-na-ehkrane',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/pochemu-cvet-pri-pechati-ne-takoj-kak-na-ehkrane-544x300.png',
  },
  p3: {
    title: 'Цветопередача: как получить нужный цвет при печати?',
    href: '/blog/cvetoperedacha-kak-poluchit-nuzhnyj-cvet',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/cvetoperedacha-kak-poluchit-nuzhnyj-cvet-544x300.png',
  },
  p4: {
    title: 'Цветопроба печати: назначение, особенности, правило 3\u00a0дней',
    href: '/blog/cvetoproba-pechati-naznachenie-osobennosti-pravilo-3-dnej',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/cvetoproba-pechati-1-544x300.png',
  },
  p5: {
    title: 'Кто пишет и проверяет текст для макета?',
    href: '/blog/kto-pishet-i-proveryaet-tekst-dlya-maketa',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/kto-pishet-tekst-dlya-maketa-544x300.png',
  },
  p6: {
    title: 'Где взять картинки для сайта: обзор 7 лучших фотостоков',
    href: '/blog/gde-vzyat-kartinki-dlya-sajta-obzor-7-luchshih-fotostokov-2',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/7_photostockov-min-544x300.jpg',
  },
  p7: {
    title: 'Всё о тиснении: виды, преимущества, способы нанесения',
    href: '/blog/vsyo-o-tisnenii-vidy-preimushchestva-sposoby-naneseniya',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/vidy-i-tipy-tisneniya-544x300.jpg',
  },
  p8: {
    title: 'Какой материал клише выбрать для тиснения?',
    href: '/blog/kakoj-material-klishe-vybrat-dlya-tisneniya',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/kakoj-material-vybrat-dlya-klishe-544x300.png',
  },
  p9: {
    title: 'Чем 3D фольга отличается от тиснения?',
    href: '/blog/chem-otdelka-3d-folgoj-otlichaetsya-ot-tisneniya',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/otlichie-tisneniya-ot-3d-folgi-1.png-544x300.webp',
  },
  p10: {
    title: 'Дизайн упаковки как инструмент продаж: привлекаем покупателей с первого взгляда',
    href: '/blog/dizajn-upakovki-kak-instrument-prodazh-privlekaem-pokupatelej-s-pervogo-vzglyada',
    cover:
      'https://litera.studio/wp-content/uploads/2024/08/top-packaging-design-ideas-creative-packaging-inspiration-examples-544x300.jpg',
  },
  p11: {
    title: 'Особенности изготовления коробок из МГК',
    href: '/blog/osobennosti-izgotovleniya-korobki-iz-mgk',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/osobennosti-izgotovleniya-korobki-iz-mgk-1-544x300.png',
  },
  p12: {
    title: 'Коробка из МГК: сравнение матовой и глянцевой ламинации',
    href: '/blog/korobka-iz-mgk-sravnenie-matovoj-i-glyancevoj-laminacii',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/korobka-iz-mgk-sravnenie-matovoj-i-glyancevoj-laminacii-1-544x300.png',
  },
  p13: {
    title: 'Чем МГК отличается от гофрокартона?',
    href: '/blog/chem-mgk-otlichaetsya-ot-gofrokartona',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/otlichiya-mgk-i-gofrokartona-544x300.png',
  },
  p14: {
    title: 'Как новогодний дизайн упаковки работает на бренд',
    href: '/blog/kak-novogodnij-dizajn-upakovki-rabotaet-na-brend',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/new_year_brand-min-544x300.jpg',
  },
  p15: {
    title: 'Зачем бренды делают редизайн: подробно и с примерами',
    href: '/blog/zachem-brendy-delayut-redizajn-podrobno-i-s-primerami',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/zachem_redisign1-min-544x300.jpg',
  },
  p16: {
    title: 'Что значит цвет в фирменном стиле и почему он нужен',
    href: '/blog/chto-znachit-cvet-v-firmennom-stile-i-pochemu-on-nuzhen',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/cvet_v_firmennom-min-544x300.jpg',
  },
  p17: {
    title: '7 основных правил создания логотипа компании',
    href: '/blog/7-osnovnyh-pravil-sozdaniya-logotipa-kompanii',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/7_pravil-min-544x300.jpg',
  },
  p18: {
    title: 'Лицо бренда: что такое айдентика и почему она важна',
    href: '/blog/chto-takoe-ajdentika-brenda-i-zachem-ona-nuzhna',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/aidentik-min-544x300.jpg',
  },
  p19: {
    title: 'Простыми словами о брендбуке: что это, из чего состоит и зачем нужен',
    href: '/blog/prostymi-slovami-o-brendbuke',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/o_brandbooke_banner-min-544x300.jpg',
  },
  p20: {
    title: 'Календарные блоки: виды, отличия, стоимость',
    href: '/blog/kalendarnye-bloki-vidy-otlichiya-stoimost',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/kakoj-kalendarnyj-blok-vybrat-1.png-544x300.webp',
  },
  p21: {
    title: 'Когда лучше заказывать календари?',
    href: '/blog/kogda-luchshe-zakazyvat-kalendari',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/kogda-luchshe-zakazyvat-kalendari_1.png-544x300.webp',
  },
  p22: {
    title: 'Как заставить ваши листовки продавать: правила создания макета',
    href: '/blog/kak-zastavit-vashi-listovki-prodavat-pravila-sozdaniya-maketa',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/kak_listovki1-min-544x300.jpg',
  },
  p23: {
    title: '6 советов по дизайну меню для кофейни',
    href: '/blog/6-sovetov-po-dizajnu-menyu-dlya-kofejni-v-primerah',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/6_sovetov3-544x300.jpg',
  },
  p24: {
    title: 'Виды прайсов: какой прайс выбрать салону красоты',
    href: '/blog/vidy-prajsov-kakoj-prajs-vybrat-salonu-krasoty',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/vidy_prisov_banner-min-544x300.jpg',
  },
  p25: {
    title: 'Litera.Studio участвует в выставке InterCHARM 2023 с 25 по 28 октября',
    href: '/blog/litera-studio-uchastvuet-v-vystavke-intercharm',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/litera-studio-uchastvuet-v-vystavke-intercharm.jpg-544x300.webp',
  },
  p26: {
    title: 'Litera.Studio участвует в выставке RosUpack 2023 с 6 по 9 июня',
    href: '/blog/vystavka-rosupack-2023',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/litera-studio-uchastvuet-v-vystavke-rosupack-2023.jpg-544x300.webp',
  },
  p27: {
    title: 'Litera.Studio примет участие в выставке «Wedding Fashion Moscow»',
    href: '/blog/litera-studio-primet-uchastie-v-vystavke-wedding-fashion-moscow',
    cover:
      'https://litera.studio/wp-content/uploads/2024/02/litera-studio-primet-uchastie-v-vystavke-wedding-fashion-moscow-min-544x300.jpg',
  },
  p28: {
    title: 'Вакансия «Менеджер по работе с клиентами»',
    href: '/blog/vakansiya-menedzher-po-rabote-s-klientami',
    cover: 'https://litera.studio/wp-content/uploads/2024/02/vakansiya_manager-544x300.jpg',
  },
} satisfies Record<string, Post>;

/** Статья по адресу — для «Ещё про…» под статьёй. Нет такой — ошибка сборки, а не пустая строка. */
export function postByHref(href: string): Post {
  const post = Object.values(posts).find((p) => p.href === href);
  if (!post) throw new Error(`Нет статьи ${href}`);
  return post;
}

/** Две главные сверху — их читают больше всего. */
export const blogTop: Post[] = [posts.p0, posts.p1];

/** Рубрики двумя колонками: группа не разрывается между колонками. */
export const blogColumns: Rubric[][] = [
  [
    {
      title: 'Подготовка макета',
      posts: [posts.p0, posts.p1, posts.p2, posts.p3, posts.p4, posts.p5, posts.p6],
    },
    { title: 'Тиснение и фольга', posts: [posts.p7, posts.p8, posts.p9] },
    { title: 'Упаковка', posts: [posts.p10, posts.p11, posts.p12, posts.p13, posts.p14] },
  ],
  [
    { title: 'Логотип и фирменный стиль', posts: [posts.p15, posts.p16, posts.p17, posts.p18, posts.p19] },
    { title: 'Календари', posts: [posts.p20, posts.p21] },
    { title: 'Полиграфия под задачу', posts: [posts.p22, posts.p23, posts.p24] },
    { title: 'Новости студии', posts: [posts.p25, posts.p26, posts.p27, posts.p28] },
  ],
];
