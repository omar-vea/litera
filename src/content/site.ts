/**
 * Настройки сайта: контакты, каналы, юридические ссылки.
 *
 * В прототипе телефон и почта были вписаны в шести-семи местах (шапка, меню,
 * футер, форма, виджет) и расходились при правке. Здесь — один источник.
 * В Payload это глобальный объект `site-settings`.
 */

export const site = {
  name: 'Литера.Студия',
  url: 'https://litera.studio',
  phone: { display: '+7 495 021-35-77', href: 'tel:+74950213577', note: 'Звонок бесплатный' },
  email: 'zakaz@litera.studio',
  hours: 'По будням с\u00a010:00 до\u00a019:00',
  address: {
    short: 'Москва, м.\u00a0Тульская, Холодильный пер., 3к1с3, подъезд\u00a06, этаж\u00a02, офис\u00a0404',
    map: 'https://yandex.ru/maps/org/litera_studio/204191129397/',
  },
  messengers: {
    telegram: 'https://t.me/litera_studio',
    whatsapp: 'https://api.whatsapp.com/send?phone=79777936481',
    max: 'https://max.ru/u/f9LHodD0cOIV9InOx6ulNiryFx5jU7n5eIY9DliBnMiKjsrZAmOxnfX0e38',
  },
  socials: [
    { label: 'ВКонтакте', href: 'https://vk.com/litera_studio' },
    { label: 'Дзен', href: 'https://dzen.ru/litera_studio' },
    { label: 'Behance', href: 'https://www.behance.net/litera_studio/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Litera.Studio' },
  ],
  legal: [
    {
      label: 'Политика обработки персональных данных',
      href: 'https://litera.studio/politika-obrabotki-personalnyh-dannyh',
    },
    {
      label: 'Согласие на обработку данных',
      href: 'https://litera.studio/soglasie-na-obrabotku-personalnyh-dannyh',
    },
    {
      label: 'Обработка файлов cookies',
      href: 'https://litera.studio/polozhenie-ob-obrabotke-fajlov-cookies',
    },
    { label: 'Публичная оферта', href: 'https://litera.studio/publichnaya-oferta' },
    { label: 'Пользовательское соглашение', href: 'https://litera.studio/terms' },
  ],
  company: {
    name: 'ООО\u00a0«МДМпринт»',
    address: '115419, Москва, ул.\u00a0Орджоникидзе, 11,\u00a0стр.\u00a01а',
    inn: '7704815108',
    ogrn: '1127746679587',
  },
} as const;

/** Числа «студия в цифрах». В Payload — поля того же глобального объекта. */
export const figures = [
  { value: '13', label: 'лет студии' },
  { value: '800+', label: 'работ' },
  { value: '640+', label: 'клиентов' },
] as const;
