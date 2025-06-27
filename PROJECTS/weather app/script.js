const apiKey = ""; // <-- Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      document.getElementById("weatherInfo").classList.remove("hidden");
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("temp").textContent = data.main.temp;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("error").textContent = "";
    })
    .catch(err => {
      document.getElementById("weatherInfo").classList.add("hidden");
      document.getElementById("error").textContent = "❌ City not found!";
    });
}
