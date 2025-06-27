const focusInput = document.getElementById('focusTime');
const breakInput = document.getElementById('breakTime');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('timeDisplay');
const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');

let focusTime = parseInt(focusInput.value) * 60; // in seconds
let breakTime = parseInt(breakInput.value) * 60; // in seconds
let timeLeft = focusTime;
let timerRunning = false;
let timerType = 'focus'; // 'focus' or 'break'

let timerInterval;
let circleProgress = 0;
const circleRadius = canvas.width / 2 - 10;
const circleCenter = canvas.width / 2;

// Sound alert for when the timer finishes
const alertSound = new Audio('https://www.soundjay.com/button/beep-07.wav');

// Update circle progress based on time
function updateCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.beginPath();
  ctx.arc(circleCenter, circleCenter, circleRadius, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.strokeStyle = timerType === 'focus' ? '#4CAF50' : '#FF6347'; // green for focus, red for break
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(circleCenter, circleCenter, circleRadius, 1.5 * Math.PI, (1.5 + circleProgress) * Math.PI);
  ctx.strokeStyle = '#2196F3'; // Blue progress
  ctx.lineWidth = 10;
  ctx.stroke();
}

// Update the time display (format: mm:ss)
function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start/Stop the timer
startStopBtn.addEventListener('click', () => {
  if (timerRunning) {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
  } else {
    startStopBtn.textContent = 'Pause';
    timerInterval = setInterval(updateTimer, 1000);
  }
  timerRunning = !timerRunning;
});

// Reset the timer
resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  startStopBtn.textContent = 'Start';
  timeLeft = timerType === 'focus' ? focusTime : breakTime;
  updateTimeDisplay();
  circleProgress = 0;
  updateCircle();
});

// Update the timer every second
function updateTimer() {
  timeLeft--;
  circleProgress = (1 - timeLeft / (timerType === 'focus' ? focusTime : breakTime));
  updateTimeDisplay();
  updateCircle();

  if (timeLeft <= 0) {
    alertSound.play();
    if (timerType === 'focus') {
      timerType = 'break';
      timeLeft = breakTime;
    } else {
      timerType = 'focus';
      timeLeft = focusTime;
    }
    clearInterval(timerInterval);
    timerRunning = false;
    startStopBtn.textContent = 'Start';
  }
}

// Listen for input changes to adjust focus/break times
focusInput.addEventListener('input', () => {
  focusTime = parseInt(focusInput.value) * 60;
  if (timerType === 'focus') timeLeft = focusTime;
  updateTimeDisplay();
});

breakInput.addEventListener('input', () => {
  breakTime = parseInt(breakInput.value) * 60;
  if (timerType === 'break') timeLeft = breakTime;
  updateTimeDisplay();
});

// Initialize timer
updateTimeDisplay();
updateCircle();
