const passwordDisplay = document.getElementById("passwordDisplay");
const lengthRange = document.getElementById("lengthRange");
const lengthValue = document.getElementById("lengthValue");
const includeUpper = document.getElementById("includeUpper");
const includeLower = document.getElementById("includeLower");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const strengthBar = document.getElementById("strengthBar");

lengthRange.addEventListener("input", () => {
  lengthValue.textContent = lengthRange.value;
});

function generatePassword() {
  const length = parseInt(lengthRange.value);
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]<>?/|~";

  let allChars = "";
  if (includeUpper.checked) allChars += upper;
  if (includeLower.checked) allChars += lower;
  if (includeNumbers.checked) allChars += numbers;
  if (includeSymbols.checked) allChars += symbols;

  if (allChars === "") {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randIndex];
  }

  passwordDisplay.value = password;
  updateStrength(password);
}

function copyPassword() {
  navigator.clipboard.writeText(passwordDisplay.value).then(() => {
    alert("Password copied to clipboard!");
  });
}

function updateStrength(password) {
  let strength = 0;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const colors = ["red", "orange", "yellow", "green"];
  const widths = ["25%", "50%", "75%", "100%"];

  strengthBar.style.width = widths[strength - 1] || "0%";
  strengthBar.style.background = colors[strength - 1] || "lightgray";
}
