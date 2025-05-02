import { questions, examSummary, scoreDisplay, timerDisplay, progressDisplay, completionContainer, finalScore } from './dom.js';
import { displaySummary } from './quiz.js';

let currentLanguage = 'en';

const translations = {
    en: {
        title: 'QCM Portal',
        import_prompt: 'Import a JSON file to start your exam.',
        json_format: 'JSON Format',
        json_requirements: 'Your JSON file should contain:',
        json_question: '<strong>question</strong>: Question text (non-empty).',
        json_choices: '<strong>choices</strong>: 4+ unique answer options.',
        json_response: '<strong>response</strong> or <strong>responses</strong>: Correct answer(s).',
        json_description: '<strong>description</strong>: Explanation of correct choice.',
        example: 'Example:',
        import_button: 'Import QCM .json',
        importing: 'Importing...',
        import_success: 'JSON file imported successfully!',
        import_error: 'Error: Invalid JSON format.',
        no_questions: 'No questions imported. Please import a JSON file first.',
        exam_title: 'QCM Exam',
        exam_summary: 'Imported {count} question{s}.',
        start_exam: 'Start Exam',
        import_new: 'Import New JSON',
        next_question: 'Next Question',
        skip_question: 'Skip Question',
        finish_exam: 'Finish Exam',
        exam_completed: 'Exam Completed!',
        your_score: 'Your score: {score} / {total} ({percentage}%)',
        answers: 'Answers',
        your_answer: 'Your answer: {answer} ({status})',
        correct_answer: 'Correct answer(s): {answers}',
        correct: 'Correct',
        incorrect: 'Incorrect',
        download_results: 'Download Results',
        restart_exam: 'Restart Exam',
        pdf_title: 'QCM Exam Results',
        pdf_score: 'Score: {score} / {total} ({percentage}%)',
        pdf_time: 'Time Taken: {time}',
        pdf_answers: 'Answers'
    },
    fr: {
        title: 'Portail QCM',
        import_prompt: 'Importez un fichier JSON pour commencer votre examen.',
        json_format: 'Format JSON',
        json_requirements: 'Votre fichier JSON doit contenir :',
        json_question: '<strong>question</strong> : Texte de la question (non vide).',
        json_choices: '<strong>choices</strong> : 4+ options de réponse uniques.',
        json_response: '<strong>response</strong> ou <strong>responses</strong> : Réponse(s) correcte(s).',
        json_description: '<strong>description</strong> : Explication du choix correct.',
        example: 'Exemple :',
        import_button: 'Importer QCM .json',
        importing: 'Importation...',
        import_success: 'Fichier JSON importé avec succès !',
        import_error: 'Erreur : Format JSON invalide.',
        no_questions: 'Aucune question importée. Veuillez d\'abord importer un fichier JSON.',
        exam_title: 'Examen QCM',
        exam_summary: '{count} question{s} importée{s}.',
        start_exam: 'Commencer l\'examen',
        import_new: 'Importer un nouveau JSON',
        next_question: 'Question suivante',
        skip_question: 'Passer la question',
        finish_exam: 'Terminer l\'examen',
        exam_completed: 'Examen terminé !',
        your_score: 'Votre score : {score} / {total} ({percentage}%)',
        answers: 'Réponses',
        your_answer: 'Votre réponse : {answer} ({status})',
        correct_answer: 'Réponse(s) correcte(s) : {answers}',
        correct: 'Correct',
        incorrect: 'Incorrect',
        download_results: 'Télécharger les résultats',
        restart_exam: 'Recommencer l\'examen',
        pdf_title: 'Résultats de l\'examen QCM',
        pdf_score: 'Score : {score} / {total} ({percentage}%)',
        pdf_time: 'Temps pris : {time}',
        pdf_answers: 'Réponses'
    },
    ar: {
        title: 'بوابة QCM',
        import_prompt: 'قم باستيراد ملف JSON لبدء الامتحان.',
        json_format: 'تنسيق JSON',
        json_requirements: 'يجب أن يحتوي ملف JSON على:',
        json_question: '<strong>question</strong>: نص السؤال (غير فارغ).',
        json_choices: '<strong>choices</strong>: 4+ خيارات إجابة فريدة.',
        json_response: '<strong>response</strong> أو <strong>responses</strong>: الإجابة (الإجابات) الصحيحة.',
        json_description: '<strong>description</strong>: شرح الخيار الصحيح.',
        example: 'مثال:',
        import_button: 'استيراد QCM .json',
        importing: 'جارٍ الاستيراد...',
        import_success: 'تم استيراد ملف JSON بنجاح!',
        import_error: 'خطأ: تنسيق JSON غير صالح.',
        no_questions: 'لم يتم استيراد أي أسئلة. الرجاء استيراد ملف JSON أولاً.',
        exam_title: 'امتحان QCM',
        exam_summary: 'تم استيراد {count} سؤال/أسئلة.',
        start_exam: 'بدء الامتحان',
        import_new: 'استيراد JSON جديد',
        next_question: 'السؤال التالي',
        skip_question: 'تخطي السؤال',
        finish_exam: 'إنهاء الامتحان',
        exam_completed: 'تم الانتهاء من الامتحان!',
        your_score: 'نتيجتك: {score} / {total} ({percentage}%)',
        answers: 'الإجابات',
        your_answer: 'إجابتك: {answer} ({status})',
        correct_answer: 'الإجابة (الإجابات) الصحيحة: {answers}',
        correct: 'صحيح',
        incorrect: 'غير صحيح',
        download_results: 'تحميل النتائج',
        restart_exam: 'إعادة الامتحان',
        pdf_title: 'نتائج امتحان QCM',
        pdf_score: 'النتيجة: {score} / {total} ({percentage}%)',
        pdf_time: 'الوقت المستغرق: {time}',
        pdf_answers: 'الإجابات'
    }
};

export function updateLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update static text
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key === 'exam_summary') {
            element.textContent = translations[lang][key].replace('{count}', questions.length).replace('{s}', questions.length === 1 ? '' : lang === 'fr' ? 's' : '');
        } else {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update dynamic content
    if (scoreDisplay.textContent) {
        scoreDisplay.textContent = `Score: ${window.score} / ${questions.length}`;
        timerDisplay.textContent = `Time: ${window.formatTime(window.elapsedTime)}`;
        progressDisplay.textContent = translations[lang].answers + ` ${window.currentQuestionIndex + 1} / ${questions.length}`;
    }
    if (!completionContainer.classList.contains('hidden')) {
        finalScore.textContent = translations[lang].your_score
            .replace('{score}', window.score)
            .replace('{total}', questions.length)
            .replace('{percentage}', (window.score / questions.length * 100).toFixed(2));
        displaySummary();
    }
}

export { currentLanguage, translations };