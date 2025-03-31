import "./style.css";

let weatherData = [];
let forecast = [];
const forecastWeatherDiv = document.querySelector(".forecast");
const locationClick = document.getElementById("locationClick");

locationClick.addEventListener("click", locationSearch);

function locationSearch() {
  const locationSearched = document.getElementById("locationSearch").value;

  if (locationSearched.trim() === "") {
    alert("Please enter a location!");
    return;
  }

  const locationSearch = document.querySelector(".location");
  locationSearch.textContent = `Searching weather for ${locationSearched}`;

  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationSearched}?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Cprecip%2Cprecipprob%2Cwindspeed%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Ccurrent%2Chours&key=TM83W5Y74VRXPFP7SHC35GFZM&contentType=json`
  )
    .then((response) => response.json())
    .then((data) => {
      weatherData = data.currentConditions;
      forecast = data.days;
      console.log(weatherData);
      console.log(forecast);

      locationSearch.textContent = `Weather for ${locationSearched}`;

      createCurrentWeatherDisplay();
      forecastWeatherDiv.innerHTML = "";
      createForecastDay(1);
      createForecastDay(2);
      createForecastDay(3);
      createForecastDay(4);
      createForecastDay(5);
    })
    .catch((error) => console.error("Error:", error));
  locationSearch.textContent = "Invalid location, try again.";
  document.querySelector(".currentWeather").innerHTML = "";
}

function createForecastDay(index) {
  const forecastWeatherDiv = document.querySelector(".forecast");

  const forecastDay = document.createElement("div");
  forecastDay.classList.add("forecastDay"); 

  const dayDate = document.createElement("div");

  const dateDisplay = forecast[index].datetime;

  const date = new Date(dateDisplay);

  const options = { day: '2-digit', month: 'long' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  
  dayDate.innerText = formattedDate;
  forecastDay.appendChild(dayDate);

  const dayTemp = document.createElement("div");
  dayTemp.innerText = `It will be ${forecast[index].temp} degrees.`;
  forecastDay.appendChild(dayTemp);

  const dayRain = document.createElement("div");
  dayRain.innerText = `There is a ${forecast[index].precipprob}% chance of rain.`;
  forecastDay.appendChild(dayRain);

  const dayCondition = document.createElement("div");
  dayCondition.innerText = `Overal the weather will be ${forecast[index].conditions}.`;
  forecastDay.appendChild(dayCondition);

  forecastWeatherDiv.appendChild(forecastDay);
}

createForecastDay();

function createCurrentWeatherDisplay() {
  const currentWeatherDiv = document.querySelector(".currentWeather");
  currentWeatherDiv.innerHTML = "";

  const currentTempDiv = document.createElement("div");
  currentTempDiv.id = "current";
  currentTempDiv.textContent = `It is ${weatherData.temp} degrees celcius and the weather is ${weatherData.conditions} today.`;

  const currentRainDiv = document.createElement("div");
  currentRainDiv.id = "rain";
  currentRainDiv.textContent = `There is a ${weatherData.precipprob}% chance that it will rain today.`;

  const currentRiseDiv = document.createElement("div");
  currentRiseDiv.id = "sunUp";
  currentRiseDiv.textContent = `Sun up: ${weatherData.sunrise}.`;

  const currentSetDiv = document.createElement("div");
  currentSetDiv.id = "sunSet";
  currentSetDiv.textContent = `Sun set: ${weatherData.sunset}.`;

  currentWeatherDiv.appendChild(currentTempDiv);
  currentWeatherDiv.appendChild(currentRainDiv);
  currentWeatherDiv.appendChild(currentRiseDiv);
  currentWeatherDiv.appendChild(currentSetDiv);
}
