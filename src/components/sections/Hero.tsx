'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Lazy load MetricCard component (not critical for FCP)
const MetricCard = dynamic(() => import('@/components/ui/MetricCard').then(mod => ({ default: mod.MetricCard })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-dark-800/50 rounded-xl h-32" />
});

export interface MetricData {
  statistic: string;
  description: string;
  detailedDescription: string;
  source: string;
}

const metricsData: MetricData[] = [
  {
    statistic: "$3.7 ROI",
    description: "por cada $1 invertido en IA Generativa",
    detailedDescription: "Un estudio de IDC muestra que por cada dólar que las organizaciones invierten en IA generativa, obtienen un retorno promedio de 3,70 dólares, revelando el potencial de la IA para transformar procesos empresariales.",
    source: "Microsoft Official Blog, 2024"
  },
  {
    statistic: "2.4x",
    description: "mayor productividad en empresas líderes con IA",
    detailedDescription: "Las empresas líderes que han incorporado IA en sus procesos alcanzan 2,4 veces mayor productividad que sus pares rezagados, demostrando una ventaja competitiva significativa.",
    source: "Accenture, 2024"
  },
  {
    statistic: "91%",
    description: "de PyMEs incrementaron su facturación con IA",
    detailedDescription: "El 91% de las pequeñas y medianas empresas que adoptaron IA afirman que esta ha incrementado su facturación, ayudando a atraer y convertir más clientes potenciales.",
    source: "Salesforce, 2024"
  },
  {
    statistic: "74%",
    description: "de proyectos de IA cumplen o superan expectativas",
    detailedDescription: "El 74% de las organizaciones reporta que sus proyectos con IA generativa y automatización han cumplido o superado los beneficios esperados, validando la eficacia de la inversión.",
    source: "Accenture, 2024"
  }
];

export function Hero() {
  const handleCTAClick = () => {
    scrollToElement('contact');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-32 pb-16 lg:pt-20"
    >
      {/* Simplified background elements - deferred for LCP */}
      <div className="absolute inset-0 overflow-hidden opacity-0 animate-fade-in" style={{animationDelay: '1s'}}>
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content - optimized for immediate LCP */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text content - critical LCP element */}
          <div className="space-y-8 text-center lg:text-left pt-8">
            {/* Main headline - LCP optimized */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                Inteligencia Artificial{' '}
                <span className="text-gold-gradient">a medida</span> para tu Negocio
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                Desarrollamos soluciones de IA que se integran a tus operaciones, automatizando procesos y generando un crecimiento exponencial.
              </p>
            </div>

            {/* Key benefits - fade in after LCP */}
            <div className="animate-fade-in-left" style={{animationDelay: '0.3s'}}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm sm:text-base">
                <div className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2.5">✓</span>
                  Consulta gratis 30 min
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2.5">✓</span>
                  Habla directamente con nuestro desarrollador
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2.5">✓</span>
                  Sin compromisos
                </div>
              </div>
            </div>

            {/* CTA buttons - fade in after LCP */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-left" style={{animationDelay: '0.5s'}}>
              <button
                onClick={handleCTAClick}
                className="btn-primary text-lg px-10 py-4 group hover:scale-105 active:scale-95 transition-transform"
              >
                Agendar Asesoría Gratuita
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
              </button>
              
              <button
                onClick={() => scrollToElement('process')}
                className="btn-secondary text-lg px-10 py-4 hover:scale-105 active:scale-95 transition-transform"
              >
                Ver Nuestro Proceso
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Metrics - deferred for LCP */}
          <div className="hidden lg:grid grid-cols-2 gap-6 animate-fade-in-right" style={{animationDelay: '0.8s'}}>
            {metricsData.map((metric, i) => (
              <MetricCard key={i} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 