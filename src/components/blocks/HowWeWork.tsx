import type { ReactNode } from 'react';
import { typo } from '@/lib/typo';
import './HowWeWork.css';

/** Текст шага — строка из данных или готовая разметка (срок жирным и т. п.). */
export type Step = { title: string; term?: ReactNode; text: ReactNode };

const defaultSteps: Step[] = [
  {
    title: 'Разбираемся в задаче',
    text: 'В день обращения. Спросим, что нужно, сколько штук и к какому сроку. От этого зависят материал, способ печати и цена.',
  },
  {
    title: 'Считаем и показываем первый вариант',
    text: 'Присылаем смету и макет. Правки по согласованному направлению входят в стоимость.',
  },
  {
    title: 'Согласуем материал и цвет',
    text: 'Покажем образцы и распечатку или соберём пробный экземпляр — тираж вы увидите до печати, а не после.',
  },
  {
    title: 'Печатаем и отдаём',
    text: 'Своё производство в Москве. Забираете сами или привозим по адресу, в другие города отправляем транспортной компанией.',
  },
];

type Props = {
  /** Шаги со сроками под продукт — у карточки услуги. Без них — общие шаги. */
  steps?: Step[];
  total?: ReactNode;
};

/** «Как мы работаем». На карточке услуги шаги свои, со сроками. */
export function HowWeWork({ steps = defaultSteps, total }: Props) {
  return (
    <section className="ls-how">
      <h2>Как мы работаем</h2>
      <ol>
        {steps.map((s) => (
          <li key={s.title}>
            <div>
              <b>{s.title}</b>
              <p>
                {s.term && (
                  <>
                    <span className="ls-term">{s.term}</span>{' '}
                  </>
                )}
                {typeof s.text === 'string' ? typo(s.text) : s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="ls-how-total">
        {total ??
          typo(
            'Срок зависит от продукта: визитки — дни, кашированная коробка — недели. Назовём его вместе со сметой.',
          )}
      </p>
    </section>
  );
}
