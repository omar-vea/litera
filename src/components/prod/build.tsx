import type { Catalog, ProdCategory, ProdProject, ProdService, RichNode } from '@/lib/prod';
import type { ServiceData } from '@/content/services/types';
import type { SectionPage, Tile } from '@/content/sections/types';
import type { DirectionPage } from '@/content/direction-pages/types';
import type { CaseData } from '@/components/templates/CaseTemplate';
import type { WorksSet } from '@/content/works';
import type { Direction } from '@/content/directions';
import Link from 'next/link';
import { prodHeroes } from '@/content/prod-heroes';
import { Rich, plain } from './Rich';

/**
 * Страницы из снимка прода в формы наших шаблонов. Блоков, под которые
 * на проде нет данных («Что выбрать», «Ваши лучшие», вопросы, материалы),
 * здесь нет — шаблон их не выводит.
 */

type Dir = Direction['slug'];
const DIRS: Record<string, Dir> = {
  poligrafiya: 'poligrafiya',
  'upakovka-i-etiketki': 'upakovka',
  'razrabotka-dizajna-logotipa-kompanii': 'logotip',
  'korporativnyj-brending-suveniry': 'brending',
};

export type Page =
  | { kind: 'direction'; page: DirectionPage; title: string }
  | { kind: 'section'; page: SectionPage; title: string }
  | { kind: 'service'; data: ServiceData; title: string }
  | { kind: 'case'; data: CaseData; title: string };

const plural = (n: number) =>
  `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'услуга' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'услуги' : 'услуг'}`;

function index(cat: Catalog) {
  const byId = new Map(cat.cats.map((c) => [c.id, c]));
  const root = (c: ProdCategory): ProdCategory => {
    const p = c.parent ? byId.get(c.parent) : undefined;
    return p ? root(p) : c;
  };
  const dir = (c: ProdCategory | undefined): Dir => (c && DIRS[root(c).slug]) || 'poligrafiya';
  const kids = (c: ProdCategory) =>
    cat.cats.filter((k) => k.parent === c.id).sort((a, b) => a.order - b.order);
  const inCat = (c: ProdCategory): ProdService[] => {
    const ids = new Set([c.id, ...kids(c).map((k) => k.id)]);
    return cat.services.filter((s) => ids.has(s.cat) || s.cats.some((x) => ids.has(x)));
  };
  return { byId, dir, kids, inCat };
}

const tile = (x: ProdCategory | ProdService, note = '', count?: string): Tile => ({
  title: x.title,
  note,
  href: `/${x.slug}`,
  count,
  img: x.img,
});

/** Работы по продуктовым тегам: меньше трёх — блока нет. */
function works(projects: ProdProject[], tax: string[], skip?: number): WorksSet | undefined {
  if (!tax.length) return undefined;
  const list = projects.filter((p) => p.id !== skip && p.prod.some((t) => tax.includes(t))).slice(0, 4);
  if (list.length < 3) return undefined;
  return {
    title: 'Работы',
    works: list.map((p) => ({
      title: p.title,
      tags: [p.ind[0] || p.prod[0], p.tech[0]?.toLowerCase()].filter(Boolean).join(' · '),
      href: `/projects/${p.id}`,
      shots: p.slides.slice(0, 3),
    })),
    shorts: [],
    more: { href: `/projects?prod=${encodeURIComponent(tax[0])}`, label: 'Все работы' },
  };
}

/** Текст «о разделе»: первый заголовок — название блока, первый абзац виден, остальное под «Читать дальше». */
function about(fallback: string, root?: RichNode, title?: string) {
  if (!root?.children?.length) return undefined;
  const nodes = [...root.children];
  const head = nodes[0].type === 'heading' ? nodes.shift() : undefined;
  const name = title || head?.children?.map((c) => c.text).join('') || fallback;
  const at = nodes.findIndex((n) => n.type === 'paragraph' && n.children?.length);
  const lead = nodes.slice(0, at + 1);
  const rest = nodes.slice(at + 1);
  return {
    title: name,
    lead: <Rich root={{ type: 'root', children: lead }} />,
    more: rest.length ? <Rich root={{ type: 'root', children: rest }} /> : undefined,
  };
}

/** Пункты-списки из описания: «Создадим с нуля…», «Внесём правки…». */
const points = (root?: RichNode) =>
  (root?.children ?? []).filter((n) => n.type === 'list').flatMap((l) => l.children ?? []);

const bullets = (items: RichNode[]) =>
  items.map((li) => ({ title: <Rich root={{ type: 'root', children: li.children }} />, text: null }));

const flat = (n: RichNode): string => n.text ?? (n.children ?? []).map(flat).join('');

/** Пункт списка как описание под заголовком: «;» в конце → точка, дефис → тире. */
const sentence = (n: RichNode) => {
  const t = flat(n).trim().replace(/ - /g, ' — ').replace(/[;,:]$/, '');
  return /[.!?…]$/.test(t) ? t : `${t}.`;
};

const meta = (x: ProdCategory | ProdService) => ({
  title: x.seo.title,
  description: x.seo.description,
  canonical: `/${x.slug}`,
  ogTitle: x.seo.title,
  ogDescription: x.seo.description,
  ogImage: x.img?.src ?? '',
});

/** Кадр из портфолио, выбранный для первого экрана (`prodHeroes`). */
function picked(slug: string, projects: ProdProject[]) {
  const pick = prodHeroes[slug];
  return pick && projects.find((p) => p.id === pick.project)?.slides[pick.slide];
}

