import type { Metadata } from 'next';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BackLink } from '@/components/blocks/BackLink';
import {
  RequirementsChecklist,
  RequirementsCta,
  RequirementsGroups,
  RequirementsRules,
  RequirementsToc,
} from '@/components/blocks/Requirements';
import { RequirementsAnchor } from '@/components/blocks/RequirementsAnchor';
import { Proof } from '@/components/blocks/Proof';
import { LeadForm } from '@/components/blocks/LeadForm';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Требования к макетам',
  description:
    'Технические требования к макетам: формат файла, вылеты, цвет, разрешение, шрифты, отделка и упаковка. Не уверены в файле — пришлите как есть, проверим бесплатно.',
  alternates: { canonical: '/trebovaniya-k-maketam' },
  openGraph: {
    title: `Требования к макетам — ${site.name}`,
    description: 'Формат файла, вылеты, цвет, разрешение, шрифты, отделка и упаковка.',
    url: '/trebovaniya-k-maketam',
    images: ['/img/dirs/poligrafiya-set.jpg'],
  },
};

/**
 * Порядок блоков: сначала три правила, которые закрывают большую часть
 * возвратов, потом чек-лист по типу изделия, врезка «пришлите, проверим»,
 * и только дальше полный свод. Из поиска сюда не ходят — приходят из блога
 * и по ссылке менеджера, поэтому сверху короткое, а не оглавление.
 */
export default function RequirementsPage() {
  return (
    <main className="ls-card" id="main">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site.url}/` },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Требования к макетам',
              item: `${site.url}/trebovaniya-k-maketam`,
            },
          ],
        }}
      />
      <SiteHeader noHero />
      <RequirementsAnchor />

      <div className="ls-body">
        <BackLink href="/" label="Главная" />
        <h1 className="ls-title">Требования к макетам</h1>
        <p className="ls-desc">
          Чтобы тираж вышел таким, как на экране. Не уверены в файле&nbsp;— пришлите как есть, проверим до
          расчёта.
        </p>
      </div>

      <div className="ls-rest">
        <i className="ls-rest-sentinel" aria-hidden="true" />
        <i className="ls-chat-sentinel" aria-hidden="true" />
        <RequirementsRules />
        <RequirementsChecklist />
        <RequirementsCta />
        <RequirementsToc />
        <RequirementsGroups />
        <Proof />
        <LeadForm />
      </div>
    </main>
  );
}
