import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import StoryCards from '@/components/StoryCards';
import TopNav from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'Stories — Butterfly Challenge',
  description:
    'Real people. Real moments. The Butterfly Sign in their words.',
};

export default function StoriesPage() {
  return (
    <SmoothScroll>
      <TopNav />
      <main className="relative w-full bg-[#faf8f5] text-[#1a1a1a]">
        <section className="relative flex min-h-[80vh] w-full items-center justify-center px-6 pt-32 pb-16 text-center sm:pt-40">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-black/50 sm:text-xs">
              Anyone. Anywhere.
            </p>
            <h1 className="mb-6 font-serif text-5xl font-light leading-tight text-[#1a1a1a] sm:text-6xl md:text-8xl">
              <span className="italic">Stories</span> of the Sign.
            </h1>
            <p className="text-base text-black/60 sm:text-lg md:text-xl">
              Real people. Real moments. In their own words.
            </p>
          </div>
        </section>

        <StoryCards />
      </main>
    </SmoothScroll>
  );
}
