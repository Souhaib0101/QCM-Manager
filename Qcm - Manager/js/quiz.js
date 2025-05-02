import { questions, questionText, choicesContainer, feedbackContainer, feedbackText, explanationText, nextQuestionButton, skipQuestionButton, finishExamButton, completionContainer, finalScore, summaryContainer, scoreDisplay, progressDisplay, questionContainer } from './dom.js';
import { shuffleArray } from './dom.js';
import { currentLanguage, translations } from './i18n.js';
import { stopTimer } from './timer.js';

window.currentQuestionIndex = 0;
window.score = 0;
window.examStarted = false;
window.userAnswers = [];

export function startQuiz() {
    window.examStarted = true;
    window.score = 0;
    window.currentQuestionIndex = 0;
    window.userAnswers = [];
    scoreDisplay.textContent = `Score: ${window.score} / ${questions.length}`;
    finishExamButton.classList.remove('hidden');
    displayQuestion();
}

export function displayQuestion() {
    const question = questions[window.currentQuestionIndex];
    questionText.textContent = question.question;
    choicesContainer.innerHTML = '';
    feedbackContainer.classList.add('hidden');
    nextQuestionButton.classList.add('hidden');
    skipQuestionButton.classList.remove('hidden');
    progressDisplay.textContent = translations[currentLanguage].answers + ` ${window.currentQuestionIndex + 1} / ${questions.length}`;

    const shuffledChoices = shuffleArray([...question.choices]);
    shuffledChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-3 rounded-md font-medium hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 w-full text-left text-lg';
        button.textContent = choice;
        button.addEventListener('click', () => handleChoiceSelection(choice, question));
        if (index === 0) button.focus();
        choicesContainer.appendChild(button);
    });
}

function handleChoiceSelection(choice, question) {
    const correctAnswers = question.response || question.responses;
    const isCorrect = correctAnswers.includes(choice);
    feedbackText.textContent = isCorrect ? translations[currentLanguage].correct : translations[currentLanguage].incorrect;
    feedbackText.className = `text-xl font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`;
    explanationText.textContent = question.description;
    feedbackContainer.classList.remove('hidden');
    nextQuestionButton.classList.remove('hidden');
    skipQuestionButton.classList.add('hidden');

    if (isCorrect && window.examStarted) {
        window.score++;
    }
    scoreDisplay.textContent = `Score: ${window.score} / ${questions.length}`;
    window.userAnswers[window.currentQuestionIndex] = { choice, isCorrect };

    // Highlight choices
    const choiceButtons = choicesContainer.querySelectorAll('button');
    choiceButtons.forEach(button => {
        button.disabled = true;
        if (correctAnswers.includes(button.textContent)) {
            button.classList.add('correct');
        } else if (button.textContent === choice) {
            button.classList.add('incorrect');
        }
    });
}

export function skipQuestion() {
    const question = questions[window.currentQuestionIndex];
    const correctAnswers = question.response || question.responses;
    window.userAnswers[window.currentQuestionIndex] = { choice: 'Skipped', isCorrect: false };
    
    // Show feedback for skipped question
    feedbackText.textContent = translations[currentLanguage].incorrect;
    feedbackText.className = 'text-xl font-medium text-red-600';
    explanationText.textContent = question.description;
    feedbackContainer.classList.remove('hidden');
    nextQuestionButton.classList.remove('hidden');
    skipQuestionButton.classList.add('hidden');

    // Highlight correct answers
    const choiceButtons = choicesContainer.querySelectorAll('button');
    choiceButtons.forEach(button => {
        button.disabled = true;
        if (correctAnswers.includes(button.textContent)) {
            button.classList.add('correct');
        }
    });
}

export function finishExam() {
    // Mark remaining questions as unanswered
    for (let i = window.currentQuestionIndex; i < questions.length; i++) {
        window.userAnswers[i] = { choice: 'Not answered', isCorrect: false };
    }
    endExam();
}

function endExam() {
    questionContainer.classList.add('hidden');
    completionContainer.classList.remove('hidden');
    finishExamButton.classList.add('hidden');
    finalScore.textContent = translations[currentLanguage].your_score
        .replace('{score}', window.score)
        .replace('{total}', questions.length)
        .replace('{percentage}', (window.score / questions.length * 100).toFixed(2));
    displaySummary();
    stopTimer();
}

export function nextQuestion() {
    window.currentQuestionIndex++;
    if (window.currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endExam();
    }
}

export function restartQuiz() {
    window.currentQuestionIndex = 0;
    window.score = 0;
    window.examStarted = false;
    window.userAnswers = [];
    window.elapsedTime = 0;
    stopTimer();
    timerDisplay.textContent = '';
    scoreDisplay.textContent = '';
    progressDisplay.textContent = '';
    questionContainer.classList.remove('hidden');
    completionContainer.classList.add('hidden');
    finishExamButton.classList.remove('hidden');
    displayQuestion();
}

export function displaySummary() {
    summaryContainer.innerHTML = `<h4 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">${translations[currentLanguage].answers}</h4>`;
    questions.forEach((q, i) => {
        const answer = window.userAnswers[i] || { choice: 'Not answered', isCorrect: false };
        const div = document.createElement('div');
        div.className = 'mb-4';
        div.innerHTML = `
            <p class="font-medium">Q${i + 1}: ${q.question}</p>
            <p>${translations[currentLanguage].your_answer.replace('{answer}', answer.choice).replace('{status}', answer.isCorrect ? translations[currentLanguage].correct : translations[currentLanguage].incorrect)}</p>
            <p>${translations[currentLanguage].correct_answer.replace('{answers}', (q.response || q.responses).join(', '))}</p>
        `;
        summaryContainer.appendChild(div);
    });
}