'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn, scrollToElement } from '@/shared/lib/utils';

const navigationItems = [
    { name: 'Inicio', href: 'hero' },
    { name: 'Servicios', href: 'benefits' },
    { name: 'Nosotros', href: 'process' },
    { name: 'Contacto', href: 'contact' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        scrollToElement(href);
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-dark-950/95 backdrop-blur-lg border-b border-gold-500/20'
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-shrink-0 flex items-center space-x-4"
                    >
                        <h1 className="text-2xl font-display font-bold text-gold-gradient">
                            Lezai<span className="text-white">Group</span>
                        </h1>

                        <div className="hidden lg:flex items-center px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-xs text-gold-400">
                            🤝 Consulta gratis, sin presión
                        </div>
                    </motion.div>

                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hidden md:flex space-x-8"
                    >
                        {navigationItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                onClick={() => handleNavClick(item.href)}
                                className="text-gray-300 hover:text-gold-400 px-3 py-2 text-sm font-medium transition-colors duration-200 animated-underline"
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="hidden md:block"
                    >
                        <div className="space-y-1">
                            <button
                                onClick={() => handleNavClick('contact')}
                                className="btn-primary text-sm"
                            >
                                Hablar Directo con Diego
                            </button>
                            <p className="text-xs text-gray-400 text-center">
                                WhatsApp directo con el desarrollador
                            </p>
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="md:hidden p-2 rounded-md text-gray-400 hover:text-gold-400 hover:bg-dark-800 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-dark-950/98 backdrop-blur-lg border-b border-gold-500/20"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-gray-300 hover:text-gold-400 hover:bg-dark-800 block px-3 py-2 text-base font-medium w-full text-left rounded-md transition-colors duration-200"
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                                className="space-y-2 mt-4"
                            >
                                <button
                                    onClick={() => handleNavClick('contact')}
                                    className="btn-primary w-full text-sm"
                                >
                                    Hablar Directo con Diego
                                </button>
                                <p className="text-xs text-gray-400 text-center">
                                    💬 WhatsApp directo • 🆓 Sin compromisos
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
