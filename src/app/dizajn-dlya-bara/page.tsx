import { menuPrays } from '@/content/sections/menu-prays';
import { SectionTemplate, sectionMetadata } from '@/components/templates/SectionTemplate';

export const metadata = sectionMetadata(menuPrays);

export default function Page() {
  return <SectionTemplate page={menuPrays} />;
}
