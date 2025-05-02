import { currentLanguage, translations } from './i18n.js';
import { questions } from './dom.js';

// Placeholder for Amiri font base64 (replace with full base64-encoded Amiri-Regular.ttf)
const amiriFontBase64 = 'data:font/ttf;base64,...'; // Full base64 string required (~100KB)

export function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Add Amiri font for Arabic
    doc.addFileToVFS('Amiri-Regular.ttf', amiriFontBase64);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'bold');

    // Constants
    const marginLeft = 20;
    const marginRight = 20;
    const marginTop = 15;
    const marginBottom = 15;
    const pageWidth = 210; // A4 width in mm
    const maxWidth = pageWidth - marginLeft - marginRight;
    const lineHeight = 6;
    const headerHeight = 15;
    const footerHeight = 10;

    // Set font based on language
    const isArabic = currentLanguage === 'ar';
    const font = isArabic ? 'Amiri' : 'helvetica';
    doc.setFont(font, 'normal');

    // Colors
    const blue = [37, 99, 235]; // Tailwind bg-blue-600
    const green = [22, 163, 74]; // Tailwind green-600
    const red = [220, 38, 38]; // Tailwind red-600

    // Function to add header
    function addHeader() {
        doc.setFontSize(18);
        doc.setFont(font, 'bold');
        doc.setTextColor(...blue);
        const title = translations[currentLanguage].pdf_title;
        doc.text(title, isArabic ? pageWidth - marginRight : marginLeft, marginTop + 5, {
            align: isArabic ? 'right' : 'left'
        });
        doc.setDrawColor(...blue);
        doc.line(marginLeft, marginTop + 10, pageWidth - marginRight, marginTop + 10);
        doc.setFont(font, 'normal');
    }

    // Function to add footer
    function addFooter() {
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(100);
            const pageText = `Page ${i} of ${pageCount}`;
            doc.text(pageText, pageWidth / 2, 297 - marginBottom, { align: 'center' });
        }
    }

    // Initialize first page
    addHeader();
    let y = marginTop + headerHeight;

    // Score and time
    doc.setFontSize(12);
    doc.setTextColor(0);
    const scoreText = translations[currentLanguage].pdf_score
        .replace('{score}', window.score)
        .replace('{total}', questions.length)
        .replace('{percentage}', (window.score / questions.length * 100).toFixed(2));
    const timeText = translations[currentLanguage].pdf_time.replace('{time}', window.formatTime(window.elapsedTime));
    const scoreLines = doc.splitTextToSize(scoreText, maxWidth);
    doc.text(scoreLines, isArabic ? pageWidth - marginRight : marginLeft, y, { align: isArabic ? 'right' : 'left' });
    y += scoreLines.length * lineHeight;
    const timeLines = doc.splitTextToSize(timeText, maxWidth);
    doc.text(timeLines, isArabic ? pageWidth - marginRight : marginLeft, y, { align: isArabic ? 'right' : 'left' });
    y += timeLines.length * lineHeight * 1.5;

    // Answers section header
    doc.setFontSize(14);
    doc.setFont(font, 'bold');
    doc.setTextColor(...blue);
    const answersHeader = translations[currentLanguage].pdf_answers;
    doc.text(answersHeader, isArabic ? pageWidth - marginRight : marginLeft, y, { align: isArabic ? 'right' : 'left' });
    y += lineHeight * 1.5;
    doc.setFont(font, 'normal');

    // Questions and answers
    questions.forEach((q, i) => {
        const answer = window.userAnswers[i] || { choice: 'Not answered', isCorrect: false };

        // Check for page break
        if (y > 297 - marginBottom - 40) {
            doc.addPage();
            addHeader();
            y = marginTop + headerHeight;
        }

        // Question
        doc.setFontSize(12);
        doc.setFont(font, 'bold');
        doc.setTextColor(0);
        const questionText = `Q${i + 1}: ${q.question}`;
        const questionLines = doc.splitTextToSize(questionText, maxWidth);
        doc.text(questionLines, isArabic ? pageWidth - marginRight : marginLeft, y, { align: isArabic ? 'right' : 'left' });
        y += questionLines.length * lineHeight;

        // User answer
        doc.setFont(font, 'normal');
        const userAnswerText = translations[currentLanguage].your_answer
            .replace('{answer}', answer.choice)
            .replace('{status}', answer.isCorrect ? translations[currentLanguage].correct : translations[currentLanguage].incorrect);
        doc.setTextColor(...(answer.isCorrect ? green : red));
        const userAnswerLines = doc.splitTextToSize(userAnswerText, maxWidth);
        doc.text(userAnswerLines, isArabic ? pageWidth - marginRight : marginLeft, y, { align: isArabic ? 'right' : 'left' });
        y += userAnswerLines.length * lineHeight;

        // Correct answer
        doc.setTextColor(0);
        const correctAnswerText = translations[currentLanguage].correct_answer
            .replace('{answers}', (q.response || q.responses).join(', '));
        const correctAnswerLines = doc.splitTextToSize(correctAnswerText, maxWidth);
        doc.text(correctAnswerLines, isArabic ? pageWidth - marginRight : marginLeft, y, { align: isArabic ? 'right' : 'left' });
        y += correctAnswerLines.length * lineHeight;

        // Explanation
        const explanationText = `Explanation: ${q.description}`;
        const explanationLines = doc.splitTextToSize(explanationText, maxWidth);
        doc.text(explanationLines, isArabic ? pageWidth - marginRight : marginLeft, y, { align: isArabic ? 'right' : 'left' });
        y += explanationLines.length * lineHeight + lineHeight * 1.5;
    });

    // Add footer to all pages
    addFooter();

    // Save PDF
    doc.save('qcm_results.pdf');
}