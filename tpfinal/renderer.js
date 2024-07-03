document.addEventListener('DOMContentLoaded', async () => {
  const questions = await window.api.loadQuestions();
  let currentQuestionIndex = 0;
  let score = 0;

  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const scoreElement = document.getElementById('score');

  function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      questionElement.textContent = question.question;
      
      answersElement.innerHTML = '';
      const answers = [...question.incorrect_answers, question.correct_answer];
      answers.sort(() => Math.random() - 0.5); 

      answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersElement.appendChild(button);
      });
    } else {
      questionElement.textContent = 'Quiz terminé !';
      answersElement.innerHTML = '';
    }
  }

  function checkAnswer(answer) {
    if (questions[currentQuestionIndex].correct_answer === answer) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
      window.api.addPoint();
    }
    currentQuestionIndex++;
    loadQuestion();
  }

  loadQuestion();
});
