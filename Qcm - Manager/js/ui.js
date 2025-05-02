import { importSection, examStartSection, quizSection, examSummary, questions } from './dom.js';
import { currentLanguage, translations } from './i18n.js';
import { restartQuiz } from './quiz.js';

export function showImportSection() {
    importSection.classList.remove('hidden');
    examStartSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    restartQuiz();
}

export function showExamStartSection() {
    importSection.classList.add('hidden');
    examStartSection.classList.remove('hidden');
    quizSection.classList.add('hidden');
    examSummary.textContent = translations[currentLanguage].exam_summary
        .replace('{count}', questions.length)
        .replace('{s}', questions.length === 1 ? '' : currentLanguage === 'fr' ? 's' : '');
}

export function showQuizSection() {
    importSection.classList.add('hidden');
    examStartSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
}