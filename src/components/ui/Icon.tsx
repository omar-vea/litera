/**
 * Иконки одним спрайтом (`public/icons.svg`), ссылка через <use>.
 * Размер задаёт внешний <svg>; цвет — `currentColor` у символа.
 * У знака своя пропорция, поэтому viewBox передаётся и сюда: без него
 * внешний <svg> с шириной и `height:auto` вытягивался бы в 2:1.
 */

const VIEWBOX = {
  mark: '0 0 113.12 161.82',
  back: '0 0 16 14',
  play: '0 0 15 18',
  prev: '0 0 18 14',
  next: '0 0 18 14',
  chevron: '0 0 16 16',
  close: '0 0 24 24',
  search: '0 0 20 20',
  talk: '0 0 24 24',
} as const;

export type IconName = keyof typeof VIEWBOX;

type Props = {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
};

export function Icon({ name, width, height, className }: Props) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={VIEWBOX[name]}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/icons.svg#i-${name}`} />
    </svg>
  );
}
