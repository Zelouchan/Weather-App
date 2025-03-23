import './style.css';

let weatherData = [];
let forecast = [];

function createCurrentWeatherDisplay() {
    // const locationNameDiv = document.querySelector(".location");
    const currentWeatherDiv = document.querySelector(".currentWeather");

    // locationNameDiv.textContent = 
    currentWeatherDiv.textContent = `The weather is ${weatherData.conditions}`;
    currentWeatherDiv.textContent = `The temperature is ${weatherData.temp}`;
}


fetch(
	'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Hertford?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Cprecip%2Cprecipprob%2Cwindspeed%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Ccurrent%2Chours&key=TM83W5Y74VRXPFP7SHC35GFZM&contentType=json'
)
	.then((response) => response.json()) 
	.then((data) => {
		weatherData = data.currentConditions;
        forecast = data.days; 
        console.log(weatherData);
        console.table(forecast);
        createCurrentWeatherDisplay();
	})
	.catch((error) => console.error('Error:', error)); 
