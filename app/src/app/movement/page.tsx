import type { Metadata } from 'next';
import MovementManifesto from '@/components/MovementManifesto';
import SmoothScroll from '@/components/SmoothScroll';
import TopNav from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'The Movement — Butterfly Challenge',
  description:
    'One gesture. One billion hands. The Butterfly Challenge is a global movement for mental health.',
};

export default function MovementPage() {
  return (
    <SmoothScroll>
      <TopNav />
      <main className="relative w-full bg-[#faf8f5] text-[#1a1a1a]">
        <section className="relative flex min-h-screen w-full items-center justify-center px-6 pt-32 pb-12 text-center sm:pt-40">
          <div className="max-w-4xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-black/50 sm:text-xs">
              One Gesture. One Billion Hands.
            </p>
            <h1 className="mb-6 font-serif text-5xl font-light leading-[1.05] text-[#1a1a1a] sm:text-7xl md:text-9xl">
              The <span className="italic">Movement.</span>
            </h1>
            <p className="text-base text-black/60 sm:text-lg md:text-xl">
              The Butterfly Sign is how we show up for mental health —
              anywhere in the world.
            </p>
          </div>
        </section>

        <MovementManifesto />
      </main>
    </SmoothScroll>
  );
}
