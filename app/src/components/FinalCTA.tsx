'use client';

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-black px-5 py-20 text-center sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/60 sm:mb-4 sm:text-xs">
          One Gesture. Any Language. Anywhere in the World.
        </p>
        <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-white sm:text-4xl md:mb-8 md:text-6xl">
          Lift a Billion Hands
          <br />
          <span className="italic">for Mental Health.</span>
        </h2>
        <p className="mb-8 text-sm text-white/70 sm:text-base md:mb-12 md:text-lg">
          The Butterfly Sign is how you show up when you do not have the words.
        </p>
        <a
          href="https://butterflychallenge.net"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-white px-8 py-3 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-white/90 sm:px-10 sm:py-4 sm:text-sm"
        >
          Join the Movement
        </a>
      </div>
    </section>
  );
}
