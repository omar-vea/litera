import type { ReactNode } from 'react';
import type { RichNode } from '@/lib/prod';
import { withBase } from '@/lib/base';

// Ссылки на страницы прода ведём внутрь прототипа; файлы и блог остаются на проде.
const href = (url = '') => {
  const m = url.match(/^https?:\/\/litera\.studio\/([^/?#]+)\/?$/);
  return m ? withBase(`/${m[1]}`) : url;
};

function text(n: RichNode): ReactNode {
  const f = Number(n.format) || 0;
  let out: ReactNode = n.text;
  if (f & 1) out = <b>{out}</b>;
  if (f & 2) out = <i>{out}</i>;
  return out;
}

function node(n: RichNode, key: number): ReactNode {
  const kids = n.children?.map(node);
  switch (n.type) {
    case 'root':
      return <>{kids}</>;
    case 'paragraph':
      return kids?.length ? <p key={key}>{kids}</p> : null;
    case 'heading':
      // h2 страницы — заголовок блока, заголовки из текста на ступень ниже
      return <h3 key={key}>{kids}</h3>;
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
    case 'linebreak':
      return <br key={key} />;
    case 'text':
      return <span key={key}>{text(n)}</span>;
    default:
      return kids?.length ? <span key={key}>{kids}</span> : null;
  }
}

/** Богатый текст из Payload (lexical): абзацы, списки, заголовки, ссылки. */
export function Rich({ root }: { root?: RichNode }) {
  return root ? <>{node(root, 0)}</> : null;
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
