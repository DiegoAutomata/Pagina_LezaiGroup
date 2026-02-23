'use client';

import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

export function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-start space-x-2"
        >
            <div className="w-8 h-8 rounded-full bg-dark-700 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-4 h-4 text-gold-400" />
            </div>

            <div className="bg-dark-700 border border-gold-500/10 rounded-2xl rounded-bl-md px-4 py-3 max-w-[280px]">
                <div className="flex items-center space-x-1">
                    <span className="text-gold-400 text-sm mr-2">Escribiendo</span>
                    <div className="flex space-x-1">
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                className="w-2 h-2 bg-gold-400 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                    ease: 'easeInOut'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
