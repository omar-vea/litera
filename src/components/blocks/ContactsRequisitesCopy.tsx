'use client';

import { useEffect, useRef, useState } from 'react';
import { requisites } from '@/content/contacts';

const LABEL = 'Скопировать реквизиты';

/**
 * «Скопировать реквизиты»: их единственный сценарий — отправить в бухгалтерию,
 * выделять руками десять полей никто не станет. Копируем название и пары
 * «поле: значение» строками — так их вставляют в письмо и в 1С.
 */
export function RequisitesCopy() {
  const [label, setLabel] = useState(LABEL);
  const [status, setStatus] = useState('');
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    const text = [
      requisites.company,
      ...requisites.rows.map(([k, v]) => `${k}: ${v.replace(/\s+/g, ' ')}`),
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setLabel('Скопировано');
      setStatus('Реквизиты скопированы');
    } catch {
      setLabel('Не вышло — выделите вручную');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setLabel(LABEL);
      setStatus('');
    }, 2000);
  };

  return (
    <p className="ls-req-copy">
      <button type="button" className="ls-btn ls-btn-line ls-btn-s" onClick={onClick}>
        {label}
      </button>
      <span className="ls-sr-only" role="status" aria-live="polite">
        {status}
      </span>
    </p>
  );
}
