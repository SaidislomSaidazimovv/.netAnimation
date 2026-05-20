'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

type Variant = 'light' | 'dark';

export default function TopNav({ variant = 'light' }: { variant?: Variant } = {}) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // 'light' = charcoal text for cream backgrounds (default).
  // 'dark' = white text for use over dark content (e.g. /journey footage).
  const logoText = variant === 'dark' ? 'text-white' : 'text-[#1a1a1a]';
  const ctaCls =
    variant === 'dark'
      ? 'border-white/25 bg-white/[0.06] text-white hover:bg-white/[0.12]'
      : 'border-black/15 bg-black/[0.04] text-[#1a1a1a] hover:bg-black/[0.08]';

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.4,
        defaults: { ease: 'power3.out' },
      });

      tl.to(logoRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.9,
      }).to(
        ctaRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
        },
        '-=0.7'
      );
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6"
    >
      <div
        ref={logoRef}
        className="flex items-center gap-2"
        style={{
          opacity: 0,
          transform: 'translateX(-30px)',
          willChange: 'transform, opacity',
        }}
      >
        <span
          className={`font-serif text-sm font-medium tracking-wide ${logoText} sm:text-base md:text-lg`}
        >
          Butterfly Challenge
        </span>
      </div>
      <a
        ref={ctaRef}
        href="https://butterflychallenge.net"
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-full border ${ctaCls} px-4 py-2 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition sm:px-5 sm:text-xs`}
        style={{
          opacity: 0,
          transform: 'translateX(30px)',
          willChange: 'transform, opacity',
        }}
      >
        Learn More
      </a>
    </nav>
  );
}
