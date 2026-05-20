'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
  {
    n: '01',
    title: 'Lift both hands',
    body: 'Raise your arms in front of your body, palms facing you.',
  },
  {
    n: '02',
    title: 'Cross your wrists',
    body: 'Bring them together at chest level — right wrist over left, in a clear X.',
  },
  {
    n: '03',
    title: 'Spread your wings',
    body: 'Open your fingers wide and outward, like a butterfly opening its wings.',
  },
  {
    n: '04',
    title: 'Hold it',
    body: 'Hold the gesture for someone you care about. That is the Butterfly Sign.',
  },
];

export default function SignSteps() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = root.current?.querySelectorAll('.sign-step');
      if (!items) return;
      items.forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32 md:py-40"
    >
      <ol className="flex flex-col gap-16 sm:gap-24">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="sign-step grid grid-cols-1 gap-6 border-t border-black/10 pt-10 md:grid-cols-[160px_1fr] md:gap-12"
          >
            <span className="font-anton text-5xl text-[#14B8A6] sm:text-6xl">
              {s.n}
            </span>
            <div>
              <h3 className="mb-4 font-serif text-3xl font-light italic leading-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
                {s.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-black/70 sm:text-lg">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
