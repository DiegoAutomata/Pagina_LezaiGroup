import { Header } from '@/components/sections/Header';
import dynamic from 'next/dynamic';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

// Lazy load heavy components for better performance
const Hero = dynamic(() => import('@/components/sections/Hero').then(mod => ({ default: mod.Hero })), { 
  ssr: true, // Critical above-the-fold content
  loading: () => <div className="h-screen bg-dark-950 animate-pulse" />
});

// Below-the-fold components - no SSR to reduce initial bundle
const Benefits = dynamic(() => import('@/components/sections/Benefits').then(mod => ({ default: mod.Benefits })), { 
  ssr: false, // Load only on client to reduce main thread work
  loading: () => <div className="h-96 bg-dark-950 animate-pulse flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-gold-500"></div></div>
});

const Process = dynamic(() => import('@/components/sections/Process').then(mod => ({ default: mod.Process })), { 
  ssr: false, // Heavy video component - client-only
  loading: () => <div className="h-96 bg-dark-950 animate-pulse flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-gold-500"></div></div>
});

const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => ({ default: mod.Contact })), { 
  ssr: false, // Form interactions - client-only
  loading: () => <div className="h-96 bg-dark-950 animate-pulse flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-gold-500"></div></div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950 custom-scrollbar relative">
      {/* Premium UI Components */}
      <ScrollIndicator />
      
      {/* Header with navigation */}
      <Header />
      
      {/* Hero section */}
      <Hero />
      
      {/* Benefits section */}
      <Benefits />

      {/* Process section with video */}
      <Process />
      
      {/* Contact form section */}
      <Contact />
      
      {/* Footer */}
      <footer className="bg-dark-950 border-t border-gold-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-display font-bold text-gold-gradient">
              Lezai<span className="text-white">Group</span>
            </h3>
            <p className="text-gray-400">
              Inteligencia Artificial a medida para tu Negocio
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>&#169; 2024 LezaiGroup. Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
