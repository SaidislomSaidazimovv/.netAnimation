export interface CardData {
  id: number;
  bigText: string;
  title: string;
  subtitle: string;
  quote: string;
  image: string;
  alt: string;
  gradient: {
    from: string;
    to: string;
  };
  accent: string;
}

export const cards: CardData[] = [
  {
    id: 1,
    bigText: 'TEEN',
    title: 'The first sign',
    subtitle: "Mental health doesn't wait until you're older.",
    quote: 'The Butterfly Sign — for anyone, at any age.',
    image: '/cards/card_1_teen.png',
    alt: 'A young teenager making the Butterfly Sign',
    gradient: {
      from: '#CFF8EF',
      to: '#5EEAD4',
    },
    accent: '#14B8A6',
  },
  {
    id: 2,
    bigText: 'STRONG',
    title: 'Showing up is strength',
    subtitle: 'Athletes show what strength looks like.',
    quote: 'Even the strongest need to be seen.',
    image: '/cards/card_2_strong.png',
    alt: 'An athletic adult making the Butterfly Sign',
    gradient: {
      from: '#FDE9C8',
      to: '#F59E0B',
    },
    accent: '#D97706',
  },
  {
    id: 3,
    bigText: 'TIRED',
    title: "It's okay not to be okay",
    subtitle: 'Sometimes showing up is the hardest thing.',
    quote: 'But it counts. Always.',
    image: '/cards/card_3_tired.png',
    alt: 'A tired adult making the Butterfly Sign',
    gradient: {
      from: '#E2E4E8',
      to: '#9CA3AF',
    },
    accent: '#6B7280',
  },
  {
    id: 4,
    bigText: 'WISE',
    title: 'Carrying others',
    subtitle: "I've seen what silence does.",
    quote: 'Every generation needs this gesture.',
    image: '/cards/card_4_wise.png',
    alt: 'An elderly person making the Butterfly Sign',
    gradient: {
      from: '#C7DCFD',
      to: '#3B82F6',
    },
    accent: '#2563EB',
  },
  {
    id: 5,
    bigText: 'PRESENT',
    title: 'Show up for someone',
    subtitle: 'Show up for someone you care about. That is the call.',
    quote: 'One billion hands. One signal.',
    image: '/cards/card_5_present.png',
    alt: 'Two people sharing the Butterfly Sign',
    gradient: {
      from: '#C7F0DF',
      to: '#10B981',
    },
    accent: '#059669',
  },
];
