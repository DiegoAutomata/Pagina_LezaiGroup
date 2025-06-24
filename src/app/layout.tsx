import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { StructuredData } from "@/components/ui/StructuredData";
import dynamic from 'next/dynamic';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'], // Reduced from 5 to 3 weights
  display: 'swap',
  preload: true,
});

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700'], // Reduced from 3 to 2 weights
  display: 'swap',
  preload: true,
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'], // Reduced from 8 to 2 weights
  display: 'swap',
  preload: true,
});

// Dynamic import for ChatBot - not critical for initial load
const ChatBot = dynamic(() => import("@/components/ui/ChatBot").then(mod => ({ default: mod.ChatBot })), {
  ssr: false, // Client-only component to reduce initial bundle
  loading: () => null // No loading UI needed for widget
});

export const metadata: Metadata = {
  title: "AI Agency - Automatización IA que Transforma Negocios",
  description: "Automatizamos tus procesos más críticos con Lead Generation Agents, Customer Support IA y N8N Workflows. +300% ROI garantizado en 30 días. Consulta gratuita.",
  keywords: [
    "automatización IA",
    "inteligencia artificial",
    "lead generation agents",
    "customer support IA",
    "N8N workflows",
    "automatización empresarial",
    "agentes IA",
    "transformación digital"
  ],
  authors: [{ name: "AI Agency" }],
  creator: "AI Agency",
  publisher: "AI Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aiagency.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AI Agency - Automatización IA que Transforma Negocios",
    description: "Automatizamos tus procesos más críticos con Lead Generation Agents, Customer Support IA y N8N Workflows. +300% ROI garantizado en 30 días.",
    url: 'https://aiagency.com',
    siteName: 'AI Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Agency - Automatización IA',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Agency - Automatización IA que Transforma Negocios",
    description: "Automatizamos tus procesos más críticos con IA. +300% ROI garantizado en 30 días.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <head>
        <StructuredData />
        
        {/* Critical CSS inline for above-the-fold LCP optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical styles for immediate paint */
            body{background:#030712;color:#f9fafb;font-family:var(--font-sans);margin:0;padding:0}
            .bg-dark-950{background-color:#020617}
            .bg-dark-900{background-color:#0c0a09}
            .text-gold-gradient{background:linear-gradient(to right,#facc15,#eab308,#ca8a04);-webkit-background-clip:text;background-clip:text;color:transparent}
            .btn-primary{background:linear-gradient(to right,#facc15,#eab308,#ca8a04);color:#020617;font-weight:600;padding:1rem 2rem;border-radius:0.75rem;transition:all 0.3s ease}
            .animate-fade-in-down{animation:fadeInDown 0.6s ease-out}
            @keyframes fadeInDown{from{opacity:0;transform:translateY(-100px)}to{opacity:1;transform:translateY(0)}}
            .h-screen{height:100vh}
            .min-h-screen{min-height:100vh}
          `
        }} />
        
        {/* Critical CSS preload */}
        <link rel="preload" href="/_next/static/css/app/globals.css" as="style" />
        
        {/* Critical fonts preload for LCP optimization */}
        <link 
          rel="preload" 
          href="/_next/static/fonts/Inter-600.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/_next/static/fonts/PlayfairDisplay-700.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Font connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme and viewport meta */}
        <meta name="theme-color" content="#030712" />
      </head>
      <body className={`antialiased font-sans`}>
        {children}
        {/* AI Chatbot Widget */}
        <ChatBot />
      </body>
    </html>
  );
}
