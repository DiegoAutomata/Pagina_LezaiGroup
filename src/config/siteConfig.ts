// ============================================================
// SITE CONFIG - Lezrai SaaS Factory
// ============================================================

export interface ServiceItem {
  icon: 'divorce' | 'custody' | 'alimony' | 'mediation' | 'domestic-violence' | 'separation' | 'contracts' | 'corporate' | 'real-estate' | 'criminal' | 'immigration' | 'labor' | 'custom' | 'ai-agents' | 'web-systems' | 'automation'
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
}

export interface TeamMember {
  name: string
  title: string
  bio: string
  specialties: string[]
  imageUrl?: string
  bookingSlug?: string
}

export interface Testimonial {
  name: string
  quote: string
  rating: number
  caseType?: string
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface SiteConfig {
  firmName: string
  firmSlogan: string
  firmDescription: string
  founderName: string
  founderTitle: string
  founderBio: string
  yearsExperience: number
  yearFounded: number

  contact: {
    phone: string
    phoneDisplay: string
    email: string
    address: string
    city: string
    country: string
    googleMapsEmbedUrl: string
    whatsappNumber?: string
    officeHours: string
  }

  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }

  navigation: {
    items: NavItem[]
  }

  hero: {
    headline: string
    subheadline: string
    ctaText: string
    ctaHref: string
    backgroundImageUrl?: string
  }

  values: Array<{
    icon: 'respect' | 'quality' | 'team' | 'experience' | 'confidential' | 'results' | 'innovation' | 'efficiency' | 'scalability'
    title: string
    description: string
  }>

  services: ServiceItem[]

  tabs: Array<{
    title: string
    content: string
  }>

  team: TeamMember[]

  testimonials: Testimonial[]

  booking: {
    enabled: boolean
    ctaText: string
    mainLawyerSlug?: string
  }

  seo: {
    siteTitle: string
    titleTemplate: string
    defaultDescription: string
    locale: string
    ogImageUrl?: string
  }

  legal: {
    privacyLastUpdated: string
    termsLastUpdated: string
  }

  theme?: {
    primaryColor?: string
    accentColor?: string
  }
}

// ============================================================
// CONFIGURACIÓN: Lezrai - Software a medida e IA
// ============================================================

