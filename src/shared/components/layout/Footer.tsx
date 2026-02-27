export function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-dark-950 border-t border-gray-200 dark:border-brand-cyan/20 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-display font-bold text-dark-950 dark:text-white">
                        R&L <span className="text-brand-cyan dark:text-brand-orange transition-colors">AI</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Inteligencia Artificial a medida para tu Negocio
                    </p>
                    <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-500">
                        <span>&#169; 2025 R&L AI. Todos los derechos reservados.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
