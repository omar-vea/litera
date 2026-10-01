/**
 * Заглушка для статического прототипа (GitHub Pages).
 * Повторяет валидацию `actions.ts`, но ничего никуда не отправляет —
 * сервера в статическом экспорте нет. Для реального сайта используется
 * серверный `submitLead` из `actions.ts`, этот файл его не заменяет.
 */
import type { LeadState } from './actions';

const PHONE = /^[\d\s()+\-]{7,}$/;
const FILE_LIMIT = 25 * 1024 * 1024;

export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  const phone = String(form.get('phone') ?? '').trim();
  if (!PHONE.test(phone)) {
    return {
      status: 'error',
      field: 'phone',
      message: 'Укажите номер телефона — по нему мы напишем в мессенджер или позвоним',
    };
  }
  if (!form.get('agreement')) {
    return {
      status: 'error',
      field: 'agreement',
      message: 'Без согласия на обработку данных заявку принять не можем',
    };
  }
  const files = form.getAll('fileattached[]').filter((f): f is File => f instanceof File && f.size > 0);
  if (files.some((f) => f.size > FILE_LIMIT)) {
    return { status: 'error', field: 'files', message: 'Файлы тяжелее 25 МБ пришлите ссылкой на облако' };
  }
  return { status: 'sent' };
}
