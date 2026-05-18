'use client';

import dynamic from 'next/dynamic';
import Preloader from './Preloader';
import Cursor from './Cursor';

// WebGL canvas relies on browser APIs — load client-only, no SSR.
const ButterflyScene = dynamic(() => import('./ButterflyScene'), {
  ssr: false,
});

/**
 * Client-side experience layer that sits above the page content:
 * branded preloader, ambient 3D butterfly, and the custom cursor.
 * Kept separate from the scroll engine so it never interferes with
 * CardStack's ScrollTrigger timeline.
 */
export default function Experience() {
  return (
    <>
      <Preloader />
      <ButterflyScene />
      <Cursor />
    </>
  );
}
