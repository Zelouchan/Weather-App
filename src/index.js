import "./style.css";

let weatherData = [];
let forecast = [];

function createCurrentWeatherDisplay() {
    const currentLocationDiv = document.querySelector(".location");
  const currentWeatherDiv = document.querySelector(".currentWeather");


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

fetch(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Hertford?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Cprecip%2Cprecipprob%2Cwindspeed%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Ccurrent%2Chours&key=TM83W5Y74VRXPFP7SHC35GFZM&contentType=json"
)
  .then((response) => response.json())
  .then((data) => {
    weatherData = data.currentConditions;
    forecast = data.days;
    console.log(weatherData);
    console.table(forecast);
    createCurrentWeatherDisplay();
  })
  .catch((error) => console.error("Error:", error));
