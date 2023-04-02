var cityInput = $("#citySearch");
var searchButton = $("#citySearchButton");
var currentTemp = $("#currentTempValue");
var currentHumidity = $("#currentHumidityValue");
var currentWind = $("#currentWindValue");
var currentUV = $("#currentUVValue");




function showWeather() {

    console.log("Request Received")

    var cityValue = cityInput.val();

    console.log("Forecast of: " + cityValue);

    fetchForecast(cityValue);

}

searchButton.on("click",showWeather);

function fetchForecast(currentCity) {

    console.log("Fetching Weather")

    var cityLat = "";
    var cityLon = "";

    var APIKey = "72ba79407c82fcaf98978e68160d5733";
    var coordRequestPath = "http://api.openweathermap.org/geo/1.0/direct?q=" + currentCity + "&limit=1&appid=" + APIKey;
    var forecastRequestPath = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey + "&units=metric";

    fetch(coordRequestPath)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        cityLat = data.lat;
        cityLon = data.lon;
        console.log("Latitude: " + cityLat + " Longitude: " + cityLon);
    })
    .then(function() {
    fetch(forecastRequestPath)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        currentTemp.textContent = data.list.main.temp;
        currentHumidity.textContent = data.list.main.humidity;
        currentWind.textContent = data.list.wind.speed;
        //currentUV.textContent = data
    })
});
}