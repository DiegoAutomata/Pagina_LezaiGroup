import { siteConfig } from '@/config/siteConfig'

export const generateWelcomeEmailHtml = (userName: string = 'Usuario') => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a ${siteConfig.firmName}</title>
    <style>
        .cta-button {
            transition: all 0.3s ease !important;
        }
        .cta-button:hover {
            background-color: #3b82f6 !important;
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.8) !important;
            border-color: #60a5fa !important;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6; line-height: 1.6; font-size: 16px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #030712; padding: 40px 20px;">
        <tr>
            <td align="center">
                <!-- Wrapper Box -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 0 30px rgba(8, 145, 178, 0.2); border: 1px solid #1f2937;">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #1f2937;">
                            <h1 style="margin: 0; font-size: 28px; color: #ffffff; letter-spacing: -0.5px; font-weight: 800;">
                                Bienvenida a <span style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent;">${siteConfig.firmName}</span>
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px 0; color: #d1d5db;">Hola <strong style="color: #ffffff;">${userName}</strong>,</p>
                            
                            <p style="margin: 0 0 20px 0; color: #d1d5db;">¡Te damos la bienvenida a <strong style="color: #ffffff;">${siteConfig.firmName}</strong>!</p>
                            
                            <p style="margin: 0 0 20px 0; color: #d1d5db;">Nos emociona mucho tenerte a bordo. En nuestra plataforma, estamos enfocados en ayudar a las empresas a transformar procesos complejos en sistemas inteligentes, fluidos y escalables mediante inteligencia artificial.</p>
                            
                            <p style="margin: 0 0 30px 0; color: #d1d5db;">Si alguna vez tienes una pregunta, necesitas ayuda con tu panel o simplemente quieres charlar sobre cómo la IA puede resolver cuellos de botella en tu negocio, puedes responder directamente a este correo. Leemos y respondemos todos los mensajes personalmente.</p>
                            
                            <div style="text-align: center; margin: 45px 0;">
                                <a href="https://lezrai.com" class="cta-button" style="display: inline-block; padding: 16px 36px; background-color: #030712; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 50px; text-align: center; font-size: 16px; box-shadow: 0 0 15px rgba(37, 99, 235, 0.6); border: 1px solid #3b82f6;">
                                    Acceder a la Plataforma
                                </a>
                            </div>
                            
                            <p style="margin: 0 0 10px 0; color: #d1d5db;">¡Hablemos pronto!</p>
                            
                            <p style="margin: 0; color: #9ca3af;">
                                Saludos,<br>
                                <strong style="color: #ffffff;">Diego de ${siteConfig.firmName}</strong>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #030712; padding: 24px 40px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #1f2937; line-height: 1.5;">
                            <p style="margin: 0;">&copy; 2025 ${siteConfig.firmName}. Todos los derechos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}
