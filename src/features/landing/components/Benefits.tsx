'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    Cog8ToothIcon,
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

const mainServices: Service[] = [
    {
        icon: UserGroupIcon,
        title: 'Tu Plataforma Web Que Trabaja Mientras Duermes',
        description: 'No más perder clientes por respuestas lentas o sitios que no convierten',
        benefits: [
            'Landing page que convierte visitantes en clientes',
            'Sistema de pagos automático (no más perseguir facturas)',
            'Dashboard donde ves todo lo importante de un vistazo',
            'Funciona perfecto en celular (donde están tus clientes)',
            'Se actualiza solo, sin que tengas que preocuparte'
        ],
        roi: 'Clientes reportan 40% más conversiones en promedio',
        color: 'from-gold-400 to-gold-600'
    },
    {
        icon: ChatBubbleLeftRightIcon,
        title: 'Tu Asistente Personal Que Nunca Se Enferma Ni Pide Vacaciones',
        description: 'Responde clientes en WhatsApp, email y web - siempre con la información correcta',
        benefits: [
            'Responde consultas comunes 24/7 (precios, horarios, disponibilidad)',
            'Agenda citas automáticamente en tu calendario',
            'Almacena toda la información de cada cliente',
            'Te avisa solo cuando realmente necesita que intervengas',
            'Habla como tú hablarías con tus clientes'
        ],
        roi: 'Promedio de 15 horas menos dedicadas a responder lo mismo',
        color: 'from-gold-500 to-gold-700'
    },
    {
        icon: Cog8ToothIcon,
        title: 'Conecta Todo Lo Que Usas Para Que Funcione Solo',
        description: 'Tu CRM, WhatsApp, email, facturación... todo sincronizado automáticamente',
        benefits: [
            'Cuando llega un cliente nuevo, se guarda en todas partes',
            'Las facturas se envían solas en las fechas correctas',
            'Reportes de tu negocio listos cada lunes en tu email',
            'Recordatorios automáticos para seguimiento de clientes',
            'Todo se actualiza solo, sin que tengas que recordar nada'
        ],
        roi: 'Clientes ahorran 1-2 horas diarias en tareas repetitivas',
        color: 'from-gold-600 to-gold-800'
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
                    <motion.div variants={itemVariants} className="text-center space-y-4">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium">
                            <BoltIcon className="w-4 h-4 mr-2" />
                            Beneficios Comprobados
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
                            Las <span className="text-gold-gradient">3 Áreas Donde Más Tiempo Pierdes</span> (Y Cómo Recuperarlo)
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Nos enfocamos en los procesos que te quitan más tiempo cada día.{' '}
                            <span className="text-gold-400 font-semibold">Recupera hasta 25+ horas semanales</span>{' '}
                            automatizando lo que realmente importa
                        </p>
                    </motion.div>

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

                                    {service.roi && (
                                        <div className="mt-6 pt-4 border-t border-gold-500/20">
                                            <div className="text-center">
                                                <div className="text-sm text-gold-400 font-medium mb-1">📊 Resultado promedio:</div>
                                                <div className="text-sm text-gray-300 italic">"{service.roi}"</div>
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
