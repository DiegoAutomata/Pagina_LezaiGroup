import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#00050A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Elementos decorativos (Lights & Glows) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center flex-col items-center">
          <Link href="/" className="flex items-center gap-2 group mb-6">
            <div className="relative flex items-center justify-center w-10 h-10 border border-blue-500/30 bg-blue-500/10 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-colors">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl"></div>
              <span className="relative text-xl font-bold text-white tracking-tighter">
                LR
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">LEZRAI</span>
          </Link>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white mb-2">
            Bienvenido de vuelta
          </h2>
          <p className="text-center text-sm text-gray-400">
            Accede a tu panel de control impulsado por IA
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0A0F16]/80 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-800/50">
          {children}
        </div>
      </div>
    </div>
  )
}
