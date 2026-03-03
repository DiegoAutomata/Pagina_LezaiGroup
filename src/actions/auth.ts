'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Enviar email de bienvenida diferido 1 minuto si Resend está configurado
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const { generateWelcomeEmailHtml } = await import('@/lib/email/templates/welcome-html')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const sendAt = new Date(Date.now() + 1 * 60 * 1000) // 1 minute from now

      const { data, error: resendError } = await resend.emails.send({
        from: 'LezaiGroup <onboarding@resend.dev>',
        to: email,
        subject: '¡Bienvenido a LezaiGroup! Impulsa tu negocio con IA',
        html: generateWelcomeEmailHtml(email.split('@')[0]),
        scheduledAt: sendAt.toISOString(),
      })

      if (resendError) {
        console.error('Error enviando email de bienvenida:', resendError)
      } else {
        console.log('Email de bienvenida programado exitosamente:', data)
      }
    } catch (e) {
      console.error('Excepción programando email de bienvenida', e)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/check-email')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: formData.get('full_name') as string,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
