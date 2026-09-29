'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';
import { submitLead, type LeadState } from '@/app/actions';
import '@/styles/shared/form.css';

const FILE_LIMIT = 25 * 1024 * 1024; // отраслевая норма для макетов
const FILE_NOTE = 'PDF, AI, CDR, PSD, фото или архив — до 25 МБ';
const PHONE = /^[\d\s()+\-]{7,}$/;
const channels = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'max', label: 'Max' },
  { value: 'звонок', label: 'Звонок' },
  { value: 'почта', label: 'Почта' },
];

const sizeLabel = (b: number) =>
  b < 1024 * 1024
    ? `${Math.max(1, Math.round(b / 1024))} КБ`
    : `${(b / 1024 / 1024).toFixed(1).replace('.', ',')} МБ`;
const sameFile = (a: File, b: File) =>
  a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

/** Форма заявки — на каждой странице, якорь `#zayavka`. */
export function LeadForm() {
  const pathname = usePathname();
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: 'idle' });
  const [files, setFiles] = useState<File[]>([]);
  const [heavy, setHeavy] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const done = useRef<HTMLDivElement>(null);

  // input отдаёт только последний выбор — копим файлы сами и переписываем FileList.
  useEffect(() => {
    if (!fileInput.current) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    fileInput.current.files = dt.files;
  }, [files]);

  useEffect(() => {
    if (state.status === 'sent') done.current?.focus();
  }, [state.status]);

  const sent = state.status === 'sent';
  const fileNote = heavy.length
    ? heavy.length === 1
      ? `Файл ${heavy[0]} тяжелее 25 МБ — пришлите ссылкой на облако`
      : `${heavy.length} файла тяжелее 25 МБ — пришлите ссылкой на облако`
    : FILE_NOTE;

  return (
    <section className="ls-lead-form" id="zayavka">
      <svg className="ls-lead-mark" viewBox="0 0 113.12 161.82" aria-hidden="true">
        <use href="/icons.svg#i-mark" />
      </svg>
      <h2>
        {sent ? (
          <>
            Заявка у нас.
            <br />
            Ответим в рабочее время
          </>
        ) : (
          'Посчитаем и подскажем'
        )}
      </h2>
      {!sent && (
        <p className="ls-sub">
          Оставьте контакт&nbsp;— вернёмся со сметой и вариантами. Если задача решается проще, так и скажем.
        </p>
      )}

      {sent ? (
        <div className="ls-sent" role="status" tabIndex={-1} ref={done}>
          <span className="ls-sent-mark">
            <svg viewBox="0 0 113.12 161.82" aria-hidden="true">
              <use href="/icons.svg#i-mark" />
            </svg>
          </span>
        </div>
      ) : (
        <form action={action}>
          <input type="hidden" name="page" value={pathname} />
          <div className="ls-pair">
            <label className="ls-sr-only" htmlFor="contact">
              Телефон
            </label>
            <input
              id="contact"
              type="tel"
              name="phone"
              placeholder="Телефон"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-invalid={state.status === 'error' && state.field === 'phone'}
              onInput={(e) => e.currentTarget.setCustomValidity('')}
              onInvalid={(e) => {
                const v = e.currentTarget.value.trim();
                if (v && !PHONE.test(v))
                  e.currentTarget.setCustomValidity(
                    'Укажите номер телефона — по нему мы напишем в мессенджер или позвоним',
                  );
              }}
            />
            <label className="ls-sr-only" htmlFor="mail">
              Почта
            </label>
            <input
              id="mail"
              type="email"
              name="email"
              placeholder="Почта, если удобнее"
              autoComplete="email"
            />
          </div>
          <label className="ls-sr-only" htmlFor="fname">
            Имя
          </label>
          <input
            id="fname"
            type="text"
            name="first-name"
            placeholder="Имя, если хотите"
            autoComplete="given-name"
          />
          <label className="ls-sr-only" htmlFor="task">
            Что нужно напечатать
          </label>
          <textarea
            id="task"
            name="comment"
            rows={1}
            maxLength={2000}
            placeholder="Что печатаем, тираж, срок, комментарии"
            onInput={(e) => {
              // поле растёт по тексту
              const ta = e.currentTarget;
              ta.style.height = 'auto';
              ta.style.height = `${ta.scrollHeight}px`;
            }}
          />
          <fieldset className="ls-way">
            <legend>Как удобнее ответить</legend>
            <div className="ls-way-row">
              {channels.map((c, i) => (
                <label key={c.value}>
                  <input type="radio" name="methodofcommunication" value={c.value} defaultChecked={i === 0} />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <ul className="ls-file-list" hidden={!files.length}>
            {files.map((f) => (
              <li key={`${f.name}-${f.size}-${f.lastModified}`}>
                <span className="ls-n">{f.name}</span>
                <span className="ls-s">{sizeLabel(f.size)}</span>
                <button
                  type="button"
                  aria-label={`Убрать ${f.name}`}
                  onClick={() => setFiles((all) => all.filter((x) => x !== f))}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <path d="M1 1l10 10M11 1L1 11" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <label className="ls-file">
            <input
              ref={fileInput}
              type="file"
              name="fileattached[]"
              multiple
              accept=".pdf,.ai,.cdr,.eps,.psd,.tif,.tiff,.jpg,.jpeg,.png,.heic,.heif,.webp,.zip,.rar"
              onChange={(e) => {
                const picked = Array.from(e.currentTarget.files ?? []);
                setHeavy(picked.filter((f) => f.size > FILE_LIMIT).map((f) => f.name));
                setFiles((all) => [
                  ...all,
                  ...picked.filter((f) => f.size <= FILE_LIMIT && !all.some((x) => sameFile(x, f))),
                ]);
              }}
            />
            <span>{files.length ? 'Прикрепить ещё' : 'Прикрепить файлы'}</span>
          </label>
          <p className={`ls-file-note${heavy.length ? ' ls-err' : ''}`}>{fileNote}</p>

          <label className="ls-agree">
            <input type="checkbox" name="agreement" required />
            <span>
              Даю{' '}
              <a href={site.legal[1].href} target="_blank" rel="noopener">
                согласие
              </a>{' '}
              {site.company.name} на обработку моих персональных данных для ответа на заявку и подтверждаю,
              что ознакомлен с{' '}
              <a href={site.legal[0].href} target="_blank" rel="noopener">
                политикой обработки персональных данных
              </a>
            </span>
          </label>
          <p className="ls-agree-note">
            Отозвать согласие можно письмом на <a href={`mailto:${site.email}`}>{site.email}</a> — укажите в
            нём телефон, оставленный в форме.
          </p>
          {state.status === 'error' && (
            <p className="ls-file-note ls-err" role="alert">
              {state.message}
            </p>
          )}
          <button className="ls-btn ls-btn-main" type="submit" disabled={pending}>
            {pending ? 'Отправляем…' : 'Обсудить задачу'}
          </button>
        </form>
      )}

      <div className="ls-lead-side">
        <h3>Что дальше</h3>
        <ol className="ls-lead-next">
          <li>Посмотрим задачу и уточним, если чего-то не хватает</li>
          <li>Посчитаем стоимость под ваш тираж и сроки</li>
          <li>Пришлём смету и первый вариант макета</li>
        </ol>
        <p className="ls-or">
          {sent ? 'Если нужно быстрее — напишите в ' : 'Не любите формы\u00a0— напишите в '}
          <a href={site.messengers.telegram}>Telegram</a>, <a href={site.messengers.whatsapp}>WhatsApp</a> или{' '}
          <a href={site.messengers.max}>Max</a>, позвоните{' '}
          <a href={site.phone.href}>{site.phone.display.replace(/ /g, '\u00a0')}</a> или напишите на{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
