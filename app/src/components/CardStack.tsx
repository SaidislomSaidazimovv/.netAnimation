'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { cards } from '@/lib/cards-data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const IMAGE_OFFSET = 140;

export default function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bigTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // First-card intro element refs
  const introBigTextRef = useRef<HTMLHeadingElement | null>(null);
  const introTitleRef = useRef<HTMLDivElement | null>(null);
  const introSubtitleRef = useRef<HTMLDivElement | null>(null);
  const introImageRef = useRef<HTMLDivElement | null>(null);
  const introQuoteRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const bgs = bgRefs.current.filter(Boolean) as HTMLDivElement[];
      const bigTexts = bigTextRefs.current.filter(Boolean) as HTMLDivElement[];
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const overlays = overlayRefs.current.filter(Boolean) as HTMLDivElement[];
      if (bgs.length === 0) return;

      // ─── Stable initial states (matches inline styles, defensive) ───
      bgs.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      bigTexts.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      overlays.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      images.forEach((el, i) =>
        gsap.set(el, { yPercent: i === 0 ? 0 : -IMAGE_OFFSET })
      );

      // ─── INTRO ANIMATION (one-time, on mount) ───
      // Intro elements already start hidden via inline styles (matches these states).
      // GSAP animates them to visible.
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.1,
      });

      introTl
        .to(introBigTextRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.4,
        })
        .to(
          introImageRef.current,
          { y: 0, opacity: 1, duration: 1.2 },
          '-=1.2'
        )
        .to(
          introTitleRef.current,
          { x: 0, opacity: 1, duration: 0.9 },
          '-=0.9'
        )
        .to(
          introSubtitleRef.current,
          { x: 0, opacity: 1, duration: 0.9 },
          '-=0.9'
        )
        .to(
          introQuoteRef.current,
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        );

      // ─── Master scroll-driven timeline ───
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${(cards.length - 1) * window.innerHeight}`,
          pin: '.card-stack-sticky',
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < cards.length; i++) {
        const start = i - 1;

        masterTl.to(bgs[i], { opacity: 1, ease: 'none', duration: 1 }, start);
        masterTl.to(bgs[i - 1], { opacity: 0, ease: 'none', duration: 1 }, start);

        masterTl.to(bigTexts[i], { opacity: 1, ease: 'none', duration: 1 }, start);
        masterTl.to(
          bigTexts[i - 1],
          { opacity: 0, ease: 'none', duration: 1 },
          start
        );

        masterTl.to(
          overlays[i - 1],
          { opacity: 0, ease: 'none', duration: 0.5 },
          start + 0.1
        );
        masterTl.to(
          overlays[i],
          { opacity: 1, ease: 'none', duration: 0.5 },
          start + 0.5
        );

        masterTl.to(
          images[i - 1],
          { yPercent: IMAGE_OFFSET, ease: 'none', duration: 1 },
          start
        );
        masterTl.to(
          images[i],
          { yPercent: 0, ease: 'none', duration: 1 },
          start
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${cards.length * 100}vh` }}
      className="relative w-full"
    >
      <div className="card-stack-sticky sticky top-0 h-screen w-full overflow-hidden">
        {/* Backgrounds */}
        {cards.map((card, i) => (
          <div
            key={`bg-${card.id}`}
            ref={(el) => {
              bgRefs.current[i] = el;
            }}
            className="absolute inset-0 h-screen w-full"
            style={{
              zIndex: i + 1,
              background: `linear-gradient(135deg, ${card.gradient.from} 0%, ${card.gradient.to} 100%)`,
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Big background text */}
        <div className="pointer-events-none absolute inset-0 z-30">
          {cards.map((card, i) => (
            <div
              key={`bigtext-${card.id}`}
              ref={(el) => {
                bigTextRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: i === 0 ? 1 : 0,
                willChange: 'opacity',
              }}
              aria-hidden="true"
            >
              <h1
                ref={i === 0 ? introBigTextRef : undefined}
                className="font-anton select-none text-[35vw] font-extrabold leading-none text-white/10 md:text-[28vw]"
                style={{
                  letterSpacing: '0.02em',
                  // Card 0's big text starts scaled-down + hidden for intro
                  ...(i === 0 && {
                    opacity: 0,
                    transform: 'scale(0.7)',
                  }),
                }}
              >
                {card.bigText}
              </h1>
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="pointer-events-none absolute inset-0 z-40">
          {cards.map((card, i) => (
            <div
              key={`img-${card.id}`}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0 flex h-full w-full items-end justify-center pb-20 sm:items-center sm:pb-0"
              style={{
                transform:
                  i === 0 ? 'translateY(0%)' : `translateY(-${IMAGE_OFFSET}%)`,
                willChange: 'transform',
              }}
            >
              <div
                ref={i === 0 ? introImageRef : undefined}
                className="relative h-[75vh] w-[90vw] max-w-[600px] sm:h-[85vh] sm:w-[80vw] md:max-w-3xl lg:max-w-4xl"
                style={
                  i === 0
                    ? { opacity: 0, transform: 'translateY(60px)' }
                    : undefined
                }
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  priority={i < 2}
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 60vw"
                  className="object-contain object-bottom sm:object-center"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Text overlays */}
        <div className="pointer-events-none absolute inset-0 z-[70]">
          {cards.map((card, i) => (
            <div
              key={`overlay-${card.id}`}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full"
              style={{
                opacity: i === 0 ? 1 : 0,
                willChange: 'opacity',
              }}
            >
              <div
                ref={i === 0 ? introTitleRef : undefined}
                className="absolute left-5 top-20 max-w-[80%] sm:left-8 sm:top-24 sm:max-w-md md:left-16 md:top-32"
                style={
                  i === 0
                    ? { opacity: 0, transform: 'translateX(-50px)' }
                    : undefined
                }
              >
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/60 sm:mb-2 sm:text-xs">
                  Anyone. Anywhere.
                </p>
                <h2 className="font-serif text-2xl font-light italic leading-tight text-white sm:text-3xl md:text-5xl">
                  {card.title}
                </h2>
              </div>

              <div
                ref={i === 0 ? introSubtitleRef : undefined}
                className="absolute right-5 top-20 hidden max-w-xs text-right sm:right-8 sm:top-24 md:right-16 md:top-32 md:block"
                style={
                  i === 0
                    ? { opacity: 0, transform: 'translateX(50px)' }
                    : undefined
                }
              >
                <p className="text-sm leading-relaxed text-white/80">
                  {card.subtitle}
                </p>
              </div>

              <div
                ref={i === 0 ? introQuoteRef : undefined}
                className="absolute bottom-6 left-1/2 w-full max-w-2xl -translate-x-1/2 px-5 text-center sm:bottom-12 sm:px-8 md:bottom-16"
                style={
                  i === 0
                    ? { opacity: 0, transform: 'translate(-50%, 30px)' }
                    : undefined
                }
              >
                <p
                  className="font-serif text-sm italic leading-relaxed text-white sm:text-base md:text-xl"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                >
                  &ldquo;{card.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
