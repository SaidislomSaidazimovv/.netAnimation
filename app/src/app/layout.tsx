import type { Metadata } from 'next';
import { Inter, Fraunces, Anton } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const anton = Anton({
  variable: '--font-anton',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Butterfly Challenge — Anyone. Anywhere.',
  description:
    'The Butterfly Sign is how you show up for mental health. One gesture. Any language. Anywhere in the world.',
  openGraph: {
    title: 'Butterfly Challenge — Anyone. Anywhere.',
    description:
      'The Butterfly Sign is how you show up for mental health.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${anton.variable} antialiased`}
    >
      <body className="bg-[#faf8f5] text-[#1a1a1a]">{children}</body>
    </html>
  );
}
