const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const apiKey = env.split('\n').find(l=>l.startsWith('OPENROUTER_API_KEY=')).split('=')[1].replace(/"/g, '');

const allFreeModels = [
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "sophosympatheia/rogue-rose-103b-v0.2:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  'upstage/solar-pro-3:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'qwen/qwen3-coder:free',
  'google/gemma-3n-e4b-it:free',
  'nvidia/nemotron-3-nano-30b-a3b:free'
];

async function test() {
    for (const model of allFreeModels) {
        process.stdout.write(`Testing: ${model}... `);
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
        if (!res.ok) console.log(`FAILED (${JSON.parse(text).error.code})`);
        else console.log(`✅ SUCCESS!`);
    }
}
test();
