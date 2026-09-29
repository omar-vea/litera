import { poligrafiya } from '@/content/direction-pages/poligrafiya';
import { DirectionTemplate, directionMetadata } from '@/components/templates/DirectionTemplate';

export const metadata = directionMetadata(poligrafiya);

export default function Page() {
  return <DirectionTemplate page={poligrafiya} />;
}
