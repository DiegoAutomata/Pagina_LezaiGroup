import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && authData?.user) {
            // Verificar el rol
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .single()

            const isOwner = profile?.role === 'admin' || profile?.role === 'lawyer'

            // Si next fue seteado explicitamente, lo respetamos (con fallback lógico si es /dashboard)
            let finalRedirect = next
            if (next === '/dashboard' && !isOwner) {
                finalRedirect = '/'
            }

            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${finalRedirect}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${finalRedirect}`)
            } else {
                return NextResponse.redirect(`${origin}${finalRedirect}`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
