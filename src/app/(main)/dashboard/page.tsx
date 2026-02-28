import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Dashboard | LEZRAI IA'
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Verificar rol para acceso
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role === 'client') {
    redirect('/?message=No+tienes+acceso+al+dashboard')
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'
  const greeting = getGreeting()

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen relative overflow-hidden">

      {/* Luces de fondo (Brand glow) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {greeting}, <span className="text-blue-400">{userName}</span>
        </h1>
        <p className="text-gray-400 mt-2 font-light">
          Bienvenido a tu panel de control impulsado por Inteligencia Artificial.
        </p>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">

        {/* Card 1 */}
        <div className="relative group rounded-2xl p-6 bg-[#0A0F16]/50 border border-gray-800/50 backdrop-blur-xl overflow-hidden hover:border-blue-500/30 transition-colors">
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-lg font-medium text-white mb-2 relative z-10">
            Agentes Activos
          </h3>
          <p className="text-4xl font-bold text-blue-500 relative z-10">0</p>
          <p className="text-sm text-gray-500 mt-2 relative z-10 font-light">
            No tienes agentes configurados aún.
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative group rounded-2xl p-6 bg-[#0A0F16]/50 border border-gray-800/50 backdrop-blur-xl overflow-hidden hover:border-blue-500/30 transition-colors">
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-lg font-medium text-white mb-2 relative z-10">
            Consultas Procesadas
          </h3>
          <p className="text-4xl font-bold text-blue-500 relative z-10">0</p>
          <p className="text-sm text-gray-500 mt-2 relative z-10 font-light">
            En los últimos 30 días.
          </p>
        </div>

      </div>

      {/* Empty State / CTA */}
      <div className="mt-12 relative z-10 rounded-2xl p-12 bg-gradient-to-br from-[#0A0F16] to-[#0A0F16]/50 border border-blue-500/20 text-center flex flex-col items-center justify-center dashboard-spotlight">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Comienza la Automatización</h2>
        <p className="text-gray-400 max-w-lg mb-8 font-light">
          Nuestros expertos en IA están listos para construir el puente entre tu negocio
          y el futuro tecnológico. Despliega tu primer agente hoy mismo.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          Solicitar Agente
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  )
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
}
