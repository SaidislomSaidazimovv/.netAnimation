import type { Metadata } from 'next';
import SignSteps from '@/components/SignSteps';
import SmoothScroll from '@/components/SmoothScroll';
import TopNav from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'Make the Sign — Butterfly Challenge',
  description:
    'Four steps. One gesture that says: I see you. Learn how to make the Butterfly Sign.',
};

export default function SignPage() {
  return (
    <SmoothScroll>
      <TopNav />
      <main className="relative w-full bg-[#faf8f5] text-[#1a1a1a]">
        <section className="relative flex min-h-screen w-full items-center justify-center px-6 pt-32 pb-12 text-center sm:pt-40">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-black/50 sm:text-xs">
              Anyone. Anywhere.
            </p>
            <h1 className="mb-6 font-serif text-5xl font-light leading-tight text-[#1a1a1a] sm:text-6xl md:text-8xl">
              Make the <span className="italic">Sign.</span>
            </h1>
            <p className="text-base text-black/60 sm:text-lg md:text-xl">
              Four steps. One gesture that says: I see you.
            </p>
          </div>
        </section>

        <SignSteps />

        <section className="relative flex min-h-[80vh] w-full items-center justify-center px-6 py-20 text-center sm:py-24">
          <div className="max-w-2xl">
            <h2 className="mb-8 font-serif text-3xl font-light italic leading-tight text-[#1a1a1a] sm:text-4xl md:text-6xl">
              Now you know — pass it on.
            </h2>
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
