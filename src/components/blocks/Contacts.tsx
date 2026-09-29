import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  contactChannels,
  contactHours,
  contactMessengers,
  delivery,
  office,
  payment,
  requisites,
  store,
  type Pair,
} from '@/content/contacts';
import { RequisitesCopy } from './ContactsRequisitesCopy';
import './Contacts.css';

/** Каналы связи: телефоны и почта крупно, мессенджеры строкой ссылок. */
export function ContactChannels() {
  return (
    <section className="ls-contacts">
      <h2 className="ls-sr-only">Связаться</h2>
      <ul>
        {contactChannels.map((c) => (
          <li key={c.href}>
            <a href={c.href}>{c.label}</a>
            <span>{c.note}</span>
          </li>
        ))}
      </ul>
      <p className="ls-contacts-im">
        {contactMessengers.map((m) => (
          <a key={m.href} href={m.href}>
            {m.label}
          </a>
        ))}
      </p>
      <p className="ls-contacts-hours">{contactHours}</p>
    </section>
  );
}

function Pairs({ pairs }: { pairs: Pair[] }) {
  return (
    <dl>
      {pairs.map((p) => [<dt key={`t-${p.term}`}>{p.term}</dt>, <dd key={`d-${p.term}`}>{p.text}</dd>])}
    </dl>
  );
}

function Block({
  className = '',
  id,
  title,
  children,
}: {
  className?: string;
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`ls-contacts-block ${className}`.trim()} id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Action({ label, href, external }: { label: string; href: string; external: boolean }) {
  return (
    <a
      className="ls-btn ls-btn-line ls-btn-s"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {label}
    </a>
  );
}

/**
 * Практические разделы. На десктопе две колонки: слева офис, доставка, оплата;
 * справа склад и реквизиты — высоты сходятся, оба «Забрать» рядом. До 1024
 * обёртки колонок прозрачны (`display:contents`), порядок задаёт `order`.
 */
export function ContactPlaces() {
  return (
    <div className="ls-contacts-cols">
      <div className="ls-contacts-col">
        <Block className="ls-o1" id="office" title={office.title}>
          <p>{office.text}</p>
          <Action {...office.action} />
          {office.steps.map(({ pair, photo }) => [
            <Pairs key={`p-${pair.term}`} pairs={[pair]} />,
            <figure key={`f-${pair.term}`}>
              <Image
                src={photo.src}
                width={photo.w}
                height={photo.h}
                alt={photo.alt}
                sizes="(min-width: 1024px) 560px, 100vw"
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>,
          ])}
        </Block>
        <Block className="ls-o3" title={delivery.title}>
          <p>{delivery.text}</p>
        </Block>
        <Block className="ls-o4" title={payment.title}>
          <Pairs pairs={payment.pairs} />
        </Block>
      </div>
      <div className="ls-contacts-col">
        <Block className="ls-o2" id="store" title={store.title}>
          <p>{store.text}</p>
          <Action {...store.action} />
          <Pairs pairs={store.pairs} />
        </Block>
        <Block className="ls-contacts-req ls-o5" title="Реквизиты">
          <p className="ls-req-name">{requisites.company}</p>
          <dl>
            {requisites.rows.map(([term, value]) => [
              <dt key={`t-${term}`}>{term}</dt>,
              <dd key={`d-${term}`}>{value}</dd>,
            ])}
          </dl>
          <RequisitesCopy />
        </Block>
      </div>
    </div>
  );
}
