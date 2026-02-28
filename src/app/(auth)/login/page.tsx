import Link from 'next/link'
import { LoginForm } from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-sm text-gray-400">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-gray-400">
        ¿No tienes una cuenta?{' '}
        <Link href="/register" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
          Regístrate gratis
        </Link>
      </p>
    </div>
  )
}
