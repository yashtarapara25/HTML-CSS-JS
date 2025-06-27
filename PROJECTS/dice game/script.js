let userScore = 0;
let computerScore = 0;

const resultText = document.getElementById('result');
const userScoreEl = document.getElementById('userScore');
const computerScoreEl = document.getElementById('computerScore');

const choices = ['rock', 'paper', 'scissors'];

function play(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let result = "";

  if (userChoice === computerChoice) {
    result = "🤝 It's a tie!";
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore++;
    result = `✅ You win! ${userChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    result = `❌ You lose! ${computerChoice} beats ${userChoice}`;
  }

  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
  resultText.textContent = result;

  new Audio('win.mp3').play();
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  userScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  resultText.textContent = "Make your move!";
}
