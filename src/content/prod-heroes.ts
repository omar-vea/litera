/**
 * Фото первого экрана, выбранное из портфолио, для страниц из снимка прода.
 * В админке это третий вариант поля «Фото первого экрана»: загрузить своё,
 * оставить обложку карточки или выбрать кадр из работы. Здесь — до CMS:
 * адрес услуги → работа и номер кадра в ней (с нуля).
 *
 * Подобрано вручную по просмотру: работа с тем же продуктовым тегом
 * (у коробок — с тегом своего раздела: кашированные, картонные, МГК,
 * с ложементом), кадр 3:2 с тёмным левым краем — он сливается с плашкой.
 * Где подходящей работы нет, остаётся обложка карточки.
 */
export const prodHeroes: Record<string, { project: number; slide: number }> = {
  // Аресбанк: кашированная коробка с откинутой крышкой — ровно этот продукт
  'dizajn-i-pechat-kashirovannyh-korobok-s-dvojnym-dnom-i-otkidnoj-kryshkoj': { project: 753, slide: 2 },
  // Светящиеся стикеры и стикерпаки ← Корпоративный 3D стикерпак
  'svetyashhiesya-stikery-i-stikerpaki': { project: 817, slide: 0 },
  // УФ DTF наклейки ← Брендирование набора свечей
  'uf-dtf-naklejki': { project: 714, slide: 1 },
  // Шопперы ← Бизнес-набор для «Амбар»
  shoppery: { project: 775, slide: 0 },
  // Ежедневники ← Ежедневник для «Designic»
  ezhednevniki: { project: 795, slide: 0 },
  // Авторские иллюстрации ← Открытки с иллюстрациями
  'avtorskie-illyustraczii': { project: 441, slide: 0 },
  // Метафорические карты ← Набор карт для «LifeSYNC»
  'metaforicheskie-karty': { project: 792, slide: 2 },
  // Таро ← Колода карт Таро Уэйта
  taro: { project: 699, slide: 0 },
  // Термокружки ← Брендированная термокружка
  termokruzhki: { project: 715, slide: 1 },
  // 3D стикеры со смолой ← Стикерпак для “Стрелковый клуб 7.62”
  '3d-stikery-so-smoloj': { project: 741, slide: 0 },
  // Бутылки ← Брендированная бутылка
  butylki: { project: 726, slide: 1 },
  // Толстовки ← Толстовка Litera.Studio
  tolstovki: { project: 611, slide: 0 },
  // Календари ← Адвент-календарь для «FIRDAWS»
  'verstka-kalendarya': { project: 782, slide: 2 },
  // Таблички ← Таблички для салона красоты
  'dizajn-tablichki': { project: 436, slide: 0 },
  // Визитки ← Визитки для “Woodberry Beauty”
  'dizajn-vizitki': { project: 695, slide: 0 },
  // Сертификаты ← Подарочный сертификат для «BOURBAKI»
  'dizajn-sertifikata': { project: 781, slide: 0 },
  // Абонементы ← Подарочный сертификат для «Complex Smile»
  'dizajn-abonementov': { project: 780, slide: 0 },
  // Иллюстрации для сайта ← Открытки с иллюстрациями
  'illyustracii-dlya-sayta': { project: 440, slide: 0 },
  // Свадебные приглашения ← Свадебные приглашения
  'dizajn-svadebnogo-priglasheniya': { project: 751, slide: 0 },
  // Менюхолдеры ← Тейбл-тент для cтоматологии “Denty”
  'dizajn-menyuholdera': { project: 9, slide: 0 },
  // Дорхенгеры ← Образец дорхенгеров с 3D лаком
  'dizajn-dorhengera': { project: 421, slide: 0 },
  // Лайтбоксы ← Лайтбоксы для “The Development Solutions”
  'dizajn-lajtboksa': { project: 218, slide: 0 },
  // Коробки с флокированным ложементом ← Упаковка для “GALAXY”
  'dizajn-i-pechat-korobok-s-flokirovannym-lozhementom': { project: 572, slide: 1 },
  // Коробки с ручкой ← Упаковка для фонда имени Фиделя Кастро
  'dizajn-i-pechat-korobok-s-ruchkoj-iz-mgk': { project: 59, slide: 0 },
  // Коробки с ложементом из изолона ← Коробка для «Аресбанк»
  'dizajn-i-pechat-korobok-s-lozhementom-iz-izolona': { project: 753, slide: 1 },
  // Коробки с ложементом из МГК ← Коробка для “Аресбанк”
  'dizajn-i-pechat-korobok-s-lozhementom-iz-mgk': { project: 705, slide: 1 },
  // Коробки с ложементом из поролона ← Коробка для “HONGQI”
  'dizajn-i-pechat-korobok-s-lozhementom-iz-porolona': { project: 706, slide: 1 },
  // Коробки с ложементом из ЭВА ← Упаковки и этикетки для “CHANDLER”
  'dizajn-i-pechat-korobok-s-lozhementom-iz-ehva': { project: 596, slide: 0 },
  // Коробки с ложементом из картона ← Набор свечей “Весна”
  'dizajn-i-pechat-korobok-s-lozhementom-iz-kartona': { project: 83, slide: 0 },
  // Коробки с драпировкой ложемента тканью ← Комплексный заказ для “Kulumanzone Candles”
  'dizajn-i-pechat-korobok-s-drapirovkoj-lozhementa-tkanyu': { project: 599, slide: 0 },
  // Коробки с двумя верхними магнитными клапанами встык ← Коробка для “Jerome Botanic”
  'korobki-s-dvumya-verhnimi-magnitnymi-klapanami-vstyk': { project: 598, slide: 0 },
  // Коробки с двумя передними клапанами внахлест ← Коробка для настольной игры “Felt book”
  'dizajn-i-pechat-kashirovannyh-korobok-s-dvumya-perednimi-klapanami-vnahlest': { project: 509, slide: 1 },
  // Коробки Ларец ← Сертификат для “Hide Clinic”
  'dizajn-i-pechat-kashirovannyh-korobok-larec': { project: 497, slide: 1 },
  // Коробки с двумя верхними магнитными клапанами внахлест ← Коробка для премиального подарка
  'dizajn-i-pechat-kashirovannyh-korobok-s-dvumya-verhnimi-magnitnymi-klapanami-vnahlest': {
    project: 747,
    slide: 0,
  },
  // Коробки Ларец с двойным дном ← Коробочки для ювелирных украшений
  'dizajn-i-pechat-kashirovannyh-korobok-larec-s-dvojnym-dnom': { project: 504, slide: 0 },
  // Коробки Ларец с двойным дном и откидной крышкой ← Настольная игра “Виноджинариум”
  'dizajn-i-pechat-kashirovannyh-korobok-larec-s-dvojnym-dnom-i-otkidnoj-kryshkoj': {
    project: 559,
    slide: 0,
  },
  // Коробки Cardboard tray X-type ← Карты Таро для “В курсе дел Небесных”
  'dizajn-i-pechat-kashirovannyh-korobok-cardboard-tray-x-type': { project: 566, slide: 1 },
  // Коробки Cardboard tray angled ← Коробка для “Mamba”
  'dizajn-i-pechat-kashirovannyh-korobok-cardboard-tray-angled': { project: 543, slide: 1 },
  // Коробки Cardboard tray angled 2 ← Коробка под подарок и открытка для «Реилго»
  'dizajn-i-pechat-kashirovannyh-korobok-cardboard-tray-angled-2': { project: 779, slide: 0 },
  // Коробки Cardboard tray ← Комплексный заказ для “Octopays”
  'dizajn-i-pechat-kashirovannyh-korobok-cardboard-tray': { project: 626, slide: 1 },
  // Коробки Лоток ← Комплексный заказ для “Kulumanzone Candles”
  'dizajn-i-pechat-kashirovannyh-korobok-lotok': { project: 546, slide: 1 },
  // Коробки Крышка-дно ← Коробка для новогоднего подарка
  'dizajn-i-pechat-kashirovannyh-korobok-kryshka-dno': { project: 513, slide: 0 },
  // Коробки Крышка c двойным дном ← Коробка с фактурной поверхностью
  'dizajn-i-pechat-kashirovannyh-korobok-kryshka-c-dvojnym-dnom': { project: 535, slide: 1 },
  // Коробки Торт ← Упаковка для лака “Noble”
  'dizajn-i-pechat-kashirovannyh-korobok-tort': { project: 499, slide: 0 },
  // Коробки с двумя передними клапанами ← Коробка для “Kulumanzone Candles”
  'dizajn-i-pechat-kashirovannyh-korobok-s-dvumya-perednimi-klapanami': { project: 542, slide: 0 },
  // Коробки с передним магнитным клапаном ← Метафорические карты “Вселенная Юли”
  'dizajn-i-pechat-kashirovannyh-korobok-s-perednim-magnitnym-klapanom': { project: 622, slide: 0 },
  // Коробки Пенал ← Упаковка для “Kraken Spike”
  'dizajn-i-pechat-korobki-penal-iz-kartona': { project: 518, slide: 0 },
  // Коробки Пенал с бортом ← Упаковка для элитного чая
  'dizajn-i-pechat-korobki-penal-s-bortom-iz-kartona': { project: 538, slide: 1 },
  // Коробки Два клапана ← Колода карт для IRINA KULISH
  'dizajn-i-pechat-korobki-dva-klapana-iz-kartona': { project: 561, slide: 1 },
  // Коробки с подвесом ← Упаковка для “INSEA”
  'dizajn-i-pechat-korobki-s-podvesom-iz-kartona': { project: 337, slide: 1 },
  // Коробки Самосборные ← Упаковка для “INSEA”
  'dizajn-i-pechat-samosbornyh-korobok-iz-kartona': { project: 338, slide: 1 },
  // Коробки Моноблок ← Упаковка для чая “Живу Землёй”
  'dizajn-i-pechat-korobok-monoblok-iz-kartona': { project: 80, slide: 0 },
  // Коробки Пирожок ← Упаковка для “Меха Екатерина”
  'dizajn-i-pechat-korobki-pirozhok-iz-kartona': { project: 541, slide: 0 },
  // Коробки-шкатулки ← Упаковка для “Kalabasa”
  'dizajn-i-pechat-korobki-shkatulki-iz-kartona': { project: 181, slide: 0 },
  // Коробки с двойным бортом ← Упаковка для типографии “МДМпринт”
  'dizajn-i-pechat-korobki-s-dvojnym-bortom-iz-kartona': { project: 398, slide: 1 },
  // Коробки Крышка-дно ← Премиальная колода карт по вселенной “Дюны”
  'dizajn-i-pechat-korobki-kryshka-dno-iz-kartona': { project: 694, slide: 0 },
  // Коробки Крышка-дно с бортом ← Упаковка “MoRK oL”
  'dizajn-i-pechat-korobki-kryshka-dno-s-bortom-iz-kartona': { project: 339, slide: 0 },
  // Коробки Ласточкин хвост ← Коробка для “Frau Lingerie”
  'dizajn-i-pechat-korobki-lastochkin-hvost-iz-kartona': { project: 534, slide: 0 },
  // Ежедневники ← Ежедневники для «LifeSYNC»
  'verstka-ezhednevnika': { project: 797, slide: 0 },
  // Roll Up ← Roll Up
  'dizajn-roll-up': { project: 760, slide: 0 },
  // Листовая полиграфия ← Благодарность для “HIGH LVL”
  'podgotovka-listovaya-poligrafiya': { project: 131, slide: 0 },
  // Многополосная полиграфия ← Брошюра с требованиями к макетам
  'podgotovka-mnogopolosnaya-poligrafiya': { project: 816, slide: 0 },
  // Наклейки ← Этикетка для вина “HIRBET KANA”
  'podgotovka-maketa-naklejka': { project: 621, slide: 0 },
  // Буклеты ← Буклет для ЖК «Город»
  'verstka-bukleta': { project: 508, slide: 1 },
  // Афиши ← Афиша
  'verstka-afishi': { project: 766, slide: 0 },
  // Плакаты ← Афиша
  'verstka-plakata': { project: 766, slide: 0 },
  // Меню ← Премиальное меню для ресторана
  'verstka-menyu': { project: 805, slide: 0 },
  // Книги ← Книжка для «Abakumov Clinic»
  'verstka-knigi': { project: 754, slide: 2 },
  // Брошюры ← Брошюра с требованиями к макетам
  'verstka-broshyury': { project: 816, slide: 0 },
  // Блокноты ← Брендирование ежедневника
  'verstka-bloknota': { project: 712, slide: 2 },
  // Каталоги ← Чековая книжка желаний
  'verstka-kataloga': { project: 693, slide: 0 },
  // Визитки ← Визитки для Anna Skverna
  'verstka-vizitki': { project: 595, slide: 1 },
  // Кружки ← Кружки для компании “Русская Долина”
  'dizajn-kruzhki': { project: 387, slide: 1 },
  // Ежедневники ← Ежедневник для «Designic»
  'dizajn-ezhednevnika': { project: 795, slide: 0 },
  // Планеры и трекеры ← Дизайн планера
  'dizajn-planinga': { project: 740, slide: 0 },
  // Ручки ← Белые ручки для компании “Русская Долина”
  'dizajn-ruchki': { project: 389, slide: 1 },
  // Дисконтные карты ← Пластиковые карты для типографии “МДМпринт”
  'dizajn-diskontnoj-karty': { project: 368, slide: 0 },
  // Пластиковые карты ← Пластиковые карты для типографии “МДМпринт”
  'dizajn-plastikovoj-karty': { project: 368, slide: 0 },
  // Бумажные папки ← Чек холдер для “Kabe Group”
  'dizajn-papok': { project: 585, slide: 0 },
  // Папки на кольцах ← Премиальное меню для ресторана
  'dizajn-papok-na-kolcakh': { project: 805, slide: 0 },
  // Стикерпаки ← Стикерпак с УФ DTF наклейками
  'dizajn-stikerpaka': { project: 713, slide: 0 },
  // Тетради ← Ежедневники для «LifeSYNC»
  'dizajn-tetradi': { project: 797, slide: 0 },
  // Книги ← Книга “Почему мы не едем?”
  'dizajn-knigi': { project: 590, slide: 1 },
  // Конверты ← Подарочные конверты для “Лидер-М”
  'dizajn-konverta': { project: 742, slide: 1 },
  // Дипломы ← Грамоты для “Ancomp”
  'dizajn-diploma': { project: 130, slide: 0 },
  // Грамоты ← Грамоты для награждения
  'dizajn-gramoty': { project: 382, slide: 1 },
  // Сертификаты ← Подарочные сертификаты “МОЙ СЕРВИС”
  'dizajn-sertifikata-dlya-salona-krasoty': { project: 764, slide: 0 },
  // Бейджи ← Бейджи для компании “ELLIS”
  'dizajn-bejdzha': { project: 286, slide: 1 },
  // Бирки ← Бирка-открытка для «Массандра»
  'dizajn-birki': { project: 793, slide: 0 },
  // Презентации ← Презентация для “Ergohouse”
  'dizajn-prezentacii': { project: 187, slide: 0 },
  // Фирменные бланки ← Бланки для ФК “МЕЛМАЗ”
  'dizajn-blanka': { project: 274, slide: 0 },
  // Открытки ← Корпоративная открытка на День нефтяника
  'dizajn-otkrytki': { project: 815, slide: 0 },
  // Приглашения ← Приглашение для «Петродент»‎
  'dizajn-priglasheniya': { project: 676, slide: 0 },
  // Корпоративные сувениры ← Декоративный подсвечник из акрила
  'korporativnye-suveniry': { project: 802, slide: 1 },
  // Колоды карт ← Колода карт “Сияние Энергий”
  'razrabotka-kolody-kart': { project: 719, slide: 0 },
  // Настольные игры ← Премиальная колода карт по вселенной “Дюны”
  'razrabotka-nastolnyh-igr': { project: 694, slide: 0 },
  // Буклеты (лифлеты) ← Буклеты для “Intourist”
  'dizajn-bukleta-lifleta': { project: 639, slide: 2 },
  // Разработка фирменного мерча ← Футболки “Алтай Чулышман 2020”
  merch: { project: 379, slide: 0 },
  // Брендирование шопперов ← Бизнес-набор для «Амбар»
  'dizajn-i-brendirovanie-shopperov': { project: 775, slide: 0 },
  // Футболки ← Футболки “Алтай Чулышман 2020”
  futbolki: { project: 379, slide: 0 },
};
