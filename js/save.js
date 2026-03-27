// js/save.js

function saveGame() {
    const saveData = {
        playerName,
        currentScene,
        decisionCount,
        stats,
        aiModeActive
    };
    localStorage.setItem('rimuruSave', JSON.stringify(saveData));
    alert('✅ Partida guardada');
}

function loadGame() {
    const saved = localStorage.getItem('rimuruSave');
    if (saved) {
        const data = JSON.parse(saved);
        playerName = data.playerName || "Rimuru";
        currentScene = data.currentScene || "intro";
        stats = data.stats || stats;
        // etc.
    }
}

function exportToPDF() {
    alert("Función de exportar a PDF (puedes implementar con jsPDF)");
}