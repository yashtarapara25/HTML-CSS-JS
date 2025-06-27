const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const modal = document.getElementById("eventModal");
const modalDate = document.getElementById("modalDate");
const eventText = document.getElementById("eventText");

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
  calendar.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("div");
    const dateKey = `${year}-${month}-${d}`;
    day.textContent = d;

    if (isToday(year, month, d)) {
      day.classList.add("today");
    }

    const savedEvent = localStorage.getItem(dateKey);
    if (savedEvent) {
      const eventTag = document.createElement("div");
      eventTag.className = "event";
      eventTag.textContent = savedEvent;
      day.appendChild(eventTag);
    }

    day.onclick = () => openModal(dateKey, d);
    calendar.appendChild(day);
  }
}

function isToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function openModal(dateKey, day) {
  selectedDate = dateKey;
  modalDate.textContent = `Event on ${selectedDate}`;
  eventText.value = localStorage.getItem(dateKey) || "";
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function saveEvent() {
  if (eventText.value.trim() === "") return;
  localStorage.setItem(selectedDate, eventText.value.trim());
  closeModal();
  renderCalendar();
}

function deleteEvent() {
  localStorage.removeItem(selectedDate);
  closeModal();
  renderCalendar();
}

// Initial call
renderCalendar();
