const paletteDiv = document.getElementById("palette");
const savedDiv = document.getElementById("saved");

// Generate random hex color
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Generate new palette
function generatePalette() {
  paletteDiv.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;

    const code = document.createElement("div");
    code.className = "color-code";
    code.innerText = color;

    colorBox.appendChild(code);
    colorBox.onclick = () => {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    };

    paletteDiv.appendChild(colorBox);
  }
}

// Save current palette
function savePalette() {
  const colors = Array.from(document.querySelectorAll(".color-code")).map(el => el.innerText);
  let saved = JSON.parse(localStorage.getItem("palettes")) || [];
  saved.push(colors);
  localStorage.setItem("palettes", JSON.stringify(saved));
  displaySavedPalettes();
}

// Load saved palettes
function displaySavedPalettes() {
  savedDiv.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem("palettes")) || [];
  saved.forEach(palette => {
    const row = document.createElement("div");
    row.className = "palette";
    palette.forEach(color => {
      const colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.style.backgroundColor = color;

      const code = document.createElement("div");
      code.className = "color-code";
      code.innerText = color;

      colorBox.appendChild(code);
      row.appendChild(colorBox);
    });
    savedDiv.appendChild(row);
  });
}

// Toggle dark/light mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Initial load
generatePalette();
displaySavedPalettes();
