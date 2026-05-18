'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function TopNav() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      // Match CardStack intro timing: short delay so they appear together
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
        <span className="font-serif text-sm font-medium tracking-wide text-[#1a1a1a] sm:text-base md:text-lg">
          Butterfly Challenge
        </span>
      </div>
      <a
        ref={ctaRef}
        href="https://butterflychallenge.net"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-black/15 bg-black/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] backdrop-blur-sm transition hover:bg-black/[0.08] sm:px-5 sm:text-xs"
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
