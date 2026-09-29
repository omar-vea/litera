import Image from 'next/image';
import { figures } from '@/content/site';
import './Clients.css';
import './Figures.css';

const clients = [
  { id: 'ormatek', src: '/img/clients/ormatek.jpg', w: 300, h: 300, alt: 'Ormatek' },
  { id: 'coralclub', src: '/img/clients/coralclub.svg', w: 640, h: 112, alt: 'Coral Club' },
  { id: 'france', src: '/img/clients/france.png', w: 480, h: 437, alt: 'Посольство Франции' },
  { id: 'ozon', src: '/img/clients/ozon.svg', w: 156, h: 43, alt: 'Ozon' },
  { id: 'sber', src: '/img/clients/sber.svg', w: 135, h: 41, alt: 'Сбер' },
  { id: 'modum', src: '/img/clients/modum.svg', w: 191, h: 58, alt: 'Modum' },
  { id: 'inkerman', src: '/img/clients/inkerman.svg', w: 805, h: 421, alt: 'Inkerman' },
  { id: 'helikon', src: '/img/clients/helikon.png', w: 112, h: 112, alt: 'Геликон-опера' },
];

/** Довод перед формой на всех страницах: цифры студии и лента клиентов. */
export function Proof() {
  return (
    <>
      <section className="ls-figures" aria-label="Студия в цифрах">
        {figures.map((f) => (
          <div key={f.label}>
            <b>{f.value}</b>
            <span>{f.label}</span>
          </div>
        ))}
      </section>
      <section className="ls-clients" aria-label="Клиенты">
        <ul>
          {clients.map((c) => (
            <li key={c.id} className={`ls-c-${c.id}`}>
              <Image src={c.src} width={c.w} height={c.h} alt={c.alt} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
