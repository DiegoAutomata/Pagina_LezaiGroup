import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Benefits } from '@/components/sections/Benefits';
import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact), { ssr: false });
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';


import { ChatBot } from '@/components/ui/ChatBot';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950 custom-scrollbar relative">
      {/* Premium UI Components */}
      <ScrollIndicator />


      
      {/* AI Chatbot Assistant */}
      <ChatBot />
      
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
