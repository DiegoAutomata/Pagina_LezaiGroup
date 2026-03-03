import nodemailer from 'nodemailer';

/**
 * Client para enviar correos usando Gmail mediante nodemailer.
 * Requiere GMAIL_USER y GMAIL_APP_PASSWORD en las variables de entorno.
 */
export async function sendGmailNotification({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
        console.error('Faltan configurar GMAIL_USER o GMAIL_APP_PASSWORD en las variables de entorno');
        return false;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user,
                pass,
            },
        });

        const info = await transporter.sendMail({
            from: `"Diego de Lezrai" <${user}>`,
            to,
            subject,
            html,
        });

        console.log('Notificación de Gmail enviada:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error enviando notificación por Gmail:', error);
        return false;
    }
}
