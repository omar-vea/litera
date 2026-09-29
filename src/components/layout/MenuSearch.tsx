'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * Поиск по услугам: подсказки по мере набора, синонимы из реальных запросов.
 * Отдельной страницы результатов нет — всё найденное показывается здесь,
 * Enter ведёт на первую подсказку.
 */

type Data = { s: [string, string, number][]; g: string[]; t: number[] };
type Hit = { name: string; href: string; group: string };

// Как люди называют услугу на самом деле: запросы внутреннего поиска и разговорная практика.
const SYNONYMS: Record<string, string> = {
  флаер: 'листовк',
  лифлет: 'буклет',
  бирка: 'этикетк',
  ярлык: 'этикетк',
  бланк: 'фирменны бланк',
  меню: 'меню',
  ценник: 'прайс',
  пригласительн: 'приглашен',
  сертификат: 'сертификат',
  абонемент: 'абонемент',
  значок: 'бейдж',
  бедж: 'бейдж',
  карточк: 'визитк',
  логотип: 'логотип',
  коробк: 'коробк',
  пакет: 'пакет',
  наклейк: 'стикер этикетк',
  календар: 'календар',
};

// «Бэйдж», «бейджик», «Йц» — из реальных запросов: сводим написание к одному виду.
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/э/g, 'е')
    .replace(/й/g, 'и')
    .replace(/[^a-zа-я0-9]+/g, ' ')
    .trim();

const SYN = Object.fromEntries(Object.entries(SYNONYMS).map(([k, v]) => [norm(k), norm(v)]));

// «бирка» находит «Бирки»: морфология не нужна, хватает отсечь последнюю букву.
const stem = (w: string) => (w.length > 4 ? w.slice(0, -1) : w);

// Свои страницы есть не у всех услуг; остальные ведут на живой сайт.
const LOCAL = new Set([
  '/dizajn-sertifikata',
  '/dizajn-advent-kalendarya',
  '/dizajn-vizitki',
  '/dizajn-menyu',
]);
const url = (path: string) => (LOCAL.has(path) ? path : `https://litera.studio${path}`);

function search(data: Data, names: string[], raw: string): number[] {
  const q = norm(raw);
  if (!q) return data.t.slice();
  // сначала то, что написал человек, синонимы — следом и с наценкой
  const terms = [{ t: q, add: 0 }];
  for (const [k, v] of Object.entries(SYN)) {
    if (q.startsWith(k) || k.startsWith(q)) terms.push({ t: v, add: 3 });
  }
  const hits: [number, number][] = [];
  names.forEach((name, i) => {
    let best = -1;
    for (const term of terms) {
      for (const word of term.t.split(' ')) {
        if (!word) continue;
        const at = name.indexOf(stem(word));
        if (at < 0) continue;
        // совпадение с начала названия важнее, чем в середине слова
        const score = (at === 0 ? 0 : name.charAt(at - 1) === ' ' ? 1 : 2) + term.add;
        if (best < 0 || score < best) best = score;
      }
    }
    if (best >= 0) hits.push([best, i]);
  });
  return hits
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
    .slice(0, 8)
    .map(([, i]) => i);
}

let cache: Promise<{ data: Data; names: string[] }> | null = null;
const load = () =>
  (cache ??= fetch('/data/services.json')
    .then((r) => r.json() as Promise<Data>)
    .then((data) => ({ data, names: data.s.map((x) => norm(x[0])) })));

type Props = { onAsk: (text: string) => void; resetKey: number };

export function MenuSearch({ onAsk, resetKey }: Props) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [hits, setHits] = useState<Hit[] | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  // Меню закрыли — поиск возвращается в исходное состояние.
  useEffect(() => {
    setValue('');
    setOpen(false);
  }, [resetKey]);

  const update = async (raw: string) => {
    const { data, names } = await load();
    setHits(
      search(data, names, raw).map((i) => {
        const [name, path, group] = data.s[i];
        return { name, href: url(path), group: data.g[group] };
      }),
    );
    setOpen(true);
  };

  // Клик мимо прячет подсказки.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!box.current?.contains(t) && !form.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  return (
    <>
      <form
        ref={form}
        className="ls-menu-search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          box.current?.querySelector('a')?.click();
        }}
      >
        <label className="ls-sr-only" htmlFor="q">
          Поиск по услугам
        </label>
        <Icon name="search" className="ls-menu-search-ico" width={18} height={18} />
        <input
          ref={input}
          id="q"
          name="s"
          type="search"
          placeholder="Поиск услуг"
          autoComplete="off"
          enterKeyHint="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            void update(e.target.value);
          }}
          onFocus={() => void update(value)}
          onBlur={() => {
            // задержка: иначе касание по подсказке снимает фокус раньше перехода
            setTimeout(() => {
              if (!box.current?.contains(document.activeElement)) setOpen(false);
            }, 160);
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Escape') return;
            if (value) {
              setValue('');
              void update('');
            } else {
              setOpen(false);
              input.current?.blur();
            }
          }}
        />
        <button
          className="ls-menu-search-clear"
          type="button"
          aria-label="Очистить"
          hidden={!value}
          onClick={() => {
            setValue('');
            input.current?.focus();
            void update('');
          }}
        >
          <Icon name="close" width={14} height={14} />
        </button>
      </form>

      <div ref={box} className="ls-menu-hints" hidden={!open || !hits}>
        {hits && hits.length === 0 && (
          <>
            <p className="ls-menu-hints-empty">
              Такого в списке нет. Опишите задачу своими словами — подберём и посчитаем.
            </p>
            <button className="ls-menu-hints-ask" type="button" onClick={() => onAsk(value)}>
              Описать задачу
            </button>
          </>
        )}
        {hits && hits.length > 0 && (
          <>
            <p className="ls-menu-hints-title">{norm(value) ? 'Нашли' : 'Чаще всего ищут'}</p>
            <ul>
              {hits.map((h) => (
                <li key={h.href + h.name}>
                  <a href={h.href}>
                    <b>{h.name}</b>
                    <span>{h.group}</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
