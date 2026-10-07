import type { ReactNode } from 'react';
import type { RichNode } from '@/lib/prod';
import { withBase } from '@/lib/base';

// Старые адреса из текстов статей: на проде их нет (404 или редирект на главную) —
// ведём на ближайшую живую страницу.
const MOVED: Record<string, string> = {
  'razrabotka-firmennogo-stilya': 'razrabotka-dizajna-logotipa-kompanii',
  'sozdanie-i-razrabotka-karty-cvetov': 'razrabotka-dizajna-logotipa-kompanii',
  'razrabotka-pravil-ispolzovaniya-ajdentiki': 'razrabotka-brendbuka',
  'dizayn-upakovki': 'upakovka-i-etiketki',
  'dizajn-i-pechat-korobok': 'upakovka-i-etiketki',
  'dizajn-dlya-svadby': 'svadebnaya-poligrafiya',
  portfolio: 'projects',
};

// Ссылки на страницы прода (услуги, статьи, кейсы, в том числе относительные) ведём внутрь прототипа.
const href = (url = '') => {
  // файлы — на проде
  if (/^\/(api|wp-content)\//.test(url)) return `https://litera.studio${url}`;
  const m = url.match(/^(?:https?:\/\/(?:www\.)?litera\.studio)?(?:\/((?:blog\/|case\/)?[^/?#]*)\/?)?$/);
  return m && url ? withBase(`/${MOVED[m[1] ?? ''] ?? m[1] ?? ''}`) : url;
};

// типографика текстов с прода: прямые кавычки в ёлочки, дефис между словами в тире,
// разделители из старого WordPress (строка подчёркиваний) — прочь
const typo = (t = '') =>
  t
    // кавычка в начале или после пробела/скобки — открывающая, иначе закрывающая:
    // фраза в кавычках бывает разбита на куски (часть жирным)
    .replace(/(^|[\s(«])"/g, '$1«')
    .replace(/"/g, '»')
    .replace(/ - /g, ' — ')
    .replace(/_{5,}/g, '');

function text(n: RichNode): ReactNode {
  const f = Number(n.format) || 0;
  let out: ReactNode = typo(n.text);
  if (f & 1) out = <b>{out}</b>;
  if (f & 2) out = <i>{out}</i>;
  return out;
}

function node(n: RichNode, key: number, doc = false): ReactNode {
  const kids = n.children?.map((c, i) => node(c, i, doc));
  switch (n.type) {
    case 'root':
      return <>{kids}</>;
    case 'paragraph':
      // разделитель из старого WordPress — строка подчёркиваний
      if (n.children?.every((c) => /^[_\s]*$/.test(c.text ?? ''))) return null;
      return kids?.length ? <p key={key}>{kids}</p> : null;
    case 'heading': {
      // в блоке страницы h2 — заголовок блока, заголовки из текста на ступень ниже;
      // в статье и документе уровни как в тексте (h1 под заголовком страницы — h2)
      const H = doc ? (n.tag === 'h1' ? 'h2' : (n.tag as 'h2' | 'h3' | 'h4')) : 'h3';
      return <H key={key}>{kids}</H>;
    }
    case 'list':
      return n.tag === 'ol' ? <ol key={key}>{kids}</ol> : <ul key={key}>{kids}</ul>;
    case 'listitem':
      return <li key={key}>{kids}</li>;
    case 'link':
      return (
        <a key={key} href={href(n.fields?.url ?? n.url)}>
          {kids}
        </a>
      );
    case 'upload':
      return n.img ? (
        // картинки с прода как есть: размеры известны, next/image в статике их не ужмёт
        // eslint-disable-next-line @next/next/no-img-element
        <img key={key} src={n.img.src} width={n.img.w} height={n.img.h} alt={n.img.alt} loading="lazy" />
      ) : null;
    case 'linebreak':
      return <br key={key} />;
    case 'text':
      return <span key={key}>{text(n)}</span>;
    default:
      return kids?.length ? <span key={key}>{kids}</span> : null;
  }
}

/** Богатый текст из Payload (lexical): абзацы, списки, заголовки, ссылки, картинки. */
export function Rich({ root, doc }: { root?: RichNode; doc?: boolean }) {
  return root ? <>{node(root, 0, doc)}</> : null;
}

/** Плоский текст первого абзаца — для описания под заголовком. */
export function plain(root?: RichNode, max = 220): string {
  const first = root?.children?.find((c) => c.type === 'paragraph' && c.children?.length);
  const t = (first?.children ?? [])
    .map((c) => c.text ?? '')
    .join('')
    .trim();
  return t.length > max ? `${t.slice(0, max).replace(/\s+\S*$/, '')}…` : t;
}
