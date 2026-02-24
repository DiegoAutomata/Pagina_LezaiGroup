'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { ContactForm } from '@/shared/components/ui/ContactForm';

export function Contact() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-950 relative overflow-hidden transition-colors duration-300">
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-dark-950 dark:text-white mb-6">
                        ¿Listo Para Recuperar Tu Tiempo?{' '}
                        <span className="text-gold-gradient">Platicamos Gratis 30 Minutos</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                        Completa el formulario y hablemos de tu situación específica.
                        Sin presión, sin compromisos, solo una conversación honesta sobre cómo puedes automatizar lo que más tiempo te quita.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="glass p-8 rounded-2xl"
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-dark-950 dark:text-white mb-2">
                                    Cuéntanos Tu Situación
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    📞 Hablas directo con Diego, el desarrollador • ⏰ Respuesta garantizada en menos de 24 horas
                                </p>
                            </div>

                            <ContactForm />
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-white dark:bg-dark-800/10 border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-sm dark:shadow-none"
                        >
                            <h3 className="text-xl font-bold text-dark-950 dark:text-white mb-6">
                                💬 Contacto Personal
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-brand-cyan to-brand-orange rounded-lg flex items-center justify-center">
                                        <EnvelopeIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                                        <a href="mailto:contacto@lezaigroup.com" className="text-dark-950 dark:text-white hover:text-brand-cyan transition-colors">contacto@lezaigroup.com</a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-brand-cyan to-brand-orange rounded-lg flex items-center justify-center">
                                        <ClockIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Horario</p>
                                        <p className="text-dark-950 dark:text-white">Lun-Vie 9:00-18:00 (GMT-3)</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
