export function Footer() {
    return (
        <footer className="bg-dark-950 border-t border-gold-500/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-display font-bold text-gold-gradient">
                        Lezai<span className="text-white">Group</span>
                    </h3>
                    <p className="text-gray-400">
                        Inteligencia Artificial a medida para tu Negocio
                    </p>
                    <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
                        <span>&#169; {new Date().getFullYear()} LezaiGroup. Todos los derechos reservados.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
