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
            className="py-20 bg-white dark:bg-gradient-to-b dark:from-dark-900 dark:to-dark-950 transition-colors duration-300"
            ref={ref}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="space-y-16"
                >
                    <motion.div variants={itemVariants} className="text-center space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-950 dark:text-white">
                            Lo Que{' '}
                            <span className="text-gold-gradient">Nuestros Clientes</span>{' '}
                            Nos Dicen
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Historias reales de empresarios que ya automatizaron lo que más tiempo les quitaba
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-brand-cyan/10 rounded-2xl p-6 text-center space-y-4 hover:border-brand-cyan/30 transition-all duration-300 transform hover:-translate-y-1 shadow-sm dark:shadow-none"
                            >
                                <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center mx-auto">
                                    <testimonial.icon className="w-6 h-6 text-brand-orange" />
                                </div>

                                <blockquote className="text-dark-950 dark:text-white font-medium text-lg leading-relaxed">
                                    "{testimonial.quote}"
                                </blockquote>

                                {testimonial.context && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                        {testimonial.context}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                        <div className="bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-brand-cyan/20 rounded-2xl p-8 max-w-6xl mx-auto shadow-sm dark:shadow-none">
                            <h3 className="text-2xl font-display font-bold text-dark-950 dark:text-white mb-8">
                                Resultados que <span className="text-gold-gradient">Hablan por Sí Solos</span>
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-brand-orange">X2</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Más ventas sin contratar personal</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-brand-orange">+25 hs</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Recuperadas por semana</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-brand-orange">1-2 sem</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Tiempo de implementación</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-brand-orange">24/7</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Funciona sin parar</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-brand-orange">100%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">Consulta gratuita</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                </motion.div>
            </div>
        </section>
    );
}
