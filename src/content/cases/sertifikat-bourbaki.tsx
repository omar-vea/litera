import type { CaseData } from '@/components/templates/CaseTemplate';
import { caseBourbakiWorks } from '@/content/works';
import Link from 'next/link';

/**
 * Кейс «Подарочный сертификат для BOURBAKI». В Payload — запись коллекции
 * `cases`: кадры, факты, два текста (задача, что сделали), ссылка на услугу.
 */
export const sertifikatBourbaki: CaseData = {
  slug: 'sertifikat-bourbaki',
  dir: 'poligrafiya',
  title: 'Подарочный сертификат для «BOURBAKI»',
  metaTitle: 'Сертификаты с тиснением для BOURBAKI',
  description: 'Сертификат с золотым тиснением и сквозным номером, в конверте и папке из той же бумаги.',
  hero: {
    src: '/img/case-bourbaki/1.jpg',
    alt: 'Сертификат BOURBAKI с золотым тиснением и номером 19066, рядом конверт и раскрытая папка',
  },
  facts: [
    { label: 'Услуга', value: <Link href="/dizajn-sertifikata">Абонементы и сертификаты</Link> },
    {
      label: 'Технологии',
      value: (
        <>
          <Link href="/projects?tech=Тиснение фольгой">Тиснение фольгой</Link>, сквозная нумерация
        </>
      ),
    },
    { label: 'Направление', value: <Link href="/projects?dir=poligrafiya">Полиграфия</Link> },
    { label: 'Отрасль', value: <Link href="/projects?ind=Мода">Мода</Link> },
    { label: 'Стоимость', value: 'от 320\u00a0₽ за штуку' },
  ],
  task: 'Ателье шьёт на заказ, и сертификат здесь не бумажка с кассы, а часть подарка: его вручают в руки вместе с примеркой. Прежний печатали на офисной бумаге\u00a0— он мялся в конверте и выглядел как рекламная листовка. Нужно было, чтобы сертификат читался вещью из ателье и не требовал отдельной упаковки.',
  inline: {
    src: '/img/case-bourbaki/3.jpg',
    alt: 'Сертификат BOURBAKI поверх стопки конвертов',
    caption: 'Сертификат и конверт под его формат',
  },
  done: [
    'Собрали макет сертификата: шрифт, поля, рамка, место под номер.',
    'Подобрали бумагу и показали пробный оттиск с тиснением до тиража.',
    'Напечатали тираж со сквозной нумерацией.',
    'Сделали конверт и папку из той же бумаги, под формат.',
  ],
  gallery: [
    {
      src: '/img/case-bourbaki/2.jpg',
      alt: 'Крупный план: логотип BOURBAKI и номер сертификата, вытисненные золотой фольгой',
      caption: 'Логотип и номер вытиснены фольгой',
      wide: true,
    },
    {
      src: '/img/case-bourbaki/4.jpg',
      alt: 'Раскрытая папка с текстом на правой стороне',
      caption: 'Разворот: условия напечатаны внутри',
    },
    {
      src: '/img/case-bourbaki/5.jpg',
      alt: 'Корешок папки крупным планом',
      caption: 'Корешок держит форму, папка не расходится',
    },
  ],
  service: { href: '/dizajn-sertifikata', label: 'Подарочные сертификаты' },
  works: caseBourbakiWorks,
};
