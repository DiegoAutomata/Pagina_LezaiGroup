'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn, scrollToElement } from '@/shared/lib/utils';
import { ThemeToggle } from '@/shared/components/ui/ThemeToggle';

const navigationItems = [
    { name: 'Inicio', href: 'hero' },
    { name: 'Servicios', href: 'benefits' },
    { name: 'Procesos', href: 'process' },
    { name: 'Preguntas Frecuentes', href: 'faq' },
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
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform',
                isScrolled
                    ? 'py-4'
                    : 'py-0 bg-transparent dark:bg-transparent border-b border-transparent dark:border-transparent'
            )}
        >
            <div className={cn(
                "transition-all duration-500 mx-auto",
                isScrolled
                    ? "max-w-5xl px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]/90 backdrop-blur-2xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] ring-1 ring-white/10"
                    : "max-w-7xl px-4 sm:px-6 lg:px-8 bg-transparent shadow-none ring-0 rounded-none"
            )}>
                <div className={cn("flex items-center justify-between transition-all duration-500", isScrolled ? "h-20 md:h-24" : "h-32 md:h-40")}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-shrink-0 flex items-center space-x-4"
                    >
                        {mounted && (
                            <Link href="/" className="relative flex-shrink-0 transition-transform duration-500 hover:scale-105 group-hover:opacity-90 flex items-center">
                                <Image
                                    src="/logo-lezrai-cropped.png"
                                    alt="Lezrai Logo"
                                    width={325}
                                    height={327}
                                    className={cn(
                                        "object-contain w-auto drop-shadow-md transition-all duration-500",
                                        isScrolled ? "h-14 md:h-16" : "h-20 md:h-28 lg:h-32"
                                    )}
                                    priority
                                />
                            </Link>
                        )}
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
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                                    isScrolled
                                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                                        : "text-dark-950 dark:text-white hover:bg-gray-900/5 dark:hover:bg-white/10"
                                )}
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
                            className={cn(
                                "p-2 rounded-full transition-all duration-300",
                                isScrolled
                                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                                    : "text-dark-950 dark:text-white hover:bg-gray-900/5 dark:hover:bg-white/10"
                            )}
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
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] ring-1 ring-gray-900/10 dark:ring-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-gray-600 dark:text-gray-300 hover:text-dark-950 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/10 block px-4 py-3 text-base font-medium w-full text-left rounded-2xl transition-all duration-300"
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
