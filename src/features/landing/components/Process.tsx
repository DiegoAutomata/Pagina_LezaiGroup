'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PlayIcon, ClockIcon, CogIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const processSteps = [
    {
        icon: ClockIcon,
        title: 'Platicamos 30 minutos',
        description: 'Entendemos tu negocio sin tecnicismos. Nos cuentas qué te quita más tiempo y cómo trabajas actualmente.',
        duration: '30 min',
    },
    {
        icon: CogIcon,
        title: 'Diseñamos tu solución',
        description: 'Específica para lo que TÚ necesitas. No usamos plantillas genéricas - cada negocio es único.',
        duration: '1-2 semanas',
    },
    {
        icon: RocketLaunchIcon,
        title: 'Te enseñamos a usarla',
        description: 'Sin dejarte solo con un manual. Te acompañamos hasta que te sientas cómodo manejándolo.',
        duration: 'Hasta que domines',
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
            },
        },
    };

    return (
        <section
            id="process"
            className="py-24 bg-gray-50 dark:bg-gradient-to-b dark:from-dark-950 dark:to-dark-900 transition-colors duration-300"
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
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-dark-950 dark:text-white text-center">
                            El paso a paso que seguimos con <span className="text-gold-gradient">nuestros clientes.</span>
                        </h2>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-12">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="relative flex"
                                >
                                    <div className="spotlight-card bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-brand-cyan/20 rounded-2xl p-8 hover:border-brand-cyan/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-cyan/10 text-center space-y-6 flex flex-col w-full shadow-sm dark:shadow-none mt-4">
                                        <div className="flex justify-center pt-2">
                                            <div className="w-16 h-16 bg-brand-cyan/10 rounded-xl flex items-center justify-center">
                                                <step.icon className="w-8 h-8 text-brand-orange" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 flex-grow flex flex-col">
                                            <h4 className="text-xl font-display font-semibold text-dark-950 dark:text-white">
                                                {step.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                                                {step.description}
                                            </p>
                                            <div className="pt-4 mt-auto">
                                                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-orange/10 dark:bg-brand-orange/5 border border-brand-orange/50 text-brand-orange dark:text-brand-orange font-extrabold text-sm shadow-[0_0_15px_rgba(212,175,55,0.4)] focus:outline-none">
                                                    <ClockIcon className="w-4 h-4 mr-1.5" />
                                                    {step.duration}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {index < processSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-[60%] -right-4 w-8 h-px bg-gradient-to-r from-gold-500 to-transparent" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                        <div className="bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-brand-cyan/20 rounded-2xl p-8 max-w-3xl mx-auto shadow-sm dark:shadow-none">
                            <h3 className="text-2xl font-display font-bold text-dark-950 dark:text-white mb-4">
                                <span className="text-gold-gradient">✅ En 1-2 semanas</span> ya tienes todo funcionando
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                🤝 Te acompañamos hasta que te sientas cómodo usándolo<br />
                                💬 Platicamos sin compromiso sobre tu situación específica
                            </p>
                            <motion.button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-primary text-lg px-8 py-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Quiero Platicar Mi Situación
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
