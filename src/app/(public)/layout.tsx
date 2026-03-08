import { Header } from '@/shared/components/layout/Header'
import { HeaderAuth } from '@/shared/components/layout/HeaderAuth'
import { Footer } from '@/shared/components/layout/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header authNode={<HeaderAuth />} />
      <main className="flex-1 pt-[64px] md:pt-[80px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}
