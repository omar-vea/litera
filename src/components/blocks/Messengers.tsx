import Image from 'next/image';
import { site } from '@/content/site';

/**
 * «Написать в WhatsApp, Telegram или Max» под главной кнопкой.
 * «Telegram или Max» держится одним куском: иначе на 390 «Max» с иконкой
 * падал один на вторую строку.
 */
export function Messengers() {
  return (
    <p className="ls-cta-alt">
      <a href={site.messengers.whatsapp}>
        <span>Написать в WhatsApp</span>
        <Image src="/img/brand/whatsapp.svg" width={16} height={16} alt="" />
      </a>
      ,{' '}
      <span className="ls-nowrap">
        <a href={site.messengers.telegram}>
          <span>Telegram</span>
          <Image src="/img/brand/telegram.svg" width={16} height={16} alt="" />
        </a>{' '}
        или{' '}
        <a href={site.messengers.max}>
          <span>Max</span>
          <Image className="ls-max" src="/img/max-logo.png" width={16} height={16} alt="" />
        </a>
      </span>
    </p>
  );
}
