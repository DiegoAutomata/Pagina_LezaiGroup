import { createClient } from '@/shared/lib/supabase/server'
import Link from 'next/link'
import { logout } from '@/features/auth/actions/auth'

export async function HeaderAuth() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {
        // Obtenemos el perfil para validar el rol
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const isOwner = profile?.role === 'admin' || profile?.role === 'lawyer'

        return (
            <div className="flex items-center gap-4">
                {isOwner && (
                    <Link
                        href="/dashboard"
                        className="auth-link text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                        Dashboard
                    </Link>
                )}
                <form action={logout}>
                    <button
                        type="submit"
                        className="auth-link text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        )
    }

    return (
        <Link
            href="/login"
            className="hidden md:flex items-center justify-center rounded-full bg-blue-600/10 px-6 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-600/20 hover:text-blue-400 transition-all border border-blue-500/20"
        >
            Iniciar Sesión
        </Link>
    )
}
