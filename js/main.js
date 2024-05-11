// Start Counter App
let counter = document.getElementById("count");
let increase = document.getElementById("increase");
let decrease = document.getElementById("decrease");
let reset = document.getElementById("reset");
let count = 0;
increase.addEventListener("click", () => {
  count++;
  counter.innerHTML = count;
});
decrease.addEventListener("click", () => {
  count--;
  counter.innerHTML = count;
});
reset.addEventListener("click", () => {
  count = 0;
  counter.innerHTML = count;
});
// End Counter App
// Start Gussing App
let guessResult = document.getElementById("guess-result");
let guessInput = document.getElementById("guess-input");
let guessSubmit = document.getElementById("guess-submit");
const answer = Math.floor(Math.random() * (100 - 0 + 1));

let attempts = 0;

console.log(answer);

guessSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let guess = parseInt(guessInput.value); // Convert the input value to an integer

  if (!isNaN(guess)) {
    // Check if the input is a valid number
    attempts++;
    if (guess > 0 && guess < 100) {
      if (guess < answer) {
        guessResult.innerHTML = "Too Low Try Again.";
      } else if (guess > answer) {
        guessResult.innerHTML = "Too High Try Again.";
      } else {
        guessResult.innerHTML = `Congratulations! The Answer Was ${answer}`;
        guessInput.value = ""; // Clear the input field
        guessResult.style.color = "green";
      }
    } else {
      guessResult.innerHTML = "Please enter Number Bettween 0 - 100";
    }
  } else {
    guessResult.innerHTML = "Please enter a valid number.";
  }
});

// End Gussing App
// Start Of Temprature Convirsion App
let tempInput = document.getElementById("temperature");
let toFahrenheit = document.getElementById("toFahrenheit");
let toCelsius = document.getElementById("toCelsius");
let tempResult = document.getElementById("tmpResult");

let temp;
function convert() {
  if (toFahrenheit.checked) {
    temp = Number(tempInput.value);
    temp = (temp * 9) / 5 + 32;
    tempResult.innerHTML = "👉🏽 " + temp.toFixed(1) + "°F";
  } else if (toCelsius.checked) {
    temp = Number(tempInput.value);
    temp = (temp - 32) * (5 / 9);
    tempResult.innerHTML = "👉🏽 " + temp.toFixed(1) + "°C";
  } else {
    tempResult.innerHTML = "Select A Unit";
  }
}

// End Of Temprature Convirsion App
// Start Of Clock App
function updateClock() {
  // Get the current time
  const now = new Date();
  // Extract hours, minutes, and seconds
  const hours = now.getHours().toString().padStart(2, 0);
  const minutes = now.getMinutes().toString().padStart(2, 0);
  const seconds = now.getSeconds().toString().padStart(2, 0);
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("digital-clock").textContent = timeString;
}
updateClock();
setInterval(updateClock, 1000);
// End Of Clock App
// Start Of Stop Watch App
const display = document.getElementById("display");
let timer = null;
let startTimeValue = 0;
let elapsedTime = 0;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    startTimeValue = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    isRunning = true;
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTimeValue;
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  startTimeValue = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:00";
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTimeValue;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  milliseconds = String(milliseconds).padStart(2, "0");

  display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// End Of Stop Watch App
// Start Of Calculator App
const calcDisplay = document.getElementById("calc-display");
let result;
function appendToDisplay(input) {
  calcDisplay.value += input;
}

function calculate() {
  try {
    calcDisplay.value = eval(calcDisplay.value);
  } catch (error) {
    calcDisplay.value = "Error";
  }
}

function clearDisplay() {
  calcDisplay.value = "";
}
// End Of Calculator App
// Start Of RockPaperScissors App
const choice = ["rock", "paper", "scissors"];

const playDisplay = document.getElementById("playDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");

function playGame(playChoice) {
  const computerChoice = choice[Math.floor(Math.random() * 3)];
  let result = "";
  if (computerChoice === playChoice) {
    result = "IT'S A TIE!";
  } else {
    switch (playChoice) {
      case "rock":
        result = computerChoice === "scissors" ? "YOU WIN" : "YOU LOSE!";
        break;
      case "paper":
        result = computerChoice === "rock" ? "YOU WIN" : "YOU LOSE!";
        break;
      case "scissors":
        result = computerChoice === "paper" ? "YOU WIN" : "YOU LOSE!";
        break;
    }
  }
  playDisplay.textContent = `PLAYER : ${playChoice}`;
  computerDisplay.textContent = `Computer : ${computerChoice}`;
  if (result === "YOU LOSE!") {
    resultDisplay.textContent = result;
    resultDisplay.style.color = "red";
  } else {
    resultDisplay.textContent = result;
    resultDisplay.style.color = "#198754";
  }
}
// End Of RockPaperScissors App
// Start Weather App

const weatherApp = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ed09755d56d34ef62d643e4cb4668509";

weatherApp.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error);
    }
  } else {
    displayError("Please Enter City");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Cloud Not Fetch Weather Data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);
  //
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌬️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "🌨️";
    default:
      return "❓";
  }
}
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
// End Weather App
