import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

export interface MetricData {
    statistic: string;
    description: string;
    detailedDescription: string;
    source: string;
}

interface MetricCardProps {
    metric: MetricData;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-brand-cyan/20 p-6 rounded-2xl text-center relative h-full flex flex-col justify-between shadow-sm dark:shadow-none"
            >
                <div>
                    <h3 className="text-4xl font-bold text-gold-gradient mb-2">{metric.statistic}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{metric.description}</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-dark-950 dark:text-gray-400 dark:hover:text-white transition-colors"
                    aria-label="Más información"
                >
                    <Info size={18} />
                </button>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-brand-cyan/20 rounded-2xl p-8 max-w-md w-full relative shadow-xl dark:shadow-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-dark-950 dark:text-gray-400 dark:hover:text-white transition-colors"
                                aria-label="Cerrar"
                            >
                                <X size={24} />
                            </button>
                            <h4 className="text-xl font-bold text-dark-950 dark:text-white mb-4">Estadística de IA Empresarial</h4>
                            <div className="text-center mb-6">
                                <p className="text-5xl font-bold text-gold-gradient mb-2">{metric.statistic}</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-dark-950 dark:text-white mb-1">Descripción</h5>
                                    <p className="text-gray-600 dark:text-gray-300">{metric.detailedDescription}</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-dark-950 dark:text-white mb-1">Fuente</h5>
                                    <p className="text-gray-500 dark:text-gray-400 italic">{metric.source}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
