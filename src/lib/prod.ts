/**
 * Снимок контента с прода (Payload на litera.studio) для прототипа.
 * Забирается при сборке и ложится рядом с сайтом двумя файлами
 * (`/prod/catalog.json`, `/prod/projects.json`): из браузера прод напрямую
 * не прочитать — его API не отдаёт CORS-заголовков.
 * Страницы по этим данным рисует `ProdPage` уже в браузере.
 */

const SITE = 'https://litera.studio';

/** Богатый текст Payload (lexical) — как есть, рисует `Rich`. */
export type RichNode = {
  type: string;
  tag?: string;
  text?: string;
  format?: number | string;
  url?: string;
  fields?: { url?: string };
  children?: RichNode[];
};
export type ProdImg = { src: string; w: number; h: number; alt: string };
export type ProdSeo = { title: string; description: string };

export type ProdCategory = {
  id: number;
  slug: string;
  title: string;
  parent: number | null;
  order: number;
  img?: ProdImg;
  desc?: RichNode;
  more?: RichNode;
  moreTitle: string;
  seo: ProdSeo;
  /** Продуктовые теги портфолио: по ним подбираются работы. */
  tax: string[];
};
export type ProdService = Omit<ProdCategory, 'parent'> & {
  cat: number;
  cats: number[];
  head?: ProdImg;
  similar: number[];
};
export type ProdProject = {
  id: number;
  title: string;
  slides: ProdImg[];
  dir: string[];
  prod: string[];
  tech: string[];
  ind: string[];
  /** `2026/08/имя-1.jpg` — ключ, по которому сетка портфолио находит работу. */
  key: string;
};

type Raw = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

async function get(path: string): Promise<Raw> {
  const r = await fetch(`${SITE}/api/${path}`, { cache: 'force-cache' });
  if (!r.ok) throw new Error(`Прод ответил ${r.status} на ${path}`);
  return r.json();
}

const img = (m: Raw | null | undefined, alt = ''): ProdImg | undefined =>
  m && typeof m === 'object' && m.url
    ? { src: SITE + m.url, w: m.width ?? 1200, h: m.height ?? 800, alt: m.alt || alt }
    : undefined;

// пустой текст в Payload — корень без детей или с одним пустым абзацем
const rich = (r: Raw | null | undefined): RichNode | undefined => {
  const root = r?.root as RichNode | undefined;
  const text = JSON.stringify(root ?? {}).match(/"text":"[^"]*\S/);
  return text ? root : undefined;
};

// H1 на проде — SEO-формулировки («Разработка кашированных коробок "С двойным дном…"»),
// в заголовок идёт короткое название. Прямые кавычки — в ёлочки, предлог после
// первого слова — со строчной («Коробки С двойным дном» → «Коробки с двойным дном»).
const name = (t: string) =>
  t
    .replace(/"([^"]*)"/g, '«$1»')
    .replace(/^(\S+) (С|В|На|Для|Без|Под|Из|По) /, (_, a: string, b: string) => `${a} ${b.toLowerCase()} `);

const id = (v: Raw | number | null | undefined) =>
  v && typeof v === 'object' ? (v.id as number) : (v ?? null);
const tax = (d: Raw) => ((d.portfolioTaxonomy ?? []) as Raw[]).map((t) => t.value?.title).filter(Boolean);
const seo = (d: Raw): ProdSeo => ({ title: d.seo?.title || d.title, description: d.seo?.description || '' });

function base(d: Raw) {
  return {
    id: d.id,
    slug: d.slug,
    title: name(d.title),
    order: d.menuOrder ?? 0,
    img: img(d.image ?? d.images?.[0], d.title),
    desc: rich(d.description),
    more: rich(d.additionalContent),
    moreTitle: d.additionalContentHeader || '',
    seo: seo(d),
    tax: tax(d),
  };
}

export async function catalog() {
  const [cats, services] = await Promise.all([
    get('service-categories?limit=1000&depth=1'),
    get('services?limit=1000&depth=1'),
  ]);
  return {
    cats: (cats.docs as Raw[]).map((d): ProdCategory => ({ ...base(d), parent: id(d.parent) })),
    services: (services.docs as Raw[]).map((d): ProdService => ({
      ...base(d),
      cat: id(d.category) as number,
      cats: ((d.additionalCategories ?? []) as Raw[]).map((c) => id(c) as number),
      head: img(d.headImage, d.title),
      similar: ((d.similarServices ?? []) as Raw[]).map((s) => id(s) as number),
    })),
  };
}

export async function projects(): Promise<ProdProject[]> {
  const data = await get('projects?perPage=2000');
  return (data.posts as Raw[]).map((p) => {
    const tags: Record<string, string[]> = {};
    for (const t of String(p.tags ?? '').split(',')) {
      const [, name, kind] = t.split('|');
      if (name && kind) (tags[kind] ??= []).push(name);
    }
    const urls = String(p.slides || p.image?.url || '')
      .split('|')
      .filter(Boolean);
    const first = new URL(urls[0] ?? '/x', SITE);
    return {
      id: p.id,
      title: p.title,
      slides: urls.map((u, i) => ({
        src: SITE + u,
        w: i === 0 ? (p.image?.width ?? 1200) : 1200,
        h: i === 0 ? (p.image?.height ?? 800) : 800,
        alt: p.title,
      })),
      dir: tags.portfolio_direction ?? [],
      prod: tags.portfolio_product ?? [],
      tech: tags.portfolio_technology ?? [],
      ind: tags.portfolio_branch ?? [],
      key: `${first.searchParams.get('prefix') ?? ''}/${first.pathname.split('/').pop()}`,
    };
  });
}

export type Catalog = Awaited<ReturnType<typeof catalog>>;
