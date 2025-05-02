import { importButton, buttonText, loadingSpinner, questions } from './dom.js';
import { currentLanguage, translations } from './i18n.js';
import { showToast } from './toast.js';
import { restartQuiz } from './quiz.js';

export function importJson(onSuccess) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoadingState(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    const validationResult = validateJson(json);
                    if (validationResult !== true) {
                        throw new Error(validationResult);
                    }
                    questions.length = 0;
                    questions.push(...json);
                    restartQuiz();
                    onSuccess();
                    showToast(translations[currentLanguage].import_success);
                } catch (error) {
                    showToast(translations[currentLanguage].import_error + ' ' + error.message, 'error');
                } finally {
                    setLoadingState(false);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function validateJson(json) {
    if (!Array.isArray(json) || json.length === 0) {
        return translations[currentLanguage].import_error;
    }
    return json.every((q, index) => {
        if (typeof q.question !== 'string' || q.question.trim() === '') {
            return `Question ${index + 1}: Question text must be a non-empty string.`;
        }
        if (!Array.isArray(q.choices) || q.choices.length < 4) {
            return `Question ${index + 1}: Choices must be an array with 4 or more elements.`;
        }
        if (q.choices.some(c => typeof c !== 'string' || c.trim() === '')) {
            return `Question ${index + 1}: All choices must be non-empty strings.`;
        }
        const uniqueChoices = new Set(q.choices);
        if (uniqueChoices.size !== q.choices.length) {
            return `Question ${index + 1}: Choices must be unique.`;
        }
        const answers = q.response || q.responses;
        if (!Array.isArray(answers) || answers.length === 0) {
            return `Question ${index + 1}: Response or responses must be a non-empty array.`;
        }
        if (answers.some(a => !q.choices.includes(a))) {
            return `Question ${index + 1}: All responses must be valid choices.`;
        }
        if (typeof q.description !== 'string' || q.description.trim() === '') {
            return `Question ${index + 1}: Description must be a non-empty string.`;
        }
        return true;
    }) === true ? true : json.map((q, i) => {
        const result = validateJson([q]);
        return typeof result === 'string' ? result : null;
    }).filter(r => r)[0];
}

function setLoadingState(isLoading) {
    importButton.disabled = isLoading;
    buttonText.textContent = isLoading ? translations[currentLanguage].importing : translations[currentLanguage].import_button;
    loadingSpinner.classList.toggle('hidden', !isLoading);
}