'use client';

import { useEffect, useState } from 'react';
import { cards } from '@/lib/cards-data';

export default function ProgressIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const index = Math.min(
        cards.length - 1,
        Math.max(0, Math.round(scrollY / viewportHeight))
      );
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 sm:right-6 md:right-10 md:block">
      <div className="flex flex-col items-center gap-3">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="flex flex-col items-center"
            aria-label={card.bigText}
          >
            <div
              className="h-2 w-2 rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  i === activeIndex ? card.accent : 'rgba(255,255,255,0.3)',
                transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
