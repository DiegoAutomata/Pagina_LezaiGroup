'use client'

import { useState } from 'react'
import { loginWithEmail } from '@/features/auth/actions/auth'
import { Loader2 } from 'lucide-react'
import { SignInWithGoogleButton } from './SignInWithGoogleButton'

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <SignInWithGoogleButton />

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#0A0F16] text-gray-500 font-light text-xs">O ingresa con tu correo</span>
        </div>
      </div>

      <form action={async (formData) => {
        setLoading(true)
        await loginWithEmail(formData)
        // Note: we don't set loading back to false because it redirects
      }} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 border border-blue-500/20 rounded-xl bg-blue-500/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light"
            placeholder="tu@correo.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-2 border border-blue-500/20 rounded-xl bg-blue-500/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden mt-6"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-shimmer" />
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>
    </>
  )
}
