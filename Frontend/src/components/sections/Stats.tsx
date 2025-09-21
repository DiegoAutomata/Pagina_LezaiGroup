'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ClockIcon, ChatBubbleLeftRightIcon, ChartBarIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  icon: React.ElementType;
  quote: string;
  context?: string;
}

const testimonials: Testimonial[] = [
  {
    icon: ClockIcon,
    quote: "Recuperé 20 horas semanales que ahora uso para vender más",
    context: "Dueño de agencia de marketing"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    quote: "Mis clientes reciben respuesta inmediata, incluso a medianoche",
    context: "Consultora independiente"
  },
  {
    icon: ChartBarIcon,
    quote: "Subí mis ventas 35% sin contratar a nadie nuevo",
    context: "E-commerce de productos naturales"
  },
  {
    icon: EyeIcon,
    quote: "Por fin puedo tomarme vacaciones sin que se caiga todo",
    context: "Estudio de arquitectura familiar"
  }
];

export function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      },
    },
  };

  return (
    <section
      id="stats"
      className="py-20 bg-gradient-to-b from-dark-900 to-dark-950"
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
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Lo Que{' '}
              <span className="text-gold-gradient">Nuestros Clientes</span>{' '}
              Nos Dicen
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Historias reales de empresarios que ya automatizaron lo que más tiempo les quitaba
            </p>
          </motion.div>

          {/* Testimonials grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-dark-800/50 border border-gold-500/10 rounded-2xl p-6 text-center space-y-4 hover:border-gold-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mx-auto">
                  <testimonial.icon className="w-6 h-6 text-gold-400" />
                </div>

                <blockquote className="text-white font-medium text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {testimonial.context && (
                  <p className="text-sm text-gray-400 italic">
                    {testimonial.context}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Métricas consolidadas */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-dark-800/50 border border-gold-500/20 rounded-2xl p-8 max-w-6xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-white mb-8">
                Resultados que <span className="text-gold-gradient">Hablan por Sí Solos</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">X2</div>
                  <div className="text-sm text-gray-300">Más ventas sin contratar personal</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">+25 hs</div>
                  <div className="text-sm text-gray-300">Recuperadas por semana</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">1-2 sem</div>
                  <div className="text-sm text-gray-300">Tiempo de implementación</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">24/7</div>
                  <div className="text-sm text-gray-300">Funciona sin parar</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">100%</div>
                  <div className="text-sm text-gray-300">Consulta gratuita</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Credibility section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-2xl font-display font-bold text-white">
                ¿Por Qué Empresarios Como Tú{' '}
                <span className="text-gold-gradient">Confían en Nosotros?</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="text-white font-semibold">Hablamos tu idioma:</span> Sin tecnicismos ni palabras complicadas
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="text-white font-semibold">Entendemos tu negocio:</span> Somos empresarios ayudando a empresarios
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="text-white font-semibold">Precios claros:</span> Sin sorpresas ni costos ocultos
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="text-white font-semibold">Garantía real:</span> Si no funciona, lo arreglamos o te devolvemos tu dinero
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}