const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add Task
function addTask(taskText = taskInput.value) {
  if (!taskText.trim()) return;

  const li = document.createElement("li");
  li.textContent = taskText;
  li.onclick = () => li.classList.toggle("completed");
  
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };
  
  li.appendChild(delBtn);
  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

// Voice Input
function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();
  
  recognition.onresult = (event) => {
    const speech = event.results[0][0].transcript;
    addTask(speech);
  };
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Local Storage
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}
function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
}
loadTasks();
