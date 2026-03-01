import { generateWelcomeEmailHtml } from '@/lib/email/templates/welcome-html';

export async function sendWelcomeEmailDelayed(email: string, name?: string) {
    const userName = name || email.split('@')[0];
    const htmlEmail = generateWelcomeEmailHtml(userName);
    const subject = `¡Adentro! Bienvenido a LezaiGroup 🚀`;

    // Envío en 1 minuto (60,000 milisegundos)
    setTimeout(async () => {
        try {
            if (process.env.RESEND_API_KEY) {
                console.log('Enviando email de bienvenida diferido vía Resend...');
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);

                await resend.emails.send({
                    from: 'LezaiGroup <onboarding@resend.dev>',
                    to: email,
                    subject,
                    html: htmlEmail,
                });
                console.log('Email de bienvenida enviado (Resend).');
            } else if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
                console.log('Enviando email de bienvenida diferido vía Zoho SMTP...');
                const nodemailer = await import('nodemailer');
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST || 'smtp.zoho.com',
                    port: Number(process.env.SMTP_PORT) || 465,
                    secure: Number(process.env.SMTP_PORT) === 465,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD,
                    },
                });

                await transporter.sendMail({
                    from: `"LezaiGroup" <${process.env.SMTP_USER}>`,
                    to: email,
                    replyTo: process.env.SMTP_USER,
                    subject,
                    html: htmlEmail,
                    text: `¡Bienvenido a LezaiGroup! Nos emociona tenerte a bordo. Conoce más de nuestros servicios en https://lezrai.com`,
                    headers: {
                        'X-Entity-Ref-ID': Date.now().toString(),
                        'List-Unsubscribe': `<mailto:${process.env.SMTP_USER}?subject=unsubscribe>`,
                    }
                });
                console.log('Email de bienvenida enviado (Zoho SMTP).');
            } else {
                console.warn('No hay credenciales configuradas para enviar el email de bienvenida a:', email);
            }
        } catch (error) {
            console.error('Error enviando email de bienvenida en background:', error);
        }
    }, 60000); // 60 segundos de retraso
}
