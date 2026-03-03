const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const apiKey = env.split('\n').find(l=>l.startsWith('OPENROUTER_API_KEY=')).split('=')[1].replace(/"/g, '');

const modelsToTry = [
    "nousresearch/hermes-3-llama-3.1-405b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-3-27b-it:free",
    "mistralai/mistral-small-3.1-24b-instruct:free"
];

async function test() {
    for (const model of modelsToTry) {
        console.log(`Testing ${model}...`);
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: "user", content: "hola" }]
            })
        });
        const text = await res.text();
        if (!res.ok) console.log(`[${model}] Error:`, text);
        else console.log(`[${model}] Success:`, JSON.parse(text).choices[0].message.content);
    }
}
test();
