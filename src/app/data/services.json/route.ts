import { catalog } from '@/lib/prod';
import { menu } from '@/content/menu';

// Индекс поиска услуг из снимка прода: [название, адрес, группа], группы — «Направление · Раздел»,
// t — что показать до ввода. Формат читает MenuSearch. Ищется только то, что есть в утверждённой
// структуре (меню): рекламу, соцсети и POS директор убрал — их страницы открываются по адресу, но не ищутся.
export const dynamic = 'force-static';

// показываем до ввода — самые частые запросы
const TOP = [
  'dizajn-ehtiketki',
  'dizajn-prajs-lista-dlya-salona-krasoty',
  'razrabotka-nastolnyh-igr',
  'razrabotka-kolody-kart',
  'dizajn-advent-kalendarya',
  'dizajn-vizitki',
];

export async function GET() {
  const { cats, services } = await catalog();
  const byId = new Map(cats.map((c) => [c.id, c]));
  const slug = (href: string) => href.replace(/^\//, '');
  const groups = new Set(menu.map((m) => slug(m.href)));
  const items = new Set(menu.flatMap((m) => m.items.map((i) => slug(i.href))));
  // раздел из меню или под ним; прямо на направлении — тоже; без категории — тоже
  const approved = (id: number): boolean => {
    const c = byId.get(id);
    if (!c) return true;
    if (!c.parent) return groups.has(c.slug);
    if (items.has(c.slug)) return true;
    return byId.get(c.parent)?.parent ? approved(c.parent) : false;
  };
  const g: string[] = [];
  const group = (id: number) => {
    const c = byId.get(id);
    const p = c?.parent ? byId.get(c.parent) : undefined;
    // у пары услуг на проде категория не указана (свадебные, «Подарочные коробки»)
    const name = [p?.title, c?.title].filter(Boolean).join(' · ') || 'Другие услуги';
    if (!g.includes(name)) g.push(name);
    return g.indexOf(name);
  };
  const s = services
    .filter((x) => approved(x.cat))
    .sort((a, b) => a.title.localeCompare(b.title, 'ru'))
    .map((x) => [x.title, `/${x.slug}`, group(x.cat)] as const);
  const t = TOP.map((slug) => s.findIndex((x) => x[1] === `/${slug}`)).filter((i) => i >= 0);
  return Response.json({ g, s, t });
}
