/**
 * Снимок контента с прода (Payload на litera.studio) для прототипа.
 * Забирается при сборке и ложится рядом с сайтом файлами (`/prod/catalog.json`,
 * `/prod/projects.json`, `/prod/texts.json`): из браузера прод напрямую
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
  /** картинка в тексте (`upload`) */
  img?: ProdImg;
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

/** Статья блога, кейс или страница-документ. */
export type ProdText = {
  slug: string;
  title: string;
  seo: ProdSeo;
  img?: ProdImg;
  body?: RichNode;
  /** минут чтения */
  read: number;
  date: string;
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
// заголовок вкладки как у ручных страниц: «Название — Литера.Студия»; на проде суффиксы вразнобой
// («/ Litera.Studio», «- Litera.Studio», а то и название дважды)
const tab = (t: string) =>
  `${t.replace(/\s*[/|—–-]\s*(Litera\.?\s?Studio|Литера\.?\s?Студия)[\s\S]*$/i, '').trim()} — Литера.Студия`;
const seo = (d: Raw): ProdSeo => ({
  title: tab(d.seo?.title || d.title),
  description: d.seo?.description || '',
});

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
  const all = (cats.docs as Raw[]).map((d): ProdCategory => ({ ...base(d), parent: id(d.parent) }));
  const list = (services.docs as Raw[]).map((d): ProdService => ({
    ...base(d),
    cat: id(d.category) as number,
    cats: ((d.additionalCategories ?? []) as Raw[]).map((c) => id(c) as number),
    head: img(d.headImage, d.title),
    similar: ((d.similarServices ?? []) as Raw[]).map((s) => id(s) as number),
  }));
  // на проде остались старые категории без единой услуги внутри («Полиграфия, сувениры и айдентика»,
  // «Дизайн и печать коробок»…) — пустые страницы не показываем
  const live = (c: ProdCategory): boolean =>
    list.some((s) => s.cat === c.id || s.cats.includes(c.id)) ||
    all.some((k) => k.parent === c.id && live(k));
  return { cats: all.filter(live), services: list };
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

// картинки в тексте: из медиа Payload оставляем адрес, размер и подпись
const uploads = (n: RichNode): RichNode =>
  n.type === 'upload'
    ? { type: 'upload', img: img((n as Raw).value) }
    : n.children
      ? { ...n, children: n.children.map(uploads) }
      : n;

// у документов первый заголовок повторяет название страницы
const flat = (n: RichNode): string => n.text ?? (n.children ?? []).map(flat).join('');
const body = (d: Raw) => {
  // кейс бывает из одних картинок — это тоже текст
  const root =
    rich(d.content) ?? (JSON.stringify(d.content ?? {}).includes('"upload"') ? d.content.root : undefined);
  if (!root) return undefined;
  const [first, ...rest] = root.children ?? [];
  const same = first?.type === 'heading' && flat(first).trim() === String(d.title).trim();
  return uploads(same ? { ...root, children: rest } : root);
};

export async function texts() {
  const [blog, cases, pages] = await Promise.all([
    get('blog?limit=1000&depth=1'),
    get('cases?limit=1000&depth=1'),
    get('pages?limit=1000&depth=1'),
  ]);
  const text = (d: Raw): ProdText => ({
    slug: d.slug,
    title: name(d.title),
    seo: seo(d),
    img: img(d.featuredImage, d.title),
    body: body(d),
    read: d.readTime ?? 0,
    date: d.publishedAt ?? d.createdAt,
  });
  return {
    blog: (blog.docs as Raw[]).map(text),
    cases: (cases.docs as Raw[]).map(text),
    pages: (pages.docs as Raw[]).map(text),
  };
}

export type Texts = Awaited<ReturnType<typeof texts>>;
