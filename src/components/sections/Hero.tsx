'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon, BoltIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/lib/utils';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const floatingIconVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

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
            className="space-y-8 text-center lg:text-left"
          >
            {/* Main headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                Inteligencia Artificial{' '}
                <span className="text-gold-gradient">a medida</span> para tu Negocio
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                Desarrollamos soluciones de IA que se integran a tus operaciones, automatizando procesos y generando un crecimiento exponencial.
              </p>
            </motion.div>

            {/* Key benefits */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm sm:text-base">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mr-2.5" />
                  Resultados garantizados en 60 dias
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mr-2.5" />
                  Atención al cliente 24/7
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mr-2.5" />
                  Implementación en 14 días
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
                Agendar Asesoría Gratuita
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
              </motion.button>
              
              <motion.button
                onClick={() => scrollToElement('process')}
                className="btn-secondary text-lg px-10 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Nuestro Proceso
              </motion.button>
            </motion.div>


          </motion.div>

          {/* Right Column: Metrics (Placeholder) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants} className="glass p-6 rounded-2xl text-center">
              <p className="text-gray-400">Métrica 1</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass p-6 rounded-2xl text-center">
              <p className="text-gray-400">Métrica 2</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass p-6 rounded-2xl text-center">
              <p className="text-gray-400">Métrica 3</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass p-6 rounded-2xl text-center">
              <p className="text-gray-400">Métrica 4</p>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  );
} 