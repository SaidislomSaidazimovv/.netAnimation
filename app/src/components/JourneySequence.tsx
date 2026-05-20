'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 296;
const SCROLL_PER_FRAME = 20; // px of scroll mapped to one frame
const framePath = (i: number) =>
  `/journey/frame_${String(i).padStart(4, '0')}.webp`;

// Captions appear at specific scroll-progress windows. Each entry fades
// in over the first 25% of its [start..end] window, stays full, then
// fades out over the last 25%.
const OVERLAYS: { text: string; start: number; end: number }[] = [
  { text: 'Anyone. Anywhere.', start: 0.02, end: 0.14 },
  { text: 'One gesture.', start: 0.22, end: 0.38 },
  { text: 'One signal.', start: 0.5, end: 0.66 },
  { text: 'For mental health.', start: 0.78, end: 0.95 },
];

/**
 * Scroll-driven cinematic image sequence (Concept 1 — Butterfly Journey).
 * 270 pre-rendered frames are preloaded, then a sticky full-viewport
 * canvas is scrubbed frame-by-frame as the user scrolls. The footage
 * itself is the dark cinematic butterfly content; the page chrome
 * (loader, closing section) stays in the light system.
 */
export default function JourneySequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Preload every frame, tracking load progress.
  useEffect(() => {
    let loaded = 0;
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loaded += 1;
        setProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas draw (cover-fit, DPR-aware) + scroll scrubbing.
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw = cw;
      let dh = ch;
      let dx = 0;
      let dy = 0;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
      } else {
        dw = cw;
        dh = cw / ir;
        dy = (ch - dh) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawFrame(frameRef.current);
    };

    resize();
    drawFrame(0);

    const updateOverlays = (p: number) => {
      overlayRefs.current.forEach((el, i) => {
        if (!el) return;
        const { start, end } = OVERLAYS[i];
        let op = 0;
        if (p >= start && p <= end) {
          const len = end - start;
          const fade = len * 0.25;
          if (p < start + fade) op = (p - start) / fade;
          else if (p > end - fade) op = (end - p) / fade;
          else op = 1;
        }
        el.style.opacity = String(Math.max(0, Math.min(1, op)));
      });
    };

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const f = Math.min(
          FRAME_COUNT - 1,
          Math.round(self.progress * (FRAME_COUNT - 1))
        );
        if (f !== frameRef.current) {
          frameRef.current = f;
          requestAnimationFrame(() => drawFrame(f));
        }
        updateOverlays(self.progress);
      },
    });
    updateOverlays(0);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, [ready]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${FRAME_COUNT * SCROLL_PER_FRAME}px` }}
      className="relative w-full bg-[#faf8f5]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* Scroll-tied captions over the cinematic footage */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[18vh] flex flex-col items-center px-6 text-center">
          {OVERLAYS.map((o, i) => (
            <div
              key={i}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className="absolute font-serif text-3xl italic leading-tight text-white sm:text-4xl md:text-6xl"
              style={{
                opacity: 0,
                textShadow: '0 2px 18px rgba(0,0,0,0.6)',
                willChange: 'opacity',
              }}
            >
              {o.text}
            </div>
          ))}
        </div>

        {/* Light-themed preloader */}
        {!ready && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#faf8f5]">
            <span className="font-anton text-3xl tracking-[0.3em] text-[#1a1a1a]/70">
              {String(progress).padStart(3, '0')}
            </span>
            <span className="mt-4 text-[10px] uppercase tracking-[0.3em] text-black/40">
              Preparing the journey
            </span>
          </div>
        )}

        {/* Scroll cue (fades once you start) */}
        {ready && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/70">
            Scroll
          </div>
        )}
      </div>
    </div>
  );
}
