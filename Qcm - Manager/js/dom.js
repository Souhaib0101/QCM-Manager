export const importSection = document.getElementById('importSection');
export const examStartSection = document.getElementById('examStartSection');
export const quizSection = document.getElementById('quizSection');
export const importButton = document.getElementById('importButton');
export const buttonText = document.getElementById('buttonText');
export const loadingSpinner = document.getElementById('loadingSpinner');
export const toastContainer = document.getElementById('toastContainer');
export const startExamButton = document.getElementById('startExamButton');
export const backToImportButton = document.getElementById('backToImportButton');
export const questionContainer = document.getElementById('questionContainer');
export const questionText = document.getElementById('questionText');
export const choicesContainer = document.getElementById('choicesContainer');
export const feedbackContainer = document.getElementById('feedbackContainer');
export const feedbackText = document.getElementById('feedbackText');
export const explanationText = document.getElementById('explanationText');
export const nextQuestionButton = document.getElementById('nextQuestionButton');
export const skipQuestionButton = document.getElementById('skipQuestionButton');
export const finishExamButton = document.getElementById('finishExamButton');
export const completionContainer = document.getElementById('completionContainer');
export const finalScore = document.getElementById('finalScore');
export const summaryContainer = document.getElementById('summaryContainer');
export const restartButton = document.getElementById('restartButton');
export const newImportButton = document.getElementById('newImportButton');
export const downloadPdfButton = document.getElementById('downloadPdfButton');
export const scoreDisplay = document.getElementById('scoreDisplay');
export const timerDisplay = document.getElementById('timerDisplay');
export const progressDisplay = document.getElementById('progressDisplay');
export const examSummary = document.getElementById('examSummary');
export const languageSelect = document.getElementById('languageSelect');
export const themeToggle = document.getElementById('themeToggle');

export const questions = [];

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}