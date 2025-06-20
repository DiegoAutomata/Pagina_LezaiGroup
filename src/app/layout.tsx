import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { StructuredData } from "@/components/ui/StructuredData";
import { ChatBot } from "@/components/ui/ChatBot";

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
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
        <link rel="preload" href="/_next/static/css/app/globals.css" as="style" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#030712" />
      </head>
      <body className={`antialiased font-sans`} suppressHydrationWarning>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
