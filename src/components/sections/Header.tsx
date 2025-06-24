'use client';

import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn, scrollToElement } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Lazy load framer-motion only for mobile menu (not critical)
const MobileMenu = dynamic(() => import('./MobileMenu'), { 
  ssr: false,
  loading: () => <div className="opacity-0" />
});

// Navigation items for internal sections
const navigationItems = [
  { name: 'Inicio', href: 'hero' },
  { name: 'Servicios', href: 'benefits' },
  { name: 'Nosotros', href: 'process' },
  { name: 'Contacto', href: 'contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = (href: string) => {
    scrollToElement(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in-down',
        isScrolled
          ? 'bg-dark-950/95 backdrop-blur-lg border-b border-gold-500/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 animate-fade-in-left">
            <h1 className="text-2xl font-display font-bold text-gold-gradient">
              Lezai<span className="text-white">Group</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 animate-fade-in-up">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-gold-400 px-3 py-2 text-sm font-medium transition-colors duration-200 animated-underline"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block animate-fade-in-right">
            <button
              onClick={() => handleNavClick('contact')}
              className="btn-primary text-sm"
            >
              Consulta Gratis
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gold-400 hover:bg-dark-800 transition-colors duration-200 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú principal</span>
            {isMobileMenuOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu with optimized lazy loading */}
      {isMobileMenuOpen && (
        <MobileMenu 
          navigationItems={navigationItems}
          onNavClick={handleNavClick}
          isOpen={isMobileMenuOpen}
        />
      )}
    </header>
  );
} 