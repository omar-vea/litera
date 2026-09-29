import Link from 'next/link';
import { reqChecklists, reqGroups, reqRules } from '@/content/requirements';
import '@/styles/shared/form.css';
import '@/styles/shared/faq.css';
import '@/styles/shared/article.css';
import './Requirements.css';
import '@/styles/shared/button-row.css';

const PDF = { href: '/files/trebovaniya-k-maketam.pdf', label: 'Скачать требования в PDF · 4\u00a0МБ' };

/** Три правила сверху и файл целиком. */
export function RequirementsRules() {
  return (
    <section className="ls-req-rules">
      <h2 className="ls-sr-only">Главное</h2>
      <ul>
        {reqRules.map((r, i) => (
          <li key={i}>
            <b>{r.title}</b>
            <span>{r.text}</span>
          </li>
        ))}
      </ul>
      <p className="ls-req-pdf">
        <a className="ls-btn ls-btn-line ls-btn-s" href={PDF.href} download>
          {PDF.label}
        </a>
      </p>
    </section>
  );
}

/**
 * Чек-лист по типу изделия. Чипы — обычные радио, нужный список открывает
 * CSS `:has()` в `req.css`: состояние одно, и держать его в скрипте незачем.
 */
export function RequirementsChecklist() {
  return (
    <section className="ls-req-check">
      <h2>Что проверить перед отправкой</h2>
      <fieldset className="ls-way">
        <legend>Тип изделия</legend>
        <div className="ls-way-row">
          {reqChecklists.map((c, i) => (
            <label key={c.id}>
              <input type="radio" name="pt" id={`pt-${c.id}`} defaultChecked={i === 0} />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="ls-req-lists">
        {reqChecklists.map((c) => (
          <ul key={c.id} id={`check-${c.id}`}>
            {c.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/** Врезка «пришлите, проверим»: закрывает страх «файл не такой» до полного свода. */
export function RequirementsCta() {
  return (
    <aside className="ls-article-cta ls-req-cta">
      <p>
        <b>Не уверены, что с файлом всё в порядке?</b> Пришлите как есть&nbsp;— проверим и скажем, что
        поправить. Бесплатно и до того, как считать тираж.
      </p>
      <div className="ls-article-cta-row">
        <a className="ls-btn ls-btn-main" href="#zayavka">
          Прислать макет
        </a>
        <Link href="/blog">Как готовят макет к печати</Link>
      </div>
    </aside>
  );
}

/** Оглавление — после врезки: список из 23 строк первым экраном отпугивает. */
export function RequirementsToc() {
  return (
    <nav className="ls-req-toc" aria-label="Содержание">
      <h2>Содержание</h2>
      {reqGroups.map((g) => [
        <p key={`h-${g.title}`} className="ls-req-toc-h">
          {g.title}
        </p>,
        <ul key={`l-${g.title}`}>
          {g.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ul>,
      ])}
    </nav>
  );
}

/** Полный свод: группы разделов аккордеоном, якоря с сайта студии. */
export function RequirementsGroups() {
  return reqGroups.map((g) => (
    <section key={g.title} className="ls-req-group">
      <h2>{g.title}</h2>
      <div className="ls-qa-list">
        {g.sections.map((s) => (
          <details key={s.id} className="ls-qa" id={s.id}>
            <summary>
              <span className="ls-q">{s.title}</span>
              <span className="ls-sign" aria-hidden="true" />
            </summary>
            <div className="ls-req-body">{s.body}</div>
          </details>
        ))}
      </div>
    </section>
  ));
}
