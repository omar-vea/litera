'use server';

/**
 * Приём заявки с формы. Проверка на сервере повторяет браузерную: форму
 * можно отправить и в обход неё.
 *
 * Куда уходит заявка — не решено (на живом сайте это Битрикс24).
 * Пока адресата нет, `deliver` пишет заявку в лог сервера; до выкатки
 * на прод его обязательно заменить.
 */

export type LeadState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'error'; field?: 'phone' | 'agreement' | 'files'; message: string };

const PHONE = /^[\d\s()+\-]{7,}$/;
const FILE_LIMIT = 25 * 1024 * 1024;

async function deliver(lead: Record<string, unknown>) {
  console.info('[lead]', JSON.stringify(lead));
}

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

  await deliver({
    phone,
    email: form.get('email'),
    name: form.get('first-name'),
    comment: form.get('comment'),
    channel: form.get('methodofcommunication'),
    files: files.map((f) => ({ name: f.name, size: f.size })),
    page: form.get('page'),
  });
  return { status: 'sent' };
}
