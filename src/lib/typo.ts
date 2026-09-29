/**
 * Неразрывные пробелы в тексте из данных: перед тире и между числом
 * и единицей. В прототипе их ставил сборщик; тексты из CMS проходят
 * через эту же функцию при выводе, редактор набирает обычные пробелы.
 */

const NBSP = '\u00a0';
const UNITS =
  '(?:мм|см|м|%|pt|dpi|г/м²|г|МБ|ГБ|КБ|страниц[аы]?|листов|листа|шт\\.?|штук|дн(?:я|ей)|час(?:а|ов)?|минут|лет|₽|руб\\.?|×)';

const beforeDash = /(\S) (—)/g;
const numberUnit = new RegExp(`(\\d) (?=${UNITS}(?![\\p{L}]))`, 'gu');

export function typo(text: string): string {
  return text.replace(beforeDash, `$1${NBSP}$2`).replace(numberUnit, `$1${NBSP}`);
}
