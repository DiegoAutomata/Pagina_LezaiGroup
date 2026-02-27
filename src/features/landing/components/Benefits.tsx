'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    Cog8ToothIcon,
    BoltIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

import type { ElementType } from 'react';

interface SubService {
    icon: ElementType;
    title: string;
    description: string;
    benefits: string[];
}

interface Service {
    icon?: ElementType;
    title: string;
    subtitle?: string;
    description?: string;
    benefits?: string[];
    roi?: string;
    color: string;
    subServices?: SubService[];
}

const mainServices: Service[] = [
    {
        title: 'Agentes Autónomos de IA',
        subtitle: 'Atención 24/7 sin Contratar Más Personal',
        roi: 'Reduce hasta un 70% los costos operativos y recupera 15 horas semanales',
        color: 'from-brand-cyan to-brand-blue',
        subServices: [
            {
                icon: ChatBubbleLeftRightIcon,
                title: 'Atención al Cliente',
                description: 'Deja de perder prospectos por responder tarde. Resuelve dudas frecuentes y agenda citas en piloto automático.',
                benefits: [
                    'Respuesta inmediata a dudas y ventas',
                    'Soporte multi-idioma internacional',
                    'Empresa abierta 24/7'
                ]
            },
            {
                icon: BoltIcon,
                title: 'Secretario Personal',
                description: 'Secretario virtual con toda la información importante de tu negocio, conectado a las aplicaciones que más utilices e instalado directamente en tu WhatsApp.',
                benefits: [
                    'Alojado directamente en tu WhatsApp',
                    'Sincronizado con tu agenda',
                    'Acceso a base de datos'
                ]
            }
        ]
    },
    {
        title: 'Desarrollo de Software a Medida (Webs y Apps)',
        subtitle: 'Sistemas que Hacen el Trabajo Aburrido por Ti',
        roi: 'Clientes recuperan de 10 a 25 horas semanales por empleado',
        color: 'from-brand-orange to-brand-amber',
        subServices: [
            {
                icon: GlobeAltIcon,
                title: 'Desarrollo de Sitios Web',
                description: 'Sitios web profesionales y atractivos que captan clientes en piloto automático.',
                benefits: [
                    'Pasarela de pagos y tienda online',
                    'Inicios de sesión (Login) para clientes',
                    'Almacenamiento de base de datos completa',
                    'Agente de IA asesor en tiempo real incluido',
                    'Automatizaciones dentro de tu sitio web'
                ]
            },
            {
                icon: DevicePhoneMobileIcon,
                title: 'Desarrollo de Apps',
                description: 'Desarrollamos aplicaciones completas diseñadas desde cero para resolver esos problemas complejos que ninguna herramienta actual soluciona.',
                benefits: [
                    'Sistemas hechos a la medida exacta',
                    'Automatización de procesos ultra-complejos',
                    'Escalabilidad sin límite de usuarios'
                ]
            }
        ]
    }
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
            id="benefits"
            className="py-24 bg-white dark:bg-gradient-to-b dark:from-dark-900 dark:to-dark-950 transition-colors duration-300"
            ref={ref}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="space-y-20"
                >
                    <motion.div variants={itemVariants} className="text-center space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-dark-950 dark:text-white">
                            Transforma tu negocio con <span className="text-gold-gradient">IA y Software de Élite</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Combinamos lo último en inteligencia artificial con desarrollo a medida para{' '}
                            <span className="text-brand-cyan font-semibold">multiplicar la eficiencia de tu equipo</span>{' '}
                            y escalar tus operaciones.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {mainServices.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white dark:bg-dark-800/50 p-8 rounded-3xl border border-gray-200 dark:border-brand-cyan/10 hover:border-brand-cyan/30 transition-all duration-300 transform hover:-translate-y-2 group shadow-sm dark:shadow-none"
                            >
                                <div className="space-y-4 flex flex-col h-full">
                                    {service.icon && (
                                        <div>
                                            <service.icon className="w-10 h-10 text-brand-cyan" />
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-display font-bold text-dark-950 dark:text-white">
                                        {service.title}
                                    </h3>
                                    {service.subtitle && (
                                        <p className="font-semibold text-brand-orange text-sm mb-2">{service.subtitle}</p>
                                    )}

                                    {service.subServices ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 relative flex-grow">
                                            {/* Divider line for md panels */}
                                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gray-200 dark:bg-brand-cyan/20 transform -translate-x-1/2"></div>

                                            {service.subServices.map((sub, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <sub.icon className="w-8 h-8 text-brand-cyan" />
                                                        <h4 className="text-xl font-bold text-dark-950 dark:text-white">{sub.title}</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        {sub.description}
                                                    </p>
                                                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 pt-2">
                                                        {sub.benefits.map((benefit, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <div className="w-4 h-4 rounded-full bg-brand-cyan/30 flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center">
                                                                    <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
                                                                </div>
                                                                <span>{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {service.description && (
                                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                    {service.description}
                                                </p>
                                            )}
                                            {service.benefits && (
                                                <ul className="space-y-3 text-gray-600 dark:text-gray-300 pt-2 flex-grow">
                                                    {service.benefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <div className="w-4 h-4 rounded-full bg-brand-cyan/30 flex-shrink-0 mt-1 mr-3 flex items-center justify-center">
                                                                <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
                                                            </div>
                                                            <span>{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}

                                    {service.roi && (
                                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-brand-cyan/20">
                                            <div className="text-center">
                                                <div className="text-sm text-brand-orange font-medium mb-1">📊 Resultado promedio:</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300 italic">"{service.roi}"</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
