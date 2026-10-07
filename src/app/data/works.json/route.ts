import { catalog, projects } from '@/lib/prod';
import wp from '@/content/works-wp.json';

/**
 * Сетка «Работ» из снимка прода: те же работы, что открываются страницами `/projects/<id>`.
 * Строка: [название, направление, услуги, кадр, отрасли, технологии, id].
 * Направление на проде проставлено у немногих работ — берём из старой выгрузки сайта
 * (`works-wp.json`) по файлу кадра, а нет и там — по направлению услуг с тем же тегом.
 */
export const dynamic = 'force-static';

const NAMES = {
  poligrafiya: 'Полиграфия',
  upakovka: 'Упаковка и этикетки',
  logotip: 'Логотип и фирменный стиль',
  brending: 'Корпоративный брендинг',
};
const ROOTS: Record<string, string> = {
  poligrafiya: 'poligrafiya',
  'upakovka-i-etiketki': 'upakovka',
  'razrabotka-dizajna-logotipa-kompanii': 'logotip',
  'korporativnyj-brending-suveniry': 'brending',
};
const TAGS: Record<string, string> = {
  Полиграфия: 'poligrafiya',
  'Упаковка и этикетка': 'upakovka',
  'Логотип и фирменный стиль': 'logotip',
  'Фирменный мерч': 'brending',
  'Корпоративные подарки': 'brending',
  'Брендирование сувениров': 'brending',
};

export async function GET() {
  const [cat, list] = await Promise.all([catalog(), projects()]);
  const old = new Map(
    (wp.w as unknown as string[][]).map((w) => [w[3].replace(/-\d+x\d+(?=\.\w+$)/, ''), w[1]]),
  );
  // тег услуги → направление каталога, где лежат услуги с этим тегом
  const byId = new Map(cat.cats.map((c) => [c.id, c]));
  const root = (id: number): string | undefined => {
    const c = byId.get(id);
    return c ? (c.parent ? root(c.parent) : ROOTS[c.slug]) : undefined;
  };
  const byTag = new Map<string, string>();
  for (const s of cat.services) {
    const r = root(s.cat);
    if (r) for (const t of s.tax) if (!byTag.has(t)) byTag.set(t, r);
  }
  const w = list.map((p) => [
    p.title,
    old.get(p.key) ?? TAGS[p.dir[0]] ?? p.prod.map((t) => byTag.get(t)).find(Boolean) ?? '',
    p.prod,
    p.slides[0].src,
    p.ind,
    p.tech,
    p.id,
  ]);
  return Response.json({ g: NAMES, w });
}
