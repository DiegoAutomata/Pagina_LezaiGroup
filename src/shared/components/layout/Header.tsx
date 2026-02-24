'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn, scrollToElement } from '@/shared/lib/utils';
import { ThemeToggle } from '@/shared/components/ui/ThemeToggle';

const navigationItems = [
    { name: 'Inicio', href: 'hero' },
    { name: 'Servicios', href: 'benefits' },
    { name: 'Nosotros', href: 'process' },
    { name: 'Contacto', href: 'contact' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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
                    ? 'bg-white/95 dark:bg-dark-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gold-500/20'
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
                        {mounted && (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-dark-950 border-2 border-brand-cyan/20">
                                <Image
                                    src="/logo-rl.jpg"
                                    alt="R&L AI Logo"
                                    fill
                                    className="object-cover scale-[1.12]"
                                />
                            </div>
                        )}
                        <h1 className="text-xl font-display font-bold text-dark-950 dark:text-white transition-colors hidden sm:block">
                            R&L AI
                        </h1>
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
                                className="text-gray-600 hover:text-brand-cyan dark:text-gray-300 dark:hover:text-brand-cyan px-3 py-2 text-sm font-medium transition-colors duration-200 animated-underline"
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="hidden md:flex items-center space-x-6"
                    >
                        <ThemeToggle />
                    </motion.div>

                    <div className="flex items-center space-x-2 md:hidden">
                        <ThemeToggle />
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="p-2 rounded-md text-gray-500 hover:text-brand-cyan hover:bg-gray-100 dark:text-gray-400 dark:hover:text-brand-cyan dark:hover:bg-dark-800 transition-colors duration-200"
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
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-white/98 dark:bg-dark-950/98 backdrop-blur-lg border-b border-gray-200 dark:border-brand-cyan/20 shadow-sm dark:shadow-none"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-gray-600 hover:text-brand-cyan hover:bg-gray-100 dark:text-gray-300 dark:hover:text-brand-cyan dark:hover:bg-dark-800 block px-3 py-2 text-base font-medium w-full text-left rounded-md transition-colors duration-200"
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
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
