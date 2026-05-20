export interface Story {
  id: number;
  ageGroup: string;
  quote: string;
  name: string;
  location: string;
  image: string;
  alt: string;
  tint: string; // light pastel background
}

export const stories: Story[] = [
  {
    id: 1,
    ageGroup: 'TEEN',
    quote:
      "The first time I made the Sign was for my brother. He was 14. He still doesn't know I saw him cry.",
    name: 'Mira',
    location: '19, Tashkent',
    image: '/cards/card_1_teen.png',
    alt: 'Teen making the Butterfly Sign',
    tint: '#E8F7F2',
  },
  {
    id: 2,
    ageGroup: 'STRONG',
    quote:
      "Athletes act tough. We're not. Showing the Sign in the gym broke something open.",
    name: 'Daniel',
    location: '28, Berlin',
    image: '/cards/card_2_strong.png',
    alt: 'Athlete making the Butterfly Sign',
    tint: '#FBEFE0',
  },
  {
    id: 3,
    ageGroup: 'TIRED',
    quote:
      "Most days I don't want to be seen. The Sign says: you don't have to explain.",
    name: 'Ana',
    location: '41, Buenos Aires',
    image: '/cards/card_3_tired.png',
    alt: 'Adult making the Butterfly Sign',
    tint: '#EFEFF3',
  },
  {
    id: 4,
    ageGroup: 'WISE',
    quote:
      'I lost my husband to silence. I make the Sign for him every day.',
    name: 'Helga',
    location: '67, Stockholm',
    image: '/cards/card_4_wise.png',
    alt: 'Elderly woman making the Butterfly Sign',
    tint: '#E8F0FB',
  },
  {
    id: 5,
    ageGroup: 'PRESENT',
    quote:
      "We made the Sign together. That was the first time we'd really looked at each other in months.",
    name: 'Jay & Sam',
    location: '24, London',
    image: '/cards/card_5_present.png',
    alt: 'Two people sharing the Butterfly Sign',
    tint: '#E9F4EE',
  },
];
