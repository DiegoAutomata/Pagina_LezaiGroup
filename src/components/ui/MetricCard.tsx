import React, { useState } from 'react';

export interface MetricData {
  statistic: string;
  description: string;
  detailedDescription: string;
  source: string;
}

interface MetricCardProps {
  metric: MetricData;
}

export function MetricCard({ metric }: MetricCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Optimized card - CSS animations instead of framer-motion */}
      <div className="metric-card glass p-6 rounded-2xl text-center relative h-full flex flex-col justify-between">
        <div>
          <h3 className="text-4xl font-bold text-gold-gradient mb-2">
            {metric.statistic}
          </h3>
          <p className="text-gray-300 text-sm">
            {metric.description}
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Más información"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </button>
      </div>

      {/* Optimized modal - CSS transitions */}
      {showModal && (
        <div 
          className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="modal-content bg-dark-800 border border-gold-500/20 rounded-2xl p-8 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="text-2xl font-bold text-gold-gradient">
                  {metric.statistic}
                </h4>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Cerrar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x" aria-hidden="true">
                    <path d="M18 6 6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {metric.detailedDescription}
              </p>
              
              <div className="pt-4 border-t border-gold-500/20">
                <p className="text-sm text-gold-400 font-medium">
                  Fuente: {metric.source}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
