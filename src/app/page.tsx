import { Header } from '@/shared/components/layout/Header';
import { HeaderAuth } from '@/shared/components/layout/HeaderAuth';
import { Footer } from '@/shared/components/layout/Footer';
import { ScrollIndicator } from '@/shared/components/ui/ScrollIndicator';
import { Hero } from '@/features/landing/components/Hero';
import { Stats } from '@/features/landing/components/Stats';
import { Benefits } from '@/features/landing/components/Benefits';
import { Process } from '@/features/landing/components/Process';
import { FAQ } from '@/features/landing/components/FAQ';
import { Contact } from '@/features/landing/components/Contact';
import { createClient } from '@/shared/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthenticated = !!user

  // Si ya está logueado, redirigir directamente a Servicios
  if (isAuthenticated) {
    redirect('/servicios')
  }

  return (
    <>
      <ScrollIndicator />
      <Header authNode={<HeaderAuth />} />
      <main className="flex-1">
        <Hero isAuthenticated={isAuthenticated} />
        <Stats />
        <Benefits />
        <Process isAuthenticated={isAuthenticated} />
        <FAQ isAuthenticated={isAuthenticated} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
