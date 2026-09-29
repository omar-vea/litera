/**
 * Структурированные данные для поиска. Встраиваются в страницу: по внешней
 * ссылке поисковики их не читают. `<` экранируем, чтобы текст из CMS
 * не мог закрыть тег скрипта.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
