'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor — a small solid dot that tracks the pointer instantly,
 * plus a larger ring that follows with eased lag. The ring expands when
 * hovering interactive elements (a, button, [data-cursor]).
 *
 * Pointer-fine devices only — hidden entirely on touch so mobile is
 * unaffected. Light theme: charcoal on cream.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest('a, button, [data-cursor]');

    const onOver = (e: MouseEvent) => {
      const next = isInteractive(e.target);
      if (next !== hovering) {
        hovering = next;
        ring.style.width = hovering ? '56px' : '32px';
        ring.style.height = hovering ? '56px' : '32px';
        ring.style.borderColor = hovering
          ? 'rgba(26,26,26,0.5)'
          : 'rgba(26,26,26,0.25)';
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border"
        style={{
          width: 32,
          height: 32,
          borderColor: 'rgba(26,26,26,0.25)',
          transition:
            'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: '#1a1a1a',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
