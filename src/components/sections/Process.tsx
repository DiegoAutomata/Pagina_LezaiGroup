'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PlayIcon, ClockIcon, CogIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

// Process steps data
const processSteps = [
  {
    icon: ClockIcon,
    title: 'Consulta Estratégica',
    description: 'Analizamos tu negocio y identificamos oportunidades de automatización con mayor ROI.',
    duration: '30 min',
  },
  {
    icon: CogIcon,
    title: 'Diseño e Implementación',
    description: 'Desarrollamos y configuramos tus agentes IA y workflows personalizados.',
    duration: '10-14 días',
  },
  {
    icon: RocketLaunchIcon,
    title: 'Lanzamiento y Optimización',
    description: 'Desplegamos tu sistema y lo optimizamos continuamente para máximo rendimiento.',
    duration: 'Ongoing',
  },
];

export function Process() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="process"
      className="py-24 bg-gradient-to-b from-dark-950 to-dark-900"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium">
              <PlayIcon className="w-4 h-4 mr-2" />
              Nuestro Proceso Probado
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Cómo <span className="text-gold-gradient">Transformamos</span> tu Negocio
            </h2>
          </motion.div>

          {/* Process steps */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Nuestro Proceso en <span className="text-gold-gradient">3 Pasos</span>
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Desde la consulta inicial hasta el lanzamiento, te acompañamos en cada etapa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="card-premium text-center space-y-6 relative flex flex-col h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center text-dark-950 font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center pt-4">
                      <div className="w-16 h-16 bg-gold-500/10 rounded-xl flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-gold-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 flex-grow">
                      <h4 className="text-xl font-display font-semibold text-white">
                        {step.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-sm">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {step.duration}
                      </div>
                    </div>
                  </div>

                  {/* Connection line (except for last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gold-500 to-transparent transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-dark-800/50 border border-gold-500/20 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                ¿Listo para <span className="text-gold-gradient">Automatizar</span> tu Negocio?
              </h3>
              <p className="text-gray-300 mb-6">
                Programa una consulta estratégica gratuita y descubre cómo podemos 
                generar resultados medibles en tu empresa
              </p>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Programa tu Consulta Gratis
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 