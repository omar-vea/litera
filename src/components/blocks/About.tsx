import type { ReactNode } from 'react';
import '@/styles/shared/more.css';

type Props = {
  title: string;
  /** Первый абзац — виден сразу. */
  lead: ReactNode;
  /** Остальное — под «Читать дальше». */
  more?: ReactNode;
};

/** «О визитках», «О листовой полиграфии»: текст для поиска и для тех, кто дочитал. */
export function About({ title, lead, more }: Props) {
  return (
    <section className="ls-about">
      <h2>{title}</h2>
      {lead}
      {more && (
        <details className="ls-more">
          <summary>
            <span className="ls-s-closed">Читать дальше</span>
            <span className="ls-s-open">Свернуть</span>
          </summary>
          {more}
        </details>
      )}
    </section>
  );
}
