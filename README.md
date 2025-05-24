# QCM Portal User Guide

This guide explains how to use the **QCM Portal**, a web application for taking multiple-choice quizzes (QCM) by importing a JSON file.

---

## How to Use the QCM Portal

### 1. Access the Portal
- Open the QCM Portal in a web browser (works on desktop, tablet, or mobile).

### 2. Choose Language and Theme
- **Language**: Use the dropdown menu at the top-right to select **English**, **French**, or **Arabic**.
- **Theme**: Click the sun/moon icon at the top-right to switch between **light** and **dark** modes.

### 3. Import a JSON File
- On the main page, you’ll see an **Import QCM .json** button.
- Prepare a JSON/Text/... file with the following format:
  ```json
  [
      {
          "question": "Your question here",
          "choices": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "response": ["Correct option"],
          "description": "Explanation of the correct answer"
      }
  ]
  ```
- Click the **Import QCM .json** button, select your file, and wait for it to load.

### 4. Start the Quiz
- After importing, the **Exam Start** section appears with a summary of the quiz.
- Click **Start Exam** to begin.

### 5. Take the Quiz
- **Question**: Read the question and select an answer from the choices.
- **Feedback**: After answering, see if you were correct and read the explanation.
- **Actions**:
  - Click **Skip Question** to move to the next question without answering.
  - Click **Next Question** after answering to continue.
  - Click **Finish Exam** to end the quiz early.
- **Timer and Score**: The top of the quiz shows your score and remaining time.

### 6. Finish the Quiz
- When done, the **Exam Completed** section shows your final score and a summary.
- **Options**:
  - **Download Results**: Save your results as a PDF.
  - **Restart Exam**: Retry the same quiz.
  - **Import New JSON**: Upload a different JSON file to start a new quiz.

---

## Tips
- Ensure your JSON file follows the required format to avoid errors.
- Use the **Skip Question** button if you’re unsure of an answer.
- Check your score and time during the quiz to manage your progress.

That’s it! You’re ready to use the QCM Portal.
