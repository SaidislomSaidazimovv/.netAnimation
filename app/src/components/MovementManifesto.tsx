'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const LINES = [
  'Mental health doesn’t speak loudly.',
  'It hides in good days and quiet ones.',
  'Sometimes the only thing missing',
  'is the signal.',
];

const STATS = [
  {
    value: 4,
    suffix: '',
    label: '1 in this many adults face a mental health challenge each year.',
  },
  {
    value: 40,
    suffix: 's',
    label: 'Every this many seconds, someone dies by suicide.',
  },
  {
    value: 70,
    suffix: '%',
    label: 'Of them never told anyone what they were going through.',
  },
];

export default function MovementManifesto() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Kinetic typography: each manifesto line reveals from below in a mask.
      const lines = root.current?.querySelectorAll('.kt-line');
      lines?.forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Count-up stats.
      const counters = root.current?.querySelectorAll<HTMLElement>(
        '[data-counter]'
      );
      counters?.forEach((el) => {
        const target = Number(el.dataset.target ?? '0');
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });

      // Closing line.
      const closing = root.current?.querySelector('.kt-closing');
      if (closing) {
        gsap.from(closing, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: closing, start: 'top 80%', once: true },
        });
      }
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative w-full">
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32 md:py-40">
        <div className="flex flex-col gap-4 sm:gap-6">
          {LINES.map((l, i) => (
            <div key={i} className="overflow-hidden">
              <p className="kt-line font-serif text-3xl font-light italic leading-tight text-[#1a1a1a] sm:text-5xl md:text-7xl">
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="border-t border-black/10 pt-8 text-center md:text-left"
            >
              <div className="font-anton text-7xl leading-none text-[#14B8A6] sm:text-8xl">
                <span data-counter data-target={s.value}>0</span>
                {s.suffix}
              </div>
              <p className="mt-4 max-w-xs text-sm text-black/70 sm:text-base">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-32 text-center sm:py-40">
        <p className="kt-closing font-serif text-3xl font-light italic leading-tight text-[#1a1a1a] sm:text-4xl md:text-6xl">
          The Butterfly Sign is how we change that. One gesture at a time.
        </p>
      </section>
    </div>
  );
}
