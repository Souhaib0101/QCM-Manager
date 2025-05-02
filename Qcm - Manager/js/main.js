import { initializeTheme, toggleTheme } from './theme.js';
import { updateLanguage } from './i18n.js';
import { importJson } from './json.js';
import { startQuiz, nextQuestion, restartQuiz, skipQuestion, finishExam } from './quiz.js';
import { showImportSection, showExamStartSection, showQuizSection } from './ui.js';
import { startTimer } from './timer.js';
import { generatePDF } from './pdf.js';
import { showToast } from './toast.js';
import {
    importButton, startExamButton, backToImportButton, nextQuestionButton,
    skipQuestionButton, finishExamButton, restartButton, newImportButton,
    downloadPdfButton, languageSelect, themeToggle, questions
} from './dom.js';

// Initialize app
updateLanguage('en');
initializeTheme();

// Event listeners
importButton.addEventListener('click', () => {
    importJson(() => {
        showExamStartSection();
        showToast('JSON file imported successfully!');
    });
});

startExamButton.addEventListener('click', () => {
    if (questions.length === 0) {
        showToast('No questions imported. Please import a JSON file first.', 'error');
        return;
    }
    startQuiz();
    showQuizSection();
    startTimer();
});

backToImportButton.addEventListener('click', () => {
    questions.length = 0;
    showImportSection();
});

nextQuestionButton.addEventListener('click', () => {
    nextQuestion();
});

skipQuestionButton.addEventListener('click', () => {
    skipQuestion();
});

finishExamButton.addEventListener('click', () => {
    finishExam();
});

restartButton.addEventListener('click', () => {
    restartQuiz();
    showQuizSection();
    startTimer();
});

newImportButton.addEventListener('click', () => {
    questions.length = 0;
    showImportSection();
});

downloadPdfButton.addEventListener('click', () => {
    generatePDF();
});

languageSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

themeToggle.addEventListener('click', toggleTheme);

themeToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// Keyboard accessibility
[importButton, startExamButton, backToImportButton, nextQuestionButton, skipQuestionButton, finishExamButton, restartButton, newImportButton, downloadPdfButton].forEach(button => {
    button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});