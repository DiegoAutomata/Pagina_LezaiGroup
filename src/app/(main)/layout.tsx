import { Sidebar } from '@/components/layout/sidebar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#00050A]">
      <Sidebar />
      <main className="ml-64 relative z-10">
        {children}
      </main>
    </div>
  )
}
