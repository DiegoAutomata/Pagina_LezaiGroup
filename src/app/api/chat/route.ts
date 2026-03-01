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
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`[${model}] Error:`, errorText);
                    lastError = new Error(`API error: ${response.status}`);
                    continue; // Try next model
                }

                const data = await response.json();
                replyText = data.choices[0].message.content;

                // Remove deepseek thinking blocks <think>...</think> if present
                if (replyText.includes('<think>')) {
                    replyText = replyText.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                }

                break; // Success! Exit the loop

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
        }, { status: 200 }); // Return 200 to fail gracefully on the frontend without console errors
    }
}
