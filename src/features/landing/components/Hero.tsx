'use client';

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MetricCard, MetricData } from '@/shared/components/ui/MetricCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/shared/lib/utils';

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
        description: "mayor productividad en pymes con IA",
        detailedDescription: "Las pymes que han incorporado IA en sus procesos alcanzan 2,4 veces mayor productividad que sus pares rezagados, demostrando una ventaja competitiva significativa.",
        source: "Accenture, 2024"
    },
    {
        statistic: "91%",
        description: "de PyMEs incrementaron su facturación con IA",
        detailedDescription: "El 91% de las pymes que adoptaron IA afirman que esta ha incrementado su facturación, ayudando a atraer y convertir más clientes potenciales.",
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
    const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);

    const handleCTAClick = () => {
        scrollToElement('contact');
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0A0A0A] pt-32 pb-16 lg:pt-20 transition-colors duration-300"
        >
            {/* Unified Video-Like Fluid Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none bg-white dark:bg-[#0A0A0A]">
                <div className="absolute inset-0 bg-grid-pattern animate-bg-grid opacity-30 dark:opacity-20 z-0" />

                {/* Flowing Unified Light */}
                <div
                    className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-fluid-bg opacity-10 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen blur-[80px]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.4) 0%, transparent 40%),
                            radial-gradient(circle at 80% 40%, rgba(245, 158, 11, 0.4) 0%, transparent 40%),
                            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                            radial-gradient(circle at 70% 90%, rgba(251, 191, 36, 0.3) 0%, transparent 40%)
                        `
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white dark:from-[#0A0A0A]/40 dark:via-transparent dark:to-[#0A0A0A] z-0 pointer-events-none" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8 text-center lg:text-left pt-8 flex flex-col items-center lg:items-start"
                    >
                        <motion.div variants={itemVariants} className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-dark-950 dark:text-white tracking-tight leading-[1.1]">
                                Digitaliza tu empresa con{' '}
                                <br className="hidden md:block" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-orange text-glow">
                                    software a medida
                                </span>{' '}
                                mediante la inteligencia artificial.
                            </h1>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col gap-4 text-center lg:text-left">
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm sm:text-base mb-2">
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <span className="text-brand-cyan mr-2">🤖</span>
                                    Agentes de Atención 24/7
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <span className="text-brand-orange mr-2">💻</span>
                                    Webs y Sistemas Internos
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <span className="text-brand-cyan mr-2">📈</span>
                                    Escalabilidad Garantizada
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full mt-4">
                            <motion.button
                                onClick={handleCTAClick}
                                className="btn-primary text-lg group flex-1 md:flex-none shadow-brand-orange/30 dark:shadow-brand-orange/20 relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    Descubrir Cómo Funciona
                                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
                                </span>
                            </motion.button>

                            <motion.a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary text-lg text-center flex-1 md:flex-none flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Hablar con un Asesor
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="hidden lg:grid grid-cols-2 gap-6 relative"
                    >
                        {/* Decorative background element behind cards */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-brand-orange/5 rounded-3xl transform rotate-3 scale-105 -z-10 blur-xl dark:from-brand-cyan/10 dark:to-brand-orange/10" />

                        {metricsData.map((metric, i) => (
                            <motion.div
                                key={i}
                                className="transform perspective-1000"
                                whileHover={{ scale: 1.02, rotateY: i % 2 === 0 ? 2 : -2, rotateX: 2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <MetricCard metric={metric} onClick={() => setSelectedMetric(metric)} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Stats Modal Rendered Out of Flow */}
            <AnimatePresence>
                {selectedMetric && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                        onClick={() => setSelectedMetric(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-brand-cyan/20 rounded-2xl p-8 max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl dark:shadow-none mx-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMetric(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-dark-950 dark:text-gray-400 dark:hover:text-white transition-colors"
                                aria-label="Cerrar"
                            >
                                <X size={24} />
                            </button>
                            <h4 className="text-xl font-bold text-dark-950 dark:text-white mb-4">Estadística de IA Empresarial</h4>
                            <div className="text-center mb-6">
                                <p className="text-5xl font-bold text-gold-gradient mb-2">{selectedMetric.statistic}</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-dark-950 dark:text-white mb-1">Descripción</h5>
                                    <p className="text-gray-600 dark:text-gray-300">{selectedMetric.detailedDescription}</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-dark-950 dark:text-white mb-1">Fuente</h5>
                                    <p className="text-gray-500 dark:text-gray-400 italic">{selectedMetric.source}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
