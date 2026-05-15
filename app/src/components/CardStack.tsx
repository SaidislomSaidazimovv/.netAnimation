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

const IMAGE_OFFSET = 140; // yPercent — distance images travel

export default function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeWrapperRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bigTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const bgs = bgRefs.current.filter(Boolean) as HTMLDivElement[];
      const bigTexts = bigTextRefs.current.filter(Boolean) as HTMLDivElement[];
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const overlays = overlayRefs.current.filter(Boolean) as HTMLDivElement[];
      if (bgs.length === 0) return;

      // ─── Initial states ───
      bgs.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      bigTexts.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      overlays.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      images.forEach((el, i) =>
        gsap.set(el, { yPercent: i === 0 ? 0 : -IMAGE_OFFSET })
      );

      // ─── Big text letters: initial state ───
      // First card letters: start at FINAL position (yPercent: 0, opacity: 1).
      // The intro animation will temporarily reset them to (100, 0) via
      // fromTo, then stagger them back to (0, 1). This way the master
      // timeline correctly captures (0, 1) as the "from" state for TEEN's
      // exit animation.
      //
      // Other cards: start hidden below; they'll cascade in via the master
      // timeline when their scroll transition fires.
      const lettersByCard = bigTexts.map((bigTextEl) =>
        Array.from(bigTextEl.querySelectorAll('.big-text-char'))
      );
      lettersByCard.forEach((letters, idx) => {
        if (idx === 0) {
          gsap.set(letters, { yPercent: 0, opacity: 1 });
        } else {
          gsap.set(letters, { yPercent: 100, opacity: 0 });
        }
      });

      // ─── Intro fade-in (single wrapper, no conflict with master timeline) ───
      // Hides everything until GSAP set() has run, then smoothly fades in.
      gsap.to(fadeWrapperRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.1,
      });

      // ─── Intro stagger on FIRST card's sub-elements only ───
      // Sub-elements are NOT touched by the master timeline (which only
      // animates the wrappers: bgs, bigTexts, overlays, images).
      // Safe to animate inner elements without conflict.
      const firstOverlay = overlays[0];
      const firstBigText = bigTexts[0];
      const firstImage = images[0];

      if (firstOverlay && firstBigText && firstImage) {
        const titleEl = firstOverlay.querySelector('.intro-title-block');
        const subtitleEl = firstOverlay.querySelector('.intro-subtitle-block');
        const quoteEl = firstOverlay.querySelector('.intro-quote-block');
        const imageInner = firstImage.querySelector('.intro-image-inner');
        const firstCardLetters = lettersByCard[0];

        // Set initial states (hidden + offset positions)
        gsap.set([titleEl, subtitleEl, quoteEl, imageInner], { opacity: 0 });
        gsap.set(titleEl, { x: -40 });
        gsap.set(subtitleEl, { x: 40 });
        gsap.set(quoteEl, { y: 30 });
        gsap.set(imageInner, { y: 50 });

        // Staggered intro timeline
        // onComplete -> ScrollTrigger.refresh() forces the master timeline
        // to RE-CAPTURE its tweens' from-states from the current DOM. This
        // is what guarantees TEEN's exit tween picks up (yPercent: 0,
        // opacity: 1) as its "from" — preventing the disappear-on-scroll bug.
        const introTl = gsap.timeline({
          delay: 0.3,
          defaults: { ease: 'power3.out' },
          onComplete: () => ScrollTrigger.refresh(),
        });

        introTl
          // Big text letters: reset to below, then stagger up.
          // `immediateRender: false` is CRITICAL — without it, fromTo would
          // jump TEEN letters to (100, 0) the moment the timeline is created,
          // which causes the master timeline to record (100, 0) as TEEN's
          // "from" state for its exit animation, making TEEN disappear
          // wrongly on scroll. With immediateRender false, the from state
          // is applied only when the intro tween actually starts running.
          .fromTo(
            firstCardLetters,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.06,
              immediateRender: false,
            }
          )
          .to(imageInner, { y: 0, opacity: 1, duration: 1.2 }, '-=0.8')
          .to(titleEl, { x: 0, opacity: 1, duration: 0.9 }, '-=0.9')
          .to(subtitleEl, { x: 0, opacity: 1, duration: 0.9 }, '-=0.9')
          .to(quoteEl, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');
      }

      // ─── Single master timeline ───
      // Each transition occupies one "time unit" (1 second of timeline = 1 viewport of scroll)
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
        const start = i - 1; // start time of this transition in the timeline

        // Background crossfade (full unit)
        masterTl.to(
          bgs[i],
          { opacity: 1, ease: 'none', duration: 1 },
          start
        );
        masterTl.to(
          bgs[i - 1],
          { opacity: 0, ease: 'none', duration: 1 },
          start
        );

        // Big background text wrapper crossfade
        masterTl.to(
          bigTexts[i],
          { opacity: 1, ease: 'none', duration: 1 },
          start
        );
        masterTl.to(
          bigTexts[i - 1],
          { opacity: 0, ease: 'none', duration: 1 },
          start
        );

        // Big text letters — uniform exit, staggered entry.
        // The intro's onComplete -> ScrollTrigger.refresh() ensures the
        // master timeline captures TEEN's correct post-intro state.
        masterTl.to(
          lettersByCard[i - 1],
          {
            yPercent: -100,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
          },
          start
        );
        // New letters cascade in from below (entry stagger preserved —
        // this is the "wow" moment of each transition).
        masterTl.to(
          lettersByCard[i],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
          },
          start + 0.3
        );

        // Overlay text crossfade (slightly faster transition window)
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

        // Images — simultaneous linear movement, no stagger, no overlap
        // Old image slides down from center to +OFFSET (exit)
        masterTl.to(
          images[i - 1],
          { yPercent: IMAGE_OFFSET, ease: 'none', duration: 1 },
          start
        );
        // New image slides down from -OFFSET to center (enter)
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
        {/* Intro fade wrapper — hides FOUC + fades all content in once on mount */}
        <div
          ref={fadeWrapperRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: 0, willChange: 'opacity' }}
        >
        {/* Layer 1 (z-1+): Background gradients */}
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
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Layer 2 (z-30): Big background text */}
        <div className="pointer-events-none absolute inset-0 z-30">
          {cards.map((card, i) => (
            <div
              key={`bigtext-${card.id}`}
              ref={(el) => {
                bigTextRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ willChange: 'opacity' }}
              aria-hidden="true"
            >
              <h1
                className="font-anton select-none text-[35vw] font-extrabold leading-none text-white/10 md:text-[28vw]"
                style={{ letterSpacing: '0.02em' }}
              >
                {card.bigText.split('').map((char, idx) => (
                  <span
                    key={idx}
                    className="big-text-char inline-block"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </h1>
            </div>
          ))}
        </div>

        {/* Layer 3 (z-40): Images */}
        <div className="pointer-events-none absolute inset-0 z-40">
          {cards.map((card, i) => (
            <div
              key={`img-${card.id}`}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0 flex h-full w-full items-end justify-center pb-20 sm:items-center sm:pb-0"
              style={{ willChange: 'transform' }}
            >
              <div className="intro-image-inner relative h-[75vh] w-[90vw] max-w-[600px] sm:h-[85vh] sm:w-[80vw] md:max-w-3xl lg:max-w-4xl">
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

        {/* Layer 4 (z-70): Text overlays — always above images */}
        <div className="pointer-events-none absolute inset-0 z-[70]">
          {cards.map((card, i) => (
            <div
              key={`overlay-${card.id}`}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full"
              style={{ willChange: 'opacity' }}
            >
              {/* Top Left Title */}
              <div className="intro-title-block absolute left-5 top-20 max-w-[80%] sm:left-8 sm:top-24 sm:max-w-md md:left-16 md:top-32">
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/60 sm:mb-2 sm:text-xs">
                  Anyone. Anywhere.
                </p>
                <h2 className="font-serif text-2xl font-light italic leading-tight text-white sm:text-3xl md:text-5xl">
                  {card.title}
                </h2>
              </div>

              {/* Top Right Subtitle */}
              <div className="intro-subtitle-block absolute right-5 top-20 hidden max-w-xs text-right sm:right-8 sm:top-24 md:right-16 md:top-32 md:block">
                <p className="text-sm leading-relaxed text-white/80">
                  {card.subtitle}
                </p>
              </div>

              {/* Bottom Quote */}
              <div className="intro-quote-block absolute bottom-6 left-1/2 w-full max-w-2xl -translate-x-1/2 px-5 text-center sm:bottom-12 sm:px-8 md:bottom-16">
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
        {/* end intro fade wrapper */}
        </div>
      </div>
    </div>
  );
}
