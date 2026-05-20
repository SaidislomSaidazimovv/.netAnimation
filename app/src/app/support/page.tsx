import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import TopNav from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'Support — Butterfly Challenge',
  description:
    'Crisis lines and mental health resources around the world. You are not alone.',
};

type Helpline = {
  region: string;
  flag: string;
  lines: { name: string; contact: string; href?: string }[];
};

const HELPLINES: Helpline[] = [
  {
    region: 'International',
    flag: '🌍',
    lines: [
      {
        name: 'Find A Helpline',
        contact: 'findahelpline.com',
        href: 'https://findahelpline.com',
      },
      {
        name: 'Befrienders Worldwide',
        contact: 'befrienders.org',
        href: 'https://www.befrienders.org',
      },
      {
        name: 'IASP Crisis Centres',
        contact: 'iasp.info/resources/Crisis_Centres',
        href: 'https://www.iasp.info/resources/Crisis_Centres/',
      },
    ],
  },
  {
    region: 'United States',
    flag: '🇺🇸',
    lines: [
      { name: '988 Suicide & Crisis Lifeline', contact: 'Call or text 988' },
      { name: 'Crisis Text Line', contact: 'Text HOME to 741741' },
    ],
  },
  {
    region: 'United Kingdom',
    flag: '🇬🇧',
    lines: [
      { name: 'Samaritans', contact: '116 123' },
      { name: 'Shout', contact: 'Text SHOUT to 85258' },
    ],
  },
  {
    region: 'Canada',
    flag: '🇨🇦',
    lines: [
      { name: 'Talk Suicide Canada', contact: '1-833-456-4566' },
      { name: 'Kids Help Phone', contact: '1-800-668-6868' },
    ],
  },
  {
    region: 'Australia',
    flag: '🇦🇺',
    lines: [
      { name: 'Lifeline', contact: '13 11 14' },
      { name: 'Beyond Blue', contact: '1300 22 4636' },
    ],
  },
  {
    region: 'India',
    flag: '🇮🇳',
    lines: [
      { name: 'iCall', contact: '+91 9152987821' },
      { name: 'Vandrevala Foundation', contact: '1860 2662 345' },
    ],
  },
  {
    region: 'Uzbekistan',
    flag: '🇺🇿',
    lines: [
      { name: 'Trust Phone', contact: '1163' },
      { name: 'Emergency', contact: '112' },
    ],
  },
];

export default function SupportPage() {
  return (
    <SmoothScroll>
      <TopNav />
      <main className="relative w-full bg-[#faf8f5] text-[#1a1a1a]">
        <section className="relative flex min-h-[80vh] w-full items-center justify-center px-6 pt-32 pb-16 text-center sm:pt-40">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-black/50 sm:text-xs">
              You are not alone.
            </p>
            <h1 className="mb-6 font-serif text-5xl font-light leading-tight text-[#1a1a1a] sm:text-6xl md:text-8xl">
              <span className="italic">Support.</span>
            </h1>
            <p className="text-base text-black/60 sm:text-lg md:text-xl">
              If you or someone you care about needs help, reach out.
              Below are crisis lines around the world.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {HELPLINES.map((h) => (
              <div
                key={h.region}
                className="rounded-2xl border border-black/10 bg-white/60 p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {h.flag}
                  </span>
                  <h2 className="font-serif text-2xl font-light italic text-[#1a1a1a] sm:text-3xl">
                    {h.region}
                  </h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {h.lines.map((l) => (
                    <li
                      key={l.name}
                      className="flex flex-col gap-1 border-t border-black/5 pt-3 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <span className="text-sm font-medium text-[#1a1a1a] sm:text-base">
                        {l.name}
                      </span>
                      {l.href ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#14B8A6] hover:underline sm:text-base"
                        >
                          {l.contact}
                        </a>
                      ) : (
                        <span className="text-sm text-black/70 sm:text-base">
                          {l.contact}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-xs text-black/50 sm:text-sm">
            If you are in immediate danger, please call your local emergency
            number.
          </p>
        </section>
      </main>
    </SmoothScroll>
  );
}
