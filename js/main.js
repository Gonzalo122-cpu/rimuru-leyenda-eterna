// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    renderScene();
    updateStats();

    // Configura botones de IA
    const groqBtn = document.getElementById('saveGroqBtn');
    if (groqBtn) groqBtn.addEventListener('click', () => {
        const key = document.getElementById('groqKeyInp').value.trim();
        saveGroqKey(key);
    });

    // Otros event listeners (botones de tabs, exportar, etc.)
});
