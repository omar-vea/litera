import { BackLink } from './BackLink';

type Props = {
  back: { href: string; label: string };
  title: string;
  desc?: string;
  /**
   * Раздел: описание стоит в сером поле под заголовком (`is-solo`).
   * Направление: в поле только заголовок, описание — ниже, на белом листе:
   * рядом с крупным h1 ему не остаётся ширины.
   */
  solo?: boolean;
};

/**
 * Первый экран промежуточной страницы (направление, раздел): крошка,
 * заголовок и описание на сером поле (`page-lead.css`). Кадр первого экрана
 * пока убран — блок готов принять его первым ребёнком `.ls-lead`.
 */
export function PageLead({ back, title, desc, solo }: Props) {
  if (solo) {
    return (
      <div className="ls-lead">
        <div className="ls-page-lead is-solo">
          <BackLink {...back} />
          <h1 className="ls-title">{title}</h1>
          {desc && <p className="ls-desc">{desc}</p>}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="ls-lead">
        <div className="ls-page-lead">
          <BackLink {...back} />
          <h1 className="ls-title">{title}</h1>
        </div>
      </div>
      <div className="ls-body">
        {/* метка для телефона: по ней белеет шапка и выезжает виджет связи */}
        <i className="ls-body-sentinel ls-chat-sentinel" aria-hidden="true" />
        {desc && <p className="ls-desc">{desc}</p>}
      </div>
    </>
  );
}
