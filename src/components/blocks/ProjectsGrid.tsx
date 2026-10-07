'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { withBase } from '@/lib/base';
import '@/styles/shared/form.css';
import './Works.css';
import './ProjectsGrid.css';

/**
 * Портфолио: сетка из `/data/works.json` (снимок работ прода, собирается при сборке),
 * фильтр по направлению, услуге, технологии и отрасли, показ порциями.
 * Фильтр живёт в адресе (`?dir=…&prod=…&tech=…&ind=…`): по таким ссылкам сюда
 * ведут паспорт кейса и «Все сертификаты».
 *
 * В CMS список станет серверной выборкой из коллекции `works`, а миниатюры —
 * своими файлами. Пока они на живом сайте (remotePatterns в next.config).
 */

type Row = [
  title: string,
  dir: string,
  services: string[],
  image: string,
  industries: string[],
  techs: string[],
  id: number,
];
type Data = { g: Record<string, string>; w: Row[] };

const PAGE = 24;
const DIRS = [
  { value: '', label: 'Все' },
  { value: 'poligrafiya', label: 'Полиграфия' },
  { value: 'upakovka', label: 'Упаковка и этикетки' },
  { value: 'logotip', label: 'Логотип и фирменный стиль' },
  { value: 'brending', label: 'Корпоративный брендинг' },
];

type Filter = { dir: string; prod: string; tech: string; ind: string };

/** Варианты списка — только те, что есть в направлении, по убыванию числа работ. */
function options(rows: Row[], dir: string, pick: (w: Row) => string[]) {
  const by = new Map<string, number>();
  for (const w of rows) {
    if (dir && w[1] !== dir) continue;
    for (const k of pick(w)) by.set(k, (by.get(k) ?? 0) + 1);
  }
  return [...by.entries()].sort((a, b) => b[1] - a[1]);
}

/**
 * Подпись «кто · как сделано». Слева отрасль; её знают у немногих работ, тогда
 * услуга, а если услуга повторяет название («Бумажный пакет…» → «Бумажные
 * пакеты») — направление. Сравниваем по корню первого слова. Справа первая технология.
 */
function caption(w: Row, names: Record<string, string>) {
  const [title, dir, [service], , inds, techs] = w;
  let who = inds[0] || service || names[dir];
  if (!inds[0] && service) {
    const first = service.split(' ')[0].toLowerCase().replace(/ё/g, 'е');
    const name = title.toLowerCase().replace(/ё/g, 'е');
    if (first.length >= 5 && name.includes(first.slice(0, 6))) who = names[dir] || service;
  }
  const how = techs[0];
  return how ? `${who} · ${how.charAt(0).toLowerCase()}${how.slice(1)}` : who;
}

const pickProd = (w: Row) => w[2];
const pickTech = (w: Row) => w[5];
const pickInd = (w: Row) => w[4];

export function ProjectsGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<Data | null>(null);
  const [shown, setShown] = useState(PAGE);

  useEffect(() => {
    let alive = true;
    fetch(withBase('/data/works.json'))
      .then((r) => r.json() as Promise<Data>)
      .then((d) => {
        if (alive) setData(d);
      });
    return () => {
      alive = false;
    };
  }, []);

  const rows = useMemo(() => data?.w ?? [], [data]);
  const dir = params.get('dir') ?? '';
  const lists = useMemo(
    () => ({
      prod: options(rows, dir, pickProd),
      tech: options(rows, dir, pickTech),
      ind: options(rows, dir, pickInd),
    }),
    [rows, dir],
  );
  // Значение из адреса, которого нет в списке, не применяем: иначе пустая выдача без объяснения.
  const valid = (key: 'prod' | 'tech' | 'ind') => {
    const v = params.get(key) ?? '';
    return lists[key].some(([k]) => k === v) ? v : '';
  };
  const filter: Filter = { dir, prod: valid('prod'), tech: valid('tech'), ind: valid('ind') };

  const current = useMemo(
    () =>
      rows.filter(
        (w) =>
          (!filter.dir || w[1] === filter.dir) &&
          (!filter.prod || w[2].includes(filter.prod)) &&
          (!filter.tech || w[5].includes(filter.tech)) &&
          (!filter.ind || w[4].includes(filter.ind)),
      ),
    [rows, filter.dir, filter.prod, filter.tech, filter.ind],
  );

  const update = (next: Partial<Filter>) => {
    const merged = { ...filter, ...next };
    // смена направления сбрасывает списки, если выбранного там нет — это решит `valid`
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v) q.set(k, v);
    setShown(PAGE);
    router.replace(q.size ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const visible = current.slice(0, shown);
  const select = (key: 'prod' | 'tech' | 'ind', label: string, first: string) => (
    <>
      <label className="ls-sr-only" htmlFor={key}>
        {label}
      </label>
      <select id={key} name={key} value={filter[key]} onChange={(e) => update({ [key]: e.target.value })}>
        <option value="">{first}</option>
        {lists[key].map(([k, n]) => (
          <option key={k} value={k}>{`${k} (${n})`}</option>
        ))}
      </select>
    </>
  );

  return (
    <>
      <div className="ls-filter">
        <fieldset className="ls-way">
          <legend>Направление</legend>
          <div className="ls-way-row">
            {DIRS.map((d) => (
              <label key={d.value}>
                <input
                  type="radio"
                  name="dir"
                  value={d.value}
                  checked={filter.dir === d.value}
                  onChange={() => update({ dir: d.value })}
                />
                <span>{d.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {select('prod', 'Услуга', 'Любая услуга')}
        {select('tech', 'Технология', 'Любая технология')}
        {select('ind', 'Отрасль', 'Любая отрасль')}
        <p className="ls-filter-count" aria-live="polite">
          {data && current.length ? `Показано ${visible.length} из ${current.length}` : ''}
        </p>
      </div>

      <section className="ls-projects">
        <h2 className="ls-sr-only">Список работ</h2>
        <ul>
          {data &&
            visible.map((w) => (
              <li key={w[6]} className="ls-work">
                <Link href={`/projects/${w[6]}`} data-cursor="Посмотреть работу">
                  <Image
                    width={544}
                    height={360}
                    src={w[3]}
                    alt={w[0]}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                  <b>{w[0]}</b>
                  <span className="ls-work-tags">{caption(w, data.g)}</span>
                </Link>
              </li>
            ))}
        </ul>
        <p className="ls-projects-empty" hidden={!data || current.length > 0}>
          По этому фильтру работ нет&nbsp;— попробуйте другую услугу.
        </p>
        <button
          className="ls-btn ls-btn-line ls-btn-s ls-projects-more"
          type="button"
          hidden={!data || shown >= current.length}
          onClick={() => setShown((n) => n + PAGE)}
        >
          Показать ещё
        </button>
      </section>
    </>
  );
}
