'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { logout } from '@/features/auth/actions/auth'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Fallback al email si no hay nombre (o usar la metadata)
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario')
      }
      setIsLoading(false)
    }

    fetchUser()
  }, [])

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0A0F16] text-white flex flex-col z-40 border-r border-gray-800/50">
      {/* Elemento de luz de fondo */}
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />

      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-8 h-8 border border-blue-500/30 bg-blue-500/10 rounded-lg overflow-hidden group-hover:border-blue-500/50 transition-colors">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl"></div>
            <span className="relative text-lg font-bold text-white tracking-tighter">
              LR
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">LEZRAI</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-gray-800/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10 blur-sm"></div>
            <span className="relative text-sm font-semibold text-blue-400">
              {userName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30`}>
              Usuario
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto relative z-10">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-white/5 rounded-xl animate-pulse" />
            <div className="h-10 bg-white/5 rounded-xl animate-pulse" />
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 px-4 mb-3">
              Principal
            </p>

            <Link
              href="/dashboard"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200
                ${pathname === '/dashboard'
                  ? 'bg-blue-500/10 text-white border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Panel Principal</span>
            </Link>

          </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-800/50 space-y-1 relative z-10">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