export function build(slug: string, cat: Catalog, projects: ProdProject[]): Page | null {
  const { byId, dir, kids, inCat } = index(cat);

  const c = cat.cats.find((x) => x.slug === slug);
  if (c && !c.parent) {
    const sections = kids(c).map((k) => tile(k, plain(k.desc, 80), plural(inCat(k).length)));
    // у направления без разделов на проде — сразу услуги
    const items = sections.length ? sections : inCat(c).map((s) => tile(s));
    return {
      kind: 'direction',
      title: c.seo.title,
      page: {
        slug: dir(c),
        meta: meta(c),
        jsonLd: [],
        back: { href: '/', label: 'Главная' },
        title: c.title,
        desc: plain(c.desc),
        sections: items,
        works: works(projects, [...c.tax, ...inCat(c).flatMap((s) => s.tax)]),
        about: about(`О разделе «${c.title}»`, c.more, c.moreTitle),
      },
    };
  }
  if (c) {
    const parent = byId.get(c.parent!)!;
    const sub = kids(c);
    const own = cat.services.filter((s) => s.cat === c.id || s.cats.includes(c.id));
    const groups = [
      ...(sub.length ? [{ title: 'Разделы', items: sub.map((k) => tile(k, plain(k.desc, 80))) }] : []),
      ...(own.length
        ? [{ title: 'Услуги', items: own.sort((a, b) => a.order - b.order).map((s) => tile(s)) }]
        : []),
    ];
    const siblings = kids(parent).filter((k) => k.id !== c.id);
    return {
      kind: 'section',
      title: c.seo.title,
      page: {
        slug: c.slug,
        dir: dir(c),
        meta: meta(c),
        jsonLd: [],
        back: { href: `/${parent.slug}`, label: parent.title },
        title: c.title,
        desc: plain(c.desc),
        catalog: [groups],
        works: works(projects, [...c.tax, ...inCat(c).flatMap((s) => s.tax)]),
        about: about(`О разделе «${c.title}»`, c.more, c.moreTitle),
        related: siblings.length
          ? {
              title: `Ещё в разделе «${parent.title}»`,
              all: { href: `/${parent.slug}`, label: 'Весь раздел' },
              items: siblings
                .slice(0, 6)
                .map((k) => ({ title: k.title, note: '', href: `/${k.slug}`, img: k.img })),
            }
          : undefined,
      },
    };
  }

  const s = cat.services.find((x) => x.slug === slug);
  if (s) {
    const home = byId.get(s.cat);
    const similar = s.similar.length
      ? cat.services.filter((x) => s.similar.includes(x.id))
      : cat.services.filter((x) => x.id !== s.id && x.cat === s.cat).slice(0, 6);
    // у большинства услуг на проде описание — только список: первый пункт идёт под заголовок
    const intro = plain(s.desc);
    const list = points(s.desc);
    const value = bullets(intro ? list : list.slice(1));
    return {
      kind: 'service',
      title: s.seo.title,
      data: {
        slug: s.slug,
        dir: dir(home),
        meta: { ...meta(s), ogImage: s.img?.src },
        jsonLd: [],
        back: home ? { href: `/${home.slug}`, label: home.title } : { href: '/', label: 'Главная' },
        title: s.title,
        desc: intro || (list[0] ? sentence(list[0]) : ''),
        // кадр из портфолио, иначе своё фото, иначе обложка из карточки
        hero: picked(s.slug, projects) ?? s.head ?? s.img!,
        works: works(projects, s.tax),
        value: value.length ? { title: 'Что сделаем', items: value } : undefined,
        about: about('Об услуге', s.more, s.moreTitle),
        related: similar.length
          ? {
              title: home ? `Ещё в разделе «${home.title}»` : 'Похожие услуги',
              all: home
                ? { href: `/${home.slug}`, label: 'Весь раздел' }
                : { href: '/', label: 'Все услуги' },
              items: similar.map((x) => ({ title: x.title, note: '', href: `/${x.slug}`, img: x.img })),
            }
          : undefined,
      },
    };
  }
  return null;
}

/** Работа из портфолио: кадры, теги паспортом, ссылка на услугу по тегу. */
export function buildCase(id: number, cat: Catalog, projects: ProdProject[]): Page | null {
  const p = projects.find((x) => x.id === id);
  if (!p?.slides.length) return null;
  const { byId, dir } = index(cat);
  // услуга по первому продуктовому тегу работы: он самый точный («Стикерпаки», а не «Сувенирная продукция»)
  const service = p.prod.map((t) => cat.services.find((s) => s.tax.includes(t))).find(Boolean);
  const link = (k: string, v: string) => `/projects?${k}=${encodeURIComponent(v)}`;
  const facts = [
    { label: 'Услуга', items: p.prod.slice(0, 3), key: 'prod' },
    { label: 'Технологии', items: p.tech.slice(0, 4), key: 'tech' },
    { label: 'Отрасль', items: p.ind.slice(0, 2), key: 'ind' },
  ]
    .filter((f) => f.items.length)
    .map((f) => ({
      label: f.label,
      value: f.items.map((v, i) => (
        <span key={v}>
          {i > 0 && ', '}
          <Link href={link(f.key, v)}>{v}</Link>
        </span>
      )),
    }));
  const more = works(projects, p.prod, p.id);
  return {
    kind: 'case',
    title: `${p.title} — Литера.Студия`,
    data: {
      slug: String(p.id),
      dir: dir(service ? byId.get(service.cat) : undefined),
      title: p.title,
      metaTitle: p.title,
      description: '',
      hero: p.slides[0],
      facts,
      gallery: p.slides.slice(1).map((sl, i) => ({ ...sl, caption: '', wide: i === 0 })),
      service: service
        ? { href: `/${service.slug}`, label: service.title }
        : { href: '/projects', label: 'Все работы' },
      works: more
        ? { ...more, title: 'Ещё работы' }
        : { title: 'Ещё работы', works: [], shorts: [], more: { href: '/projects', label: 'Все работы' } },
    },
  };
}
