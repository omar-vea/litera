import { nabory } from '@/content/sections/nabory';
import { SectionTemplate, sectionMetadata } from '@/components/templates/SectionTemplate';

export const metadata = sectionMetadata(nabory);

export default function Page() {
  return <SectionTemplate page={nabory} />;
}
