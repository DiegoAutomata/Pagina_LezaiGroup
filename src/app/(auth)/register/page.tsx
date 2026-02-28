import Link from 'next/link'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export default function RegisterPage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                    Crear una cuenta
                </h1>
                <p className="text-sm text-gray-400">
                    Comienza a gestionar tu empresa con IA
                </p>
            </div>

            <RegisterForm />

            <p className="text-center text-sm text-gray-400">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                    Inicia sesión
                </Link>
            </p>
        </div>
    )
}
