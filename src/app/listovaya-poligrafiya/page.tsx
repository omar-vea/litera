import { listovaya } from '@/content/sections/listovaya';
import { SectionTemplate, sectionMetadata } from '@/components/templates/SectionTemplate';

export const metadata = sectionMetadata(listovaya);

export default function Page() {
  return <SectionTemplate page={listovaya} />;
}
