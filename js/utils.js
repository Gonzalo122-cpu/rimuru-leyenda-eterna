// js/utils.js

function typewriterText(element, text, speed = 20) {
    let i = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

function getScore(stats) {
    return stats.power * 2 + stats.wisdom * 3 + stats.allies * 4 + stats.reputation * 2.5;
}

// Otras funciones útiles (random, clamp, etc.)