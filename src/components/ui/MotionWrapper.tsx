'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Only import the minimal motion components needed to reduce bundle size
const MotionDiv = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.div })), {
  ssr: false,
  loading: () => <div className="opacity-0" />
});

const MotionSection = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.section })), {
  ssr: false,
  loading: () => <section className="opacity-0" />
});

const MotionButton = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.button })), {
  ssr: false,
  loading: () => <button className="opacity-0" />
});

// Optimized type definitions to avoid 'any'
interface MotionProps {
  children: ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  variants?: Record<string, unknown>;
  [key: string]: unknown;
}

// Lightweight motion alternatives for above-the-fold content
export const SimpleMotionDiv = ({ children, className, ...props }: MotionProps) => (
  <div className={`${className} animate-in`} {...props}>
    {children}
  </div>
);

export const SimpleMotionSection = ({ children, className, ...props }: MotionProps) => (
  <section className={`${className} animate-in`} {...props}>
    {children}
  </section>
);

// Export optimized motion components
export { MotionDiv, MotionSection, MotionButton };

// Hook to determine if we should use full framer-motion or simple animations
export const useMotionPreference = () => {
  // For critical above-the-fold content, use simple animations
  // For below-the-fold content, use full framer-motion
  return {
    useSimple: false, // We can make this dynamic based on screen position
    Motion: {
      div: MotionDiv,
      section: MotionSection, 
      button: MotionButton,
    },
    Simple: {
      div: SimpleMotionDiv,
      section: SimpleMotionSection,
    }
  };
}; 