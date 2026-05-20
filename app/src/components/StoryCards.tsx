'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { stories } from '@/lib/stories-data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function StoryCards() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = root.current?.querySelectorAll('.story-card');
      if (!cards) return;
      cards.forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="mx-auto w-full max-w-6xl px-6 pb-32">
      <div className="flex flex-col gap-12 md:gap-20">
        {stories.map((s, i) => (
          <article
            key={s.id}
            className={`story-card grid grid-cols-1 items-center gap-8 rounded-3xl p-8 md:grid-cols-2 md:gap-12 md:p-12 ${
              i % 2 ? 'md:[&>div:first-child]:order-2' : ''
            }`}
            style={{
              background: `linear-gradient(135deg, ${s.tint} 0%, #ffffff 100%)`,
            }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/50 sm:text-xs">
                {s.ageGroup}
              </p>
              <blockquote className="mb-6 font-serif text-2xl font-light italic leading-snug text-[#1a1a1a] sm:text-3xl md:text-4xl">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <p className="text-sm text-black/60 sm:text-base">
                <span className="font-medium text-[#1a1a1a]">{s.name}</span>
                <span className="mx-2 text-black/30">·</span>
                <span>{s.location}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
