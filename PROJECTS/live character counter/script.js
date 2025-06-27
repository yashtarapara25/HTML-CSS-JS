const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const warning = document.getElementById('warning');
const maxChars = 280;

textInput.addEventListener('input', () => {
  const text = textInput.value;

  // Character count
  charCount.textContent = text.length;

  // Word count
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  wordCount.textContent = words.length;

  // Max character warning
  if (text.length >= maxChars) {
    warning.textContent = "🚨 You've reached the maximum character limit!";
    textInput.style.borderColor = 'red';
  } else {
    warning.textContent = "";
    textInput.style.borderColor = '#ccc';
  }
});
