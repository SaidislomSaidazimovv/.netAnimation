import CardStack from '@/components/CardStack';
import Experience from '@/components/Experience';
import FinalCTA from '@/components/FinalCTA';
import ProgressIndicator from '@/components/ProgressIndicator';
import SmoothScroll from '@/components/SmoothScroll';
import TopNav from '@/components/TopNav';

export default function Home() {
  return (
    <SmoothScroll>
      <Experience />
      <main className="relative w-full">
        <TopNav />
        <ProgressIndicator />
        <CardStack />
        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
