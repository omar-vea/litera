import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

/** Крошка «← Раздел»: один уровень вверх, как в прототипе. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <nav aria-label="Хлебные крошки">
      <Link className="ls-back" href={href}>
        <Icon name="back" width={12} height={11} />
        {label}
      </Link>
    </nav>
  );
}
