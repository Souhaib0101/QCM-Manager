import { timerDisplay } from './dom.js';

window.elapsedTime = 0;
let timerInterval = null;

export function startTimer() {
    window.startTime = Date.now();
    timerInterval = setInterval(() => {
        window.elapsedTime = Math.floor((Date.now() - window.startTime) / 1000);
        timerDisplay.textContent = `Time: ${formatTime(window.elapsedTime)}`;
    }, 1000);
}

export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

window.formatTime = formatTime;