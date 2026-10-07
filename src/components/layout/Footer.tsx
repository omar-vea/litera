import Link from 'next/link';
import { site } from '@/content/site';
import { directions } from '@/content/directions';
import './Footer.css';

export function Footer() {
  return (
    <footer className="ls-foot">
      <Link className="ls-wordmark" href="/">
        <span className="ls-sr-only">{site.name}</span>
      </Link>
      <h2 className="ls-sr-only">Контакты и разделы сайта</h2>

      <div className="ls-foot-cols">
        <div className="ls-foot-group">
          <h3>Связаться</h3>
          <ul>
            <li>
              <a href={site.phone.href}>{site.phone.display}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.messengers.telegram}>Telegram</a>
            </li>
            <li>
              <a href={site.messengers.max}>Max</a>
            </li>
          </ul>
          <p className="ls-addr">
            <a href={site.address.map} target="_blank" rel="noopener">
              {site.address.short}
            </a>
            <span>{site.hours}</span>
          </p>
        </div>

        <div className="ls-foot-group">
          <h3>Услуги</h3>
          <ul className="ls-services">
            {directions.map((d) => (
              <li key={d.slug}>
                <Link href={d.href}>{d.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ls-foot-group">
          <h3>Информация</h3>
          <ul>
            <li>
              <Link href="/projects">Работы</Link>
            </li>
            <li>
              <Link href="/blog">Блог</Link>
            </li>
            <li>
              <Link href="/contacts">Контакты</Link>
            </li>
            <li>
              <Link href="/trebovaniya-k-maketam">Требования к&nbsp;макетам</Link>
            </li>
          </ul>
        </div>

        <div className="ls-foot-group">
          <h3>Соцсети</h3>
          <ul>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="ls-legal">
        {site.legal
          .filter((l) => l.href)
          .map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
      </ul>

      <div className="ls-fine">
        <p>
          © {new Date().getFullYear()} {site.name}&nbsp;— графический дизайн и полиграфия
        </p>
        <p>
          {site.company.name}, {site.company.address}
        </p>
        <p>
          ИНН&nbsp;{site.company.inn} · ОГРН&nbsp;{site.company.ogrn}
        </p>
        <p>Цены на сайте справочные и не являются публичной офертой</p>
      </div>
    </footer>
  );
}
