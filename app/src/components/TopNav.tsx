'use client';

export default function TopNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6">
      <div className="flex items-center gap-2">
        <span className="font-serif text-sm font-medium tracking-wide text-white sm:text-base md:text-lg">
          Butterfly Challenge
        </span>
      </div>
      <a
        href="https://butterflychallenge.net"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10 sm:px-5 sm:text-xs"
      >
        Learn More
      </a>
    </nav>
  );
}
