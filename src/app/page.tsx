import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero'; // Crítico para LCP - cargar inmediatamente
import { Benefits } from '@/components/sections/Benefits'; // Crítico para above-fold - cargar inmediatamente
import dynamic from 'next/dynamic';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

// Lazy loading optimizado - solo para componentes below-the-fold
const Process = dynamic(
  () => import('@/components/sections/Process').then(mod => mod.Process), 
  { 
    ssr: false, // No crítico para initial load
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-gold-400">Cargando...</div>
      </div>
    )
  }
);

const Contact = dynamic(
  () => import('@/components/sections/Contact').then(mod => mod.Contact), 
  { 
    ssr: false, // Form no crítico para SEO
    loading: () => (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-gold-400">Cargando formulario...</div>
      </div>
    )
  }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950 custom-scrollbar relative">
      {/* Premium UI Components */}
      <ScrollIndicator />

      {/* Header with navigation - crítico */}
      <Header />
      
      {/* Hero section - crítico para LCP */}
      <Hero />
      
      {/* Benefits section - visible above fold */}
      <Benefits />

      {/* Process section - lazy loaded */}
      <Process />
      
      {/* Contact form section - lazy loaded */}
      <Contact />
      
      {/* Footer - estático, no necesita optimización */}
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
