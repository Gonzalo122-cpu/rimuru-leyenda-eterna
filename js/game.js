// js/game.js

let playerName = "Rimuru";
let currentScene = "intro";
let decisionCount = 0;
let aiModeActive = false;
let logEntries = [];

let stats = {
    power: 10,
    wisdom: 5,
    allies: 0,
    reputation: 10,
    life: 100,
    happy: 80,
    children: 0,
    // Agrega aquí todos los stats que uses en tu juego
};

const SCENES = {
    // Pega aquí TODAS las escenas que tenías definidas (falmuth_wrath2, chloe_appears, etc.)
    // Es el objeto grande que estaba en tu archivo original
    intro: { /* ... */ },
    // ... todas las demás
};

const EVOLUTION_TIERS = [ /* pega tus tiers de evolución */ ];

const DRAW_FNS = {
    // Todas tus funciones de dibujo (drawSlimeBasic, drawAbyssLord, etc.)
};

// Agrega aquí cualquier otra variable global grande (log, world status, etc.)