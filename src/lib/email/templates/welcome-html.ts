import { siteConfig } from '@/config/siteConfig'

export const generateWelcomeEmailHtml = (userName: string = 'Usuario') => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a ${siteConfig.firmName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #1a1a1a; border-radius: 16px; overflow: hidden; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 40px 20px; background: linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(245,158,11,0.1) 100%);">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">
                                Bienvenido a <span style="color: #3b82f6;">${siteConfig.firmName}</span>
                            </h1>
                            <p style="color: #a3a3a3; font-size: 16px; margin-top: 10px; margin-bottom: 0;">Impulsando el futuro de tu empresa con Inteligencia Artificial.</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <p style="color: #e5e5e5; font-size: 16px; line-height: 1.6; margin-top: 0;">
                                Hola <strong>${userName}</strong>,
                            </p>
                            <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                                Nos emociona tenerte a bordo. En LezaiGroup, transformamos procesos complejos en sistemas inteligentes, fluidos y escalables. Estás a un paso de comenzar a recuperar tu tiempo y maximizar los resultados de tu negocio.
                            </p>
                            
                            <!-- Highlights -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin: 30px 0; background-color: #262626; border-radius: 12px; padding: 20px;">
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 5px 0;">🤖 Agentes Inteligentes</h3>
                                        <p style="color: #a3a3a3; font-size: 14px; margin: 0;">Atención 24/7 para tus clientes sin esfuerzo manual.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 5px 0;">💻 Plataformas a Medida</h3>
                                        <p style="color: #a3a3a3; font-size: 14px; margin: 0;">Software robusto con un diseño de impacto visual.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 5px 0;">🚀 Escalabilidad</h3>
                                        <p style="color: #a3a3a3; font-size: 14px; margin: 0;">Infraestructura lista para crecer junto con tu empresa.</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                                ¿Listo para descubrir más? Conéctate a tu panel y explora.
                            </p>

                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td align="center">
                                        <a href="https://lezrai.com" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);">
                                            Conoce nuestros servicios
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 30px 40px; border-top: 1px solid #333;">
                            <p style="color: #737373; font-size: 13px; margin: 0 0 10px 0;">
                                Si tienes alguna pregunta o necesitas asistencia, no dudes en <a href="mailto:contacto@lezrai.com" style="color: #3b82f6; text-decoration: none;">contactarnos</a>.
                            </p>
                            <p style="color: #525252; font-size: 12px; margin: 0;">
                                &copy; ${new Date().getFullYear()} ${siteConfig.firmName}. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `
}
