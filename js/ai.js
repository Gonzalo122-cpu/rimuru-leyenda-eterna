// js/ai.js - Integración Groq con fallback mejorado

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

let groqKey = localStorage.getItem('groq_api_key') || '';
let openrouterKey = localStorage.getItem('openrouter_api_key') || '';
let currentProvider = 'groq'; // 'groq' | 'openrouter' | 'gemini'

function saveGroqKey(key) {
    if (key && key.startsWith('gsk_')) {
        localStorage.setItem('groq_api_key', key);
        groqKey = key;
        alert('✅ Clave Groq guardada correctamente');
        return true;
    }
    alert('❌ La clave debe comenzar con "gsk_"');
    return false;
}

async function askAI(prompt) {
    const systemPrompt = `Eres un narrador maestro de historias isekai. 
    El protagonista es ${playerName}, un slime que se ha convertido en una leyenda eterna en un mundo fusionado (Tensei Slime + Overlord + otros). 
    Mantén el tono épico, inmersivo, coherente y con un toque de humor negro cuando corresponda.`;

    try {
        if (groqKey && currentProvider === 'groq') {
            return await callGroq(prompt, systemPrompt);
        } else if (openrouterKey) {
            return await callOpenRouter(prompt, systemPrompt);
        } else {
            throw new Error("No hay proveedor configurado");
        }
    } catch (error) {
        console.warn("Error con proveedor principal:", error.message);
        
        // Fallback automático
        if (groqKey && currentProvider !== 'groq') {
            currentProvider = 'groq';
            return await callGroq(prompt, systemPrompt);
        }
        
        throw error;
    }
}

async function callGroq(prompt, systemPrompt) {
    const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqKey}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            temperature: 0.82,
            max_tokens: 950
        })
    });

    if (!res.ok) throw new Error(`Groq: ${res.status}`);
    const data = await res.json();
    return data.choices[0].message.content;
}

async function callOpenRouter(prompt, systemPrompt) {
    // Implementación similar para OpenRouter...
    // (puedes completarla después)
}

// Función para usar desde el juego
async function triggerAIResponse(userDecision) {
    try {
        document.getElementById('dialogue').innerHTML = "<p><em>La IA está pensando...</em></p>";
        
        const response = await askAI(userDecision);
        
        const dialogue = document.getElementById('dialogue');
        typewriterText(dialogue, response);
        
        addToLog("IA: " + response.substring(0, 80) + "...");
    } catch (err) {
        alert("Error con la IA: " + err.message + "\n\nIntenta configurar una clave válida.");
    }
}