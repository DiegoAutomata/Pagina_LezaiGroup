import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/config/siteConfig'
import { createClient, createServiceClient } from '@/shared/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, company, whatsappVolume, service, message } = body

    // Validate
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 })
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    console.log('Validación pasada. Body recibido:', body);

    // Insert into Supabase
    let supabase;
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('Usando Service Role Client para eludir RLS en contact_messages');
      supabase = createServiceClient()
    } else {
      console.log('Usando cliente Anónimo. Puede fallar si la política RLS no permite inserts');
      supabase = await createClient()
    }

    const insertData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || 'No especificado',
      company: company?.trim() || 'No especificada',
      whatsapp_volume: whatsappVolume?.trim() || 'No especificado',
      service: service?.trim() || 'No especificado',
      message: message?.trim() || 'Sin mensaje'
    }

    console.log('Intentando insertar en Supabase payload limpio:', insertData);

    const { data: dbData, error: dbError } = await supabase
      .from('contact_messages')
      .insert([insertData])
      .select()

    if (dbError) {
      console.error('CRITICAL: Error inserting into contact_messages Supabase:', JSON.stringify(dbError, null, 2))
      // Continue to email even if DB fails for some reason
    } else {
      console.log('Guardado en contact_messages exitoso:', dbData);
    }

    // Try to send email via Resend if configured
    const htmlEmail = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">Nuevo Lead - SaaS Factory</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Nombre:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${name.trim()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${email.trim()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Teléfono:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone.trim()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Empresa:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${company.trim()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Servicio de interés:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${service.trim()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Volumen WhatsApp:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${whatsappVolume?.trim() || 'No especificado'}</td></tr>
        </table>
        <div style="margin-top: 20px; background-color: #fff; padding: 15px; border-left: 4px solid #0070f3; border-radius: 4px;">
          <h4 style="margin-top: 0; margin-bottom: 10px; color: #555;">Desafío/Mensaje:</h4>
          <p style="white-space: pre-wrap; margin: 0; color: #444;">${message ? message.trim() : 'No proporcionó mensaje adicional.'}</p>
        </div>
        <div style="margin-top: 30px; text-align: center; color: #888; font-size: 12px;">
          <p>Generado automáticamente desde el sitio de ${siteConfig.firmName}</p>
        </div>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      try {
        console.log('Intentando enviar email a contacto@lezrai.com vía Resend...');
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        const { data: resendData, error: resendError } = await resend.emails.send({
          from: 'LexAgenda <onboarding@resend.dev>',
          to: 'contacto@lezrai.com',
          subject: `Nuevo Lead de Contacto: ${name.trim()} (${company.trim()})`,
          html: htmlEmail,
        })
      } catch (emailError) {
        console.error('Error sending email via Resend:', emailError)
      }
    } else if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        console.log('Intentando enviar email a contacto@lezrai.com vía SMTP (Nodemailer)...');
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
          from: `"SaaS Factory Lead" <${process.env.SMTP_USER}>`,
          to: 'contacto@lezrai.com',
          subject: `Nuevo Lead de Contacto: ${name.trim()} (${company.trim()})`,
          html: htmlEmail,
        });
        console.log('Email enviado por SMTP exitosamente');
      } catch (smtpError) {
        console.error('Error sending email via SMTP:', smtpError);
      }
    } else {
      console.log('Contact form submission (No email credentials configured in .env.local):', {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        service: service.trim()
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
