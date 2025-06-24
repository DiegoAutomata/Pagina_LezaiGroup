'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  navigationItems: { name: string; href: string }[];
  onNavClick: (href: string) => void;
  isOpen: boolean;
}

export default function MobileMenu({ navigationItems, onNavClick, isOpen }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
                onClick={() => onNavClick(item.href)}
                className="text-gray-300 hover:text-gold-400 hover:bg-dark-800 block px-3 py-2 text-base font-medium w-full text-left rounded-md transition-colors duration-200"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              onClick={() => onNavClick('contact')}
              className="btn-primary w-full mt-4 text-sm"
            >
              Consulta Gratis
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 