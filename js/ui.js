// js/ui.js

// Renderizar estadísticas
function updateStats() {
    const elements = {
        power: document.getElementById('powerValue'),
        wisdom: document.getElementById('wisdomValue'),
        allies: document.getElementById('alliesValue'),
        reputation: document.getElementById('reputationValue'),
        life: document.getElementById('lifeValue'),
        happy: document.getElementById('happyValue'),
        children: document.getElementById('childrenValue')
    };

    Object.keys(elements).forEach(key => {
        if (elements[key] && stats[key] !== undefined) {
            elements[key].textContent = Math.floor(stats[key]);
        }
    });

    // Actualizar barra de evolución si existe
    const evolutionBar = document.getElementById('evolutionProgress');
    if (evolutionBar) evolutionBar.style.width = '0%'; // actualiza según tu lógica
}

// Renderizar escena principal
function renderScene() {
    const sceneContainer = document.getElementById('dialogue');
    if (!sceneContainer) return;

    if (aiModeActive && typeof askGroq === 'function') {
        // Modo IA activado (se maneja en ai.js)
        return;
    }

    const scene = SCENES[currentScene];
    if (!scene) {
        sceneContainer.innerHTML = "<p>Fin de la leyenda... por ahora.</p>";
        return;
    }

    typewriterText(sceneContainer, scene.text || "La historia continúa...");
    renderChoices(scene.choices || []);
    updateStats();
}

// Renderizar botones de elección
function renderChoices(choices) {
    const container = document.getElementById('choices');
    if (!container) return;
    
    container.innerHTML = '';

    choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => makeChoice(choice, index);
        container.appendChild(btn);
    });
}

// Ejecutar una elección
function makeChoice(choice) {
    if (choice.effect) {
        Object.keys(choice.effect).forEach(stat => {
            if (stats[stat] !== undefined) {
                stats[stat] += choice.effect[stat];
                // Evitar valores negativos
                if (stats[stat] < 0) stats[stat] = 0;
            }
        });
    }

    decisionCount++;
    addToLog(choice.text);

    if (choice.next) {
        currentScene = choice.next;
        renderScene();
    } else if (choice.aiPrompt) {
        // Activar IA para continuar
        triggerAIResponse(choice.aiPrompt);
    }
}

// Typewriter effect
function typewriterText(element, text, speed = 25) {
    let i = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            element.scrollTop = element.scrollHeight;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// Agregar entrada al log / crónica
function addToLog(text) {
    logEntries.unshift({
        time: new Date().toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'}),
        text: text
    });
    
    // Limitar log a 50 entradas
    if (logEntries.length > 50) logEntries.pop();
    
    // Actualizar UI del log si existe
    const logContainer = document.getElementById('logContainer');
    if (logContainer) {
        // render log aquí si quieres
    }
}

// Mostrar modal de IA
function showAIModal() {
    const modal = document.getElementById('aiProviderModal');
    if (modal) modal.classList.remove('hidden');
}

// Cerrar cualquier overlay
function closeOverlay(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('hidden');
}