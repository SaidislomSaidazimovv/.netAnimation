import CardStack from '@/components/CardStack';
import FinalCTA from '@/components/FinalCTA';
import ProgressIndicator from '@/components/ProgressIndicator';
import SmoothScroll from '@/components/SmoothScroll';
import TopNav from '@/components/TopNav';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full">
        <TopNav />
        <ProgressIndicator />
        <CardStack />
        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
