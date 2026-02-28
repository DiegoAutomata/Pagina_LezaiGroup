'use client';

import { useEffect, useState } from 'react';

export function MouseGlow() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="pointer-events-none fixed z-[9999] flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
            }}
        >
            {/* Ripple animation */}
            <div className="absolute inset-0 rounded-full border border-blue-600/60 dark:border-white/60 shadow-[0_0_10px_rgba(37,99,235,0.8)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-ping" style={{ animationDuration: '1.2s' }} />
            <div className="absolute inset-2 rounded-full border border-blue-600/30 dark:border-white/30 shadow-[0_0_8px_rgba(37,99,235,0.6)] dark:shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-ping" style={{ animationDuration: '1.8s', animationDelay: '0.2s' }} />
            {/* Center glowing dot (Exactly at mouse tip) */}
            <div className="absolute w-2 h-2 bg-blue-600 dark:bg-white rounded-full shadow-[0_0_8px_rgba(37,99,235,1)] dark:shadow-[0_0_8px_rgba(255,255,255,1)]" />
        </div>
    );
}
