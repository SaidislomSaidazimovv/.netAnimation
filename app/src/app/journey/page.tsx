import type { Metadata } from 'next';
import JourneySequence from '@/components/JourneySequence';
import SmoothScroll from '@/components/SmoothScroll';
import TopNav from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'The Journey — Butterfly Challenge',
  description:
    'A cinematic scroll through the flight of the butterfly — the gesture that becomes a movement.',
};

export default function JourneyPage() {
  return (
    <SmoothScroll>
      <TopNav variant="dark" />
      <main className="relative w-full bg-[#faf8f5]">
        <JourneySequence />

        {/* Light closing section */}
        <section className="relative flex min-h-screen w-full items-center justify-center bg-[#faf8f5] px-5 py-20 text-center sm:px-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/50 sm:mb-4 sm:text-xs">
              One Gesture. Any Language. Anywhere in the World.
            </p>
            <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-[#1a1a1a] sm:text-4xl md:mb-8 md:text-6xl">
              The butterfly lands
              <br />
              <span className="italic">where someone shows up.</span>
            </h2>
            <p className="mb-8 text-sm text-black/60 sm:text-base md:mb-12 md:text-lg">
              The Butterfly Sign is how you show up when you do not have the
              words.
            </p>
            <a
              href="https://butterflychallenge.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[#1a1a1a] px-8 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-black/80 sm:px-10 sm:py-4 sm:text-sm"
            >
              Learn More
            </a>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