export const siteConfig: SiteConfig = {
  firmName: 'Lezrai',
  firmSlogan: 'Digitaliza tu empresa con software a medida',
  firmDescription: 'Desarrollamos soluciones de software a medida e integramos Inteligencia Artificial para automatizar procesos, escalar operaciones y potenciar tu negocio.',
  founderName: 'Diego de Lezrai',
  founderTitle: 'Fundador & CEO',
  founderBio: 'Apasionado por la tecnología y la optimización de procesos. Lidero Lezrai con el objetivo de democratizar el acceso al software de alta calidad y a la Inteligencia Artificial para empresas de todos los tamaños.',
  yearsExperience: 5,
  yearFounded: 2023,

  contact: {
    phone: '+5492944670562',
    phoneDisplay: '+54 9 294 467-0562',
    email: 'contacto@lezrai.com',
    address: 'San Carlos de Bariloche, Río Negro',
    city: 'Bariloche',
    country: 'Argentina',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192138.83597442118!2d-71.45524317133037!3d-41.133472099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a7b1520c860e5%3A0x8210ae97cb7b9a65!2sSan%20Carlos%20de%20Bariloche%2C%20R%C3%ADo%20Negro!5e0!3m2!1ses-419!2sar!4v1700000000000',
    whatsappNumber: '+5492944670562',
    officeHours: 'Lunes a Viernes, 9:00 a.m. a 6:00 p.m.',
  },

  social: {
    facebook: 'https://facebook.com/lezrai',
    instagram: 'https://instagram.com/lezraitech',
    linkedin: 'https://linkedin.com/company/lezrai',
  },

  navigation: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },

  hero: {
    headline: 'Digitaliza tu empresa con software a medida mediante la IA',
    subheadline: 'Construimos herramientas tecnológicas que trabajan por ti. Desde agentes virtuales hasta sistemas internos complejos.',
    ctaText: 'Hablar con un Asesor',
    ctaHref: '/contacto',
  },

  values: [
    {
      icon: 'innovation',
      title: 'Innovación Constante',
      description: 'Adaptamos las últimas tecnologías de IA y desarrollo web para darte una ventaja competitiva.',
    },
    {
      icon: 'quality',
      title: 'Calidad de Software',
      description: 'Código limpio, arquitecturas escalables y un rendimiento excepcional en cada producto que entregamos.',
    },
    {
      icon: 'efficiency',
      title: 'Eficiencia y Automatización',
      description: 'Nuestra meta es que hagas más con menos, automatizando flujos de trabajo repetitivos.',
    },
  ],

  services: [
    {
      icon: 'ai-agents',
      title: 'Agentes de Inteligencia Artificial',
      slug: 'agentes-ia',
      shortDescription: 'Asistentes virtuales 24/7 para atención al cliente y soporte técnico.',
      fullDescription: 'Implementamos agentes de inteligencia artificial generativa capaces de mantener conversaciones naturales con tus clientes. Pueden resolver dudas, agendar citas, y calificar leads de forma automática, operando 24 horas al día, 7 días a la semana sin interrupciones.',
    },
    {
      icon: 'web-systems',
      title: 'Desarrollo Web y Sistemas Internos',
      slug: 'desarrollo-web',
      shortDescription: 'Plataformas a medida, CRMs y paneles de administración modernos.',
      fullDescription: 'Construimos aplicaciones web robustas y escalables adaptadas exactamente a los flujos reales de tu empresa. Desde portales de clientes hasta sistemas complejos de gestión interna (ERP/CRM) utilizando las tecnologías más modernas y rápidas del mercado como Next.js y Supabase.',
    },
    {
      icon: 'automation',
      title: 'Automatización de Procesos (RPA)',
      slug: 'automatizacion',
      shortDescription: 'Conectamos tus herramientas para eliminar tareas manuales e ineficiencias.',
      fullDescription: 'Analizamos tus flujos de trabajo actuales e implementamos integraciones y automatizaciones para que la información fluya sin intervención humana. Ahorra cientos de horas al mes que tu equipo puede dedicar a tareas de mayor valor estratégico.',
    },
  ],

  tabs: [
    {
      title: 'Desarrollo Ágil',
      content: 'Trabajamos con metodologías ágiles que nos permiten entregar valor continuo. Dividimos los proyectos en fases manejables (sprints) para que puedas ver resultados reales rápidamente y ajustar el rumbo según las necesidades de tu negocio.',
    },
    {
      title: 'Código Escalable',
      content: 'No construimos soluciones desechables. Diseñamos nuestras arquitecturas pensando en el crecimiento futuro de tu empresa, garantizando que el sistema pueda manejar más usuarios, más datos y nuevas funcionalidades sin tener que reescribirse desde cero.',
    },
    {
      title: 'Soporte Continuo',
      content: 'Nuestro compromiso no termina con el lanzamiento. Ofrecemos planes de mantenimiento y soporte proactivo para asegurar que tu software siga funcionando perfectamente, se mantenga seguro frente a nuevas amenazas y evolucione con tu negocio.',
    },
  ],

  team: [
    {
      name: 'Diego de Lezrai',
      title: 'Fundador & Tech Lead',
      bio: 'Especialista en desarrollo Full-Stack e integración de Inteligencia Artificial. Dedicado a transformar negocios tradicionales en empresas eficientes impulsadas por la tecnología.',
      specialties: ['Desarrollo Web', 'IA Generativa', 'Arquitectura de Software'],
    }
  ],

  testimonials: [
    {
      name: 'Cliente A.',
      quote: 'Increíble cómo el agente de IA redujo nuestra carga de atención al cliente en un 70%. Ahora podemos enfocarnos en ventas reales.',
      rating: 5,
      caseType: 'Agentes IA',
    },
    {
      name: 'Cliente B.',
      quote: 'El sistema interno que desarrollaron nos permitió organizar toda la logística de la empresa que antes manejábamos con Excel. Un cambio total.',
      rating: 5,
      caseType: 'Sistemas Internos',
    }
  ],

  booking: {
    enabled: true,
    ctaText: 'Agendar Llamada de Descubrimiento',
  },

  seo: {
    siteTitle: 'Lezrai | Software a medida mediante Inteligencia Artificial',
    titleTemplate: '%s | Lezrai',
    defaultDescription: 'Digitaliza tu empresa con software a medida mediante inteligencia artificial. Agentes de atención 24/7, webs y sistemas internos.',
    locale: 'es_AR',
  },

  legal: {
    privacyLastUpdated: '2025-01-15',
    termsLastUpdated: '2025-01-15',
  },
}
