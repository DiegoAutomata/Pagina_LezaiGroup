import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { messages } = body;

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.warn("OPENROUTER_API_KEY is missing. Please set it in .env.local");
            return NextResponse.json({ error: "Missing API Key configuration" }, { status: 500 });
        }

        const systemPrompt = `Tu nombre es Lezi, eres el asistente de IA premium y representante oficial de Lezrai. Eres profesional, conciso, amable y tecnológico. NO ofrezcas servicios distintos a los listados.

CONTEXTO DEL NEGOCIO (LEZRAI):
Somos una fábrica de software experta en consultoría e implementaciones de inteligencia artificial corporativa. Nuestro objetivo es digitalizar empresas y mejorar sus procesos mediante agentes inteligentes y plataformas web.

SERVICIOS PRINCIPALES:
1. Agentes Autónomos de IA: Atención al Cliente 24/7 y Secretario Personal.
2. Desarrollo de Software a Medida: Webs profesionales interactivos y Desarrollo de Apps de alta escalabilidad.

INSTRUCCIONES CLAVE DE FORMATO Y COMPORTAMIENTO (¡CRÍTICO!):
- ERES EXCLUSIVAMENTE UN ASESOR DE LEZRAI. NUNCA respondas preguntas fuera de tu ámbito corporativo (ej: no debes dar el clima, ni recetas, ni programar por el usuario, ni hablar de temas aleatorios). Si te preguntan algo fuera de tema de IA as a Service o Desarrollo a Medida, responde amablemente y de forma muy corta que como asistente de Lezrai solo puedes hablar sobre las soluciones tecnológicas que ofrece la empresa, e invita a hablar de ello.
- NUNCA digas "Soy Eres Lezi", preséntate correctamente como "Soy Lezi".
- SÉ EXTREMADAMENTE BREVE. Tus interacciones enteras no deben superar las 2 o 3 oraciones en total. Evita textos largos, la gente no los lee. Ve directo al grano.
- ¡IMPRESCINDIBLE!: Separa cada frase o idea corta con un DOBLE SALTO DE LÍNEA (presiona Enter dos veces). El sistema partirá tu respuesta y enviará cada párrafo como un globo de chat independiente.
- Mantén un estilo de chat orgánico humano (ej: saludo, doble salto, pregunta rápida).
- Promueve agendar una asesoría comercial ante dudas de precios o tiempos detallados.`;

        // Format messages for OpenRouter (OpenAI-compatible format)
        const formattedMessages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...messages.map((m: any) => ({
                role: m.role,
                content: m.content
            }))
        ];

        const modelsToTry = [
            "nousresearch/hermes-3-llama-3.1-405b:free",
            "meta-llama/llama-3.3-70b-instruct:free",
            "qwen/qwen3-next-80b-a3b-instruct:free",
            "google/gemma-3-27b-it:free",
            "mistralai/mistral-small-3.1-24b-instruct:free",
            "nvidia/nemotron-3-nano-30b-a3b:free",
            "upstage/solar-pro-3:free",
            "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
            "google/gemma-3n-e4b-it:free",
            "arcee-ai/trinity-large-preview:free"
        ];

        const tools = [
            {
                type: "function",
                function: {
                    name: "checkCalendarAvailability",
                    description: "Revisa la disponibilidad en el calendario en una fecha específica (YYYY-MM-DD).",
                    parameters: {
                        type: "object",
                        properties: {
                            date: { type: "string", description: "Fecha a consultar en formato YYYY-MM-DD" }
                        },
                        required: ["date"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "bookMeeting",
                    description: "Agenda una reunión en el calendario de la empresa y notifica por email pidiendo los datos del cliente.",
                    parameters: {
                        type: "object",
                        properties: {
                            title: { type: "string", description: "Título descriptivo de la cita" },
                            startTime: { type: "string", description: "Fecha y hora de inicio en formato ISO (ej: 2024-03-01T10:00:00Z)" },
                            endTime: { type: "string", description: "Fecha y hora de fin en formato ISO (ej: 2024-03-01T10:30:00Z)" },
                            clientEmail: { type: "string", description: "Email del cliente para notificarle" }
                        },
                        required: ["title", "startTime", "endTime", "clientEmail"]
                    }
                }
            }
        ];

        let replyText = "";
        let lastError = null;

        for (const model of modelsToTry) {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
                        "X-Title": "LezaiGroup AI Agent"
                    },
                    body: JSON.stringify({
                        model: model,
                        temperature: 0.3,
                        messages: formattedMessages,
                        tools: tools,
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`[${model}] Error:`, errorText);
                    lastError = new Error(`API error: ${response.status}`);
                    continue; // Try next model
                }

                const data = await response.json();
                const message = data.choices[0].message;

                // Handle tool calls
                if (message.tool_calls && message.tool_calls.length > 0) {
                    const toolCall = message.tool_calls[0];
                    const functionName = toolCall.function.name;
                    const args = JSON.parse(toolCall.function.arguments);

                    console.log(`Ejecutando tool call: ${functionName}`, args);

                    let toolResult = "";

                    if (functionName === "checkCalendarAvailability") {
                        const { checkZohoCalendarAvailability } = await import('@/lib/zoho/calendar');
                        const result = await checkZohoCalendarAvailability(args.date);
                        toolResult = JSON.stringify(result);
                    } else if (functionName === "bookMeeting") {
                        const { createZohoCalendarEvent } = await import('@/lib/zoho/calendar');
                        const { sendGmailNotification } = await import('@/lib/email/gmail');

                        const result = await createZohoCalendarEvent({
                            title: args.title,
                            startTime: args.startTime,
                            endTime: args.endTime,
                            attendeeEmail: args.clientEmail
                        });

                        if (result.success) {
                            await sendGmailNotification({
                                to: 'contacto@lezrai.com',
                                subject: `Nueva Cita Agendada: ${args.title}`,
                                html: `<p>El Agente de IA ha agendado una nueva cita.</p><p><strong>Cliente:</strong> ${args.clientEmail}</p><p><strong>Inicio:</strong> ${args.startTime}</p>`
                            });
                            toolResult = JSON.stringify({ success: true, message: "Cita agendada correctamente y notificada al equipo." });
                        } else {
                            toolResult = JSON.stringify({ success: false, message: "Error agendando cita: " + result.error });
                        }
                    }

                    // For simplicy in this serverless function, if a tool was called, we append the result and make ONE MORE call to the same model
                    formattedMessages.push(message);
                    formattedMessages.push({
                        role: "tool",
                        name: functionName,
                        content: toolResult,
                        tool_call_id: toolCall.id
                    });

                    const secondResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${apiKey}`,
                            "Content-Type": "application/json",
                            "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
                        },
                        body: JSON.stringify({
                            model: model,
                            temperature: 0.3,
                            messages: formattedMessages
                        })
                    });

                    const secondData = await secondResponse.json();
                    replyText = secondData.choices[0].message.content;
                } else {
                    replyText = message.content;
                }

                // Remove deepseek thinking blocks <think>...</think> if present
                if (replyText && replyText.includes('<think>')) {
                    replyText = replyText.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                }

                if (replyText) {
                    break; // Success! Exit the loop
                }

            } catch (err) {
                console.error(`[${model}] Connection error:`, err);
                lastError = err;
            }
        }

        if (!replyText) {
            throw lastError || new Error("All free models failed to respond");
        }

        return NextResponse.json({ output: replyText });

    } catch (error) {
        console.error("Error connecting to OpenRouter:", error);
        return NextResponse.json({
            output: "Disculpa, estoy experimentando una saturación temporal. Por favor intenta de nuevo en un momento, los sistemas se están estabilizando."
        }, { status: 200 });
    }
}
