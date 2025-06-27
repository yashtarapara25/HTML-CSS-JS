const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "What is 5 * 6?",
    options: ["11", "30", "56", "60"],
    answer: "30"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "Python", "C", "JavaScript"],
    answer: "JavaScript"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const highscoreEl = document.getElementById("highscores");

function startTimer() {
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      showAnswer(null);
    }
  }, 1000);
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => {
      clearInterval(timer);
      showAnswer(option);
    };
    optionsEl.appendChild(li);
  });
  startTimer();
}

function showAnswer(selected) {
  const q = quizData[currentQuestion];
  const options = document.querySelectorAll("#options li");
  options.forEach(li => {
    if (li.textContent === q.answer) {
      li.classList.add("correct");
    } else if (li.textContent === selected) {
      li.classList.add("wrong");
    }
    li.onclick = null;
  });
  if (selected === q.answer) score++;
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentQuestion++;
  nextBtn.style.display = "none";
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;
  saveHighScore(score);
  displayHighScores();
}

function saveHighScore(score) {
  const highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
  highscores.push(score);
  highscores.sort((a, b) => b - a);
  localStorage.setItem("highscores", JSON.stringify(highscores.slice(0, 5)));
}

function displayHighScores() {
  const highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
  highscoreEl.innerHTML = highscores.map(s => `<li>⭐ ${s}</li>`).join("");
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

loadQuestion();
