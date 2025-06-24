'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon, 
  Cog8ToothIcon,
  TrophyIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

import type { ElementType } from 'react';

interface Service {
  icon: ElementType;
  title: string;
  subtitle?: string;
  description: string;
  benefits: string[];
  roi?: string;
  color: string;
}

// Main services data (80/20 principle)
const mainServices: Service[] = [
  {
    icon: UserGroupIcon,
    title: 'Agentes de Generacion de clientes',
    description: 'Agentes IA que identifican, califican y nutren prospectos automáticamente',
    benefits: [
      'Creación de contenido con IA',
      'Prospección 24/7 sin descanso',
      'Personalización a escala',
      'Integración con CRM existente',
      'Agente de IA en tu Web para responder consultas'
    ],
    roi: '+400%',
    color: 'from-gold-400 to-gold-600'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Asistente multicanal 24/7',
    subtitle: 'Integración directa con tus sistemas actuales',
    description: 'La misma IA responde en WhatsApp, web, email. Conoce inventario, precios, políticas. Escala a humano cuando es necesario.',
    benefits: [
      'Almacena conversaciones para análisis de datos',
      'Respuestas consistentes',
      'Métricas en tiempo real'
    ],
    roi: undefined,
    color: 'from-gold-500 to-gold-700'
  },
  {
    icon: Cog8ToothIcon,
    title: 'N8N Automations',
    description: 'Workflows inteligentes que conectan todas tus herramientas y procesos',
    benefits: [
      'Procesos completamente automatizados',
      'Integración con +500 apps',
      'Reducción 80% tiempo manual',
      'Reducción de costos operativos',
      'Metricas de el funcionamiento de tu negocio a tu disposición'
    ],
    roi: undefined,
    color: 'from-gold-600 to-gold-800'
  }
];

// Additional benefits data
const additionalBenefits = [
  {
    icon: TrophyIcon,
    title: 'Resultados Garantizados',
    description: 'ROI medible en los primeros 30 días o devolvemos tu inversión',
  },
  {
    icon: ClockIcon,
    title: 'Implementación Rápida',
    description: 'Sistema funcionando en 14 días o menos, sin interrumpir operaciones',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Inversión Recuperable',
    description: 'La mayoría de clientes recuperan su inversión en menos de 60 días',
  },
  {
    icon: ChartBarIcon,
    title: 'Escalabilidad Infinita',
    description: 'Crece sin límites de personal, costos fijos o restricciones geográficas',
  },
];

export function Benefits() {
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
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0
    },
  };

  return (
    <section
      id="benefits"
      className="py-24 bg-gradient-to-b from-dark-900 to-dark-950"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-20"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium">
              <BoltIcon className="w-4 h-4 mr-2" />
              Beneficios Comprobados
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Los <span className="text-gold-gradient">3 Pilares</span> que Transforman Negocios
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nos enfocamos en las 3 automatizaciones que generan el{' '}
              <span className="text-gold-400 font-semibold">80% de los resultados</span>{' '}
              en menos tiempo y con mayor ROI garantizado
            </p>
          </motion.div>

          {/* Main services grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-dark-800/50 p-8 rounded-3xl border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="space-y-4 flex flex-col h-full">
                  <div>
                    <service.icon className="w-10 h-10 text-gold-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="font-semibold text-gray-200">{service.subtitle}</p>
                  )}
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 text-gray-300 pt-2 flex-grow">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-green-500/30 flex-shrink-0 mt-1 mr-3 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-dark-800/50 border border-gold-500/20 rounded-2xl p-8 max-w-5xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-white mb-8">
                Resultados que <span className="text-gold-gradient">Hablan por Sí Solos</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">$ X2</div>
                  <div className="text-sm text-gray-300">Sin contratar mas personal</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">+25 hs</div>
                  <div className="text-sm text-gray-300">ahorradas a la semana</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">24/7</div>
                  <div className="text-sm text-gray-300">Automatización</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gold-400">99%</div>
                  <div className="text-sm text-gray-300">Satisfacción Cliente</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional benefits */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Garantías que <span className="text-gold-gradient">Respaldan</span> tu Inversión
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center space-y-4 p-6 rounded-xl bg-dark-800/30 border border-gold-500/10 hover:border-gold-500/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mx-auto">
                    <benefit.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-3xl font-display font-bold text-white">
                ¿Listo para <span className="text-gold-gradient">Multiplicar</span> tus Resultados?
              </h3>
              <p className="text-lg text-gray-300">
                Únete a las empresas que ya están automatizando sus procesos más críticos 
                y generando resultados 24/7 con nuestros sistemas de IA
              </p>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-lg px-12 py-5 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Programa tu Consulta Estratégica Gratis
                <BoltIcon className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform inline" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 