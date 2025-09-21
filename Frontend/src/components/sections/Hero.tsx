'use client';

import { motion, Variants } from 'framer-motion';
import { MetricCard, MetricData } from '@/components/ui/MetricCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/lib/utils';

// Simplified animation variants for performance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">


        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-center lg:text-left pt-8"
          >
            {/* Main headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                Automatiza Lo Que Te Quita Más Tiempo y{' '}
                <span className="text-gold-gradient">Recupera 25+ Horas</span> a la Semana
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                Trabajamos solo con empresas que realmente quieren crecer - Cuéntanos tu situación
              </p>
            </motion.div>

            {/* Key benefits */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm sm:text-base">
                <div className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2.5">✅</span>
                  Hablamos en español, sin tecnicismos
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2.5">💬</span>
                  Consulta de 30 min completamente gratis
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-2.5">🤝</span>
                  Sin compromisos ni letra pequeña
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={handleCTAClick}
                className="btn-primary text-lg px-10 py-4 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Quiero Ver Cómo Funciona Para Mi Negocio
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
              </motion.button>

              <motion.button
                onClick={handleCTAClick}
                className="btn-secondary text-lg px-10 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hablar Directo con el Desarrollador
              </motion.button>
            </motion.div>


          </motion.div>

          {/* Right Column: Interactive Metrics */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-6"
          >
            {metricsData.map((metric, i) => (
              <MetricCard key={i} metric={metric} />
            ))}
          </motion.div>
        </div>
      </div>


    </section>
  );
} 