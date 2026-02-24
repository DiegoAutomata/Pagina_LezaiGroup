'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "¿Y si mi negocio es muy particular/único?",
        answer: "Cada negocio es único. Por eso hablamos contigo primero para entender exactamente qué necesitas. No usamos plantillas genéricas - diseñamos tu solución específica para cómo trabajas tú."
    },
    {
        question: "¿Cuánto cuesta realmente? ¿Hay costos ocultos?",
        answer: "Te damos el precio completo desde el día 1. Sin sorpresas ni 'ah, se nos olvidó mencionar esto'. El precio que te cotizamos incluye desarrollo, implementación y soporte inicial."
    },
    {
        question: "¿Qué pasa si algo no funciona o no me gusta?",
        answer: "Simple: lo arreglamos gratis o te devolvemos tu dinero. Así de fácil. Trabajamos hasta que estés 100% satisfecho con los resultados."
    },
    {
        question: "¿Necesito ser un experto en tecnología?",
        answer: "Para nada. Si sabes usar WhatsApp, puedes usar esto. Te enseñamos todo paso a paso y te acompañamos hasta que te sientas cómodo manejándolo solo."
    },
    {
        question: "¿Cuánto tiempo necesito dedicarle?",
        answer: "Casi nada. 30 minutos para explicarnos cómo trabajas, y nosotros nos encargamos del resto. Una vez funcionando, el sistema trabaja solo - tú solo tienes que revisar los resultados."
    },
    {
        question: "¿Funciona para pymes o solo para grandes?",
        answer: "Especialmente para pymes. Las grandes ya tienen equipos de TI. Nosotros le damos a tu PyME las mismas herramientas que usan las empresas grandes, pero adaptadas a tu tamaño y presupuesto."
    }
];

export function FAQ() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section
            id="faq"
            className="py-24 bg-gray-50 dark:bg-gradient-to-b dark:from-dark-950 dark:to-dark-900 transition-colors duration-300"
            ref={ref}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="space-y-12"
                >
                    <motion.div variants={itemVariants} className="text-center space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-dark-950 dark:text-white">
                            Las Preguntas Que Siempre{' '}
                            <span className="text-gold-gradient">Nos Hacen</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            (Con Respuestas Honestas)
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4">
                        {faqData.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-brand-cyan/10 rounded-2xl overflow-hidden hover:border-brand-cyan/30 transition-all duration-300 shadow-sm dark:shadow-none"
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 rounded-2xl"
                                >
                                    <h3 className="text-lg font-semibold text-dark-950 dark:text-white pr-4">
                                        {item.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        {openItems.includes(index) ? (
                                            <MinusIcon className="w-6 h-6 text-brand-orange" />
                                        ) : (
                                            <PlusIcon className="w-6 h-6 text-brand-orange" />
                                        )}
                                    </div>
                                </button>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openItems.includes(index) ? 'auto' : 0,
                                        opacity: openItems.includes(index) ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-6 border-t border-gray-100 dark:border-brand-cyan/5 pt-4">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                        <div className="bg-white dark:bg-brand-cyan/5 border border-gray-200 dark:border-brand-cyan/20 rounded-2xl p-8 shadow-sm dark:shadow-none">
                            <h3 className="text-2xl font-display font-bold text-dark-950 dark:text-white mb-4">
                                ¿Tienes Otras Preguntas?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Prefiero resolver todas tus dudas antes de que tomes cualquier decisión.{' '}
                                <span className="text-brand-orange font-semibold">
                                    Escríbeme directamente y te respondo en menos de 24 horas.
                                </span>
                            </p>
                            <motion.button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-primary text-lg px-8 py-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Hacer Mi Pregunta Específica
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
