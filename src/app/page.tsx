import { Header } from '@/components/sections/Header';
import dynamic from 'next/dynamic';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

// Lazy loading para componentes pesados que mejora la performance
const Hero = dynamic(() => import('@/components/sections/Hero').then(mod => mod.Hero), { 
  ssr: true // Mantener SSR para SEO pero cargar de forma optimizada
});
const Process = dynamic(() => import('@/components/sections/Process').then(mod => mod.Process), { 
  ssr: false // No crítico para initial load
});
const Benefits = dynamic(() => import('@/components/sections/Benefits').then(mod => mod.Benefits), { 
  ssr: true // Importante para SEO
});
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact), { 
  ssr: false // Ya estaba implementado
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
