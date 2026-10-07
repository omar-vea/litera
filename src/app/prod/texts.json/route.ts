import { texts } from '@/lib/prod';

// Снимок прода при сборке: в статическом экспорте это обычный файл.
export const dynamic = 'force-static';

export async function GET() {
  return Response.json(await texts());
}
