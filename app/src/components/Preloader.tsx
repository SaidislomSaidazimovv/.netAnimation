'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

/**
 * Branded preloader — a butterfly mark draws itself in stroke-by-stroke
 * while a 0→100 counter runs, then the whole layer lifts away to reveal
 * the site. Light theme only (cream background, charcoal mark).
 *
 * Self-dismissing: unmounts itself after the exit animation so it never
 * intercepts pointer events or covers the experience afterwards.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const paths = markRef.current?.querySelectorAll('path');
      if (!paths) return;

      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      });

      const count = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => setDone(true),
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        stagger: 0.12,
        ease: 'power2.out',
      })
        .to(
          count,
          {
            v: 100,
            duration: 1.8,
            ease: 'power1.inOut',
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(count.v)
                ).padStart(3, '0');
              }
            },
          },
          0
        )
        .to(markRef.current, {
          fill: '#1a1a1a',
          duration: 0.5,
          ease: 'power2.in',
        })
        .to({}, { duration: 0.25 })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        })
        .to(
          [markRef.current, counterRef.current?.parentElement ?? null],
          { opacity: 0, duration: 0.5 },
          '<'
        );
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#faf8f5]"
      style={{ willChange: 'transform' }}
    >
      <svg
        ref={markRef}
        viewBox="0 0 200 200"
        className="h-28 w-28 sm:h-36 sm:w-36"
        fill="transparent"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* Left wings */}
        <path d="M100 100 C 60 40, 10 50, 22 95 C 28 120, 70 118, 100 100 Z" />
        <path d="M100 100 C 64 120, 18 130, 30 165 C 40 188, 84 168, 100 100 Z" />
        {/* Right wings (mirror) */}
        <path d="M100 100 C 140 40, 190 50, 178 95 C 172 120, 130 118, 100 100 Z" />
        <path d="M100 100 C 136 120, 182 130, 170 165 C 160 188, 116 168, 100 100 Z" />
        {/* Body */}
        <path d="M100 64 C 104 80, 104 122, 100 140 C 96 122, 96 80, 100 64 Z" />
      </svg>

      <div className="mt-8 overflow-hidden">
        <span
          ref={counterRef}
          className="font-anton text-2xl tracking-[0.3em] text-[#1a1a1a]/70 sm:text-3xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
