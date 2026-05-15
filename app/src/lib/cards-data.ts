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
      from: '#5EEAD4',
      to: '#134E4A',
    },
    accent: '#5EEAD4',
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
      from: '#F59E0B',
      to: '#92400E',
    },
    accent: '#F59E0B',
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
      from: '#9CA3AF',
      to: '#374151',
    },
    accent: '#9CA3AF',
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
      from: '#3B82F6',
      to: '#1E3A8A',
    },
    accent: '#3B82F6',
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
      from: '#10B981',
      to: '#064E3B',
    },
    accent: '#10B981',
  },
];
