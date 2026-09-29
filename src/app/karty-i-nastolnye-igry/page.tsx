import { igry } from '@/content/sections/igry';
import { SectionTemplate, sectionMetadata } from '@/components/templates/SectionTemplate';

export const metadata = sectionMetadata(igry);

export default function Page() {
  return <SectionTemplate page={igry} />;
}
