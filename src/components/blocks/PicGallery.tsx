'use client';

import Image from 'next/image';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { PicModal, type Pic } from './PicModal';

/**
 * Группа кадров, которые открываются крупно в одной листалке (`PicModal`).
 * Порядок листания — список `pics`; кадр на странице — `<GalleryPic>`.
 */

const GalleryContext = createContext<((src: string) => void) | null>(null);

export function PicGallery({ pics, children }: { pics: Pic[]; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = (src: string) =>
    setIndex(
      Math.max(
        0,
        pics.findIndex((p) => p.src === src),
      ),
    );
  return (
    <GalleryContext.Provider value={open}>
      {children}
      <PicModal pics={pics} index={index} onIndex={setIndex} />
    </GalleryContext.Provider>
  );
}

export function GalleryPic({ src, alt }: Pic) {
  const open = useContext(GalleryContext);
  return (
    <button type="button" className="ls-case-zoom" data-cursor="Открыть крупно" onClick={() => open?.(src)}>
      <Image src={src} width={1200} height={800} alt={alt} sizes="(min-width: 1024px) 60vw, 100vw" />
    </button>
  );
}
