'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/shared/lib/supabase/server'
import { Provider } from '@supabase/supabase-js'

export async function loginWithEmail(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=Invalid email or password')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard') // Redirigir al dashboard luego
}

export async function signupWithEmail(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const data = {
        email,
        password,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/register?error=Could not authenticate user')
    }

    // Enviar email de bienvenida diferido 1 minuto (soporta Resend o Zoho SMTP)
    const { sendWelcomeEmailDelayed } = await import('@/lib/email/welcome-sender')
    sendWelcomeEmailDelayed(email)

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

import { headers } from 'next/headers'

export async function oAuthSignIn(provider: Provider) {
    if (!provider) {
        return redirect('/login?message=No provider selected')
    }

    const supabase = await createClient()
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = headersList.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https')
    const origin = `${protocol}://${host}`

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${origin}/auth/v1/callback`,
        },
    })

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    return redirect(data.url)
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
