import { brending } from '@/content/direction-pages/brending';
import { DirectionTemplate, directionMetadata } from '@/components/templates/DirectionTemplate';

export const metadata = directionMetadata(brending);

export default function Page() {
  return <DirectionTemplate page={brending} />;
}
