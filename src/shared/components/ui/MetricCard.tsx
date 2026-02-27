import { motion } from 'framer-motion';
import { Info, X } from 'lucide-react';

export interface MetricData {
    statistic: string;
    description: string;
    detailedDescription: string;
    source: string;
}

interface MetricCardProps {
    metric: MetricData;
    onClick?: () => void;
}

export const MetricCard = ({ metric, onClick }: MetricCardProps) => {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="spotlight-card bg-white dark:bg-dark-800/50 border border-gray-200 dark:border-brand-cyan/20 p-6 rounded-2xl text-center relative h-full flex flex-col justify-between shadow-sm dark:shadow-none"
        >
            <div>
                <h3 className="text-4xl font-bold text-gold-gradient mb-2">{metric.statistic}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{metric.description}</p>
            </div>
            <button
                onClick={onClick}
                className="absolute top-3 right-3 text-gray-500 hover:text-dark-950 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="Más información"
            >
                <Info size={18} />
            </button>
        </motion.div>
    );
};
