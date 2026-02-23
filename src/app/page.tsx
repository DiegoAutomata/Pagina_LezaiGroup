import { Header } from '@/shared/components/layout/Header';
import { Footer } from '@/shared/components/layout/Footer';
import { ScrollIndicator } from '@/shared/components/ui/ScrollIndicator';
import { Hero } from '@/features/landing/components/Hero';
import { Stats } from '@/features/landing/components/Stats';
import { Benefits } from '@/features/landing/components/Benefits';
import { Process } from '@/features/landing/components/Process';
import { FAQ } from '@/features/landing/components/FAQ';
import { Contact } from '@/features/landing/components/Contact';

export default function Home() {
  return (
    <>
      <ScrollIndicator />
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Benefits />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
