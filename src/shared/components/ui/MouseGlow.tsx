'use client';

import { useEffect } from 'react';

export function MouseGlow() {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Guardamos las coordenadas absolutas en CSS variables en el root html
            document.documentElement.style.setProperty('--mouse-abs-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-abs-y', `${e.clientY}px`);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Brillo global ambiental (Dorado principal) */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 opacity-0 md:opacity-100 mix-blend-multiply dark:mix-blend-screen"
                style={{
                    background: 'radial-gradient(600px circle at var(--mouse-abs-x, 50vw) var(--mouse-abs-y, -100vh), rgba(212, 175, 55, 0.15), transparent 40%)',
                }}
            />
            {/* Brillo globlal ambiental secundario (Ambar luminoso) */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 opacity-0 md:opacity-100 mix-blend-multiply dark:mix-blend-screen"
                style={{
                    background: 'radial-gradient(400px circle at var(--mouse-abs-x, 50vw) var(--mouse-abs-y, -100vh), rgba(251, 191, 36, 0.10), transparent 40%)',
                }}
            />
        </>
    );
}
