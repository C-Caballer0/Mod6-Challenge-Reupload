var cityInput = $("#citySearch");
var searchButton = $("#citySearchButton");
var currentTemp = $("#currentTemp");
var currentHumidity = $("#currentHumidityValue");
var currentWind = $("#currentWindValue");
var currentUV = $("#currentUVValue");
var currentCity = $("#currentCityValue");




function showWeather() {

    console.log("Request Received")

    var cityValue = cityInput.val();

    console.log("Forecast of: " + cityValue);

    currentCity.html = cityValue;

    fetchWeatherForecast(cityValue);

}

searchButton.on("click",showWeather);

function fetchWeatherForecast(currentCity) {

    console.log("Fetching Weather for " + currentCity);

    

    var cityLat = 0;
    var cityLon = 0;
    

    var APIKey = "72ba79407c82fcaf98978e68160d5733";
    var coordRequestPath = "http://api.openweathermap.org/geo/1.0/direct?q=" + currentCity + "&limit=1&appid=" + APIKey;
    var forecastRequestPath = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey + "&units=metric";
    
    console.log(coordRequestPath);

    fetch(coordRequestPath)
    .then(function(response){
        
        cityLat = response[0].lat;
        cityLon = response[0].lon;
        console.log("Latitude: " + cityLat + " Longitude: " + cityLon);

    });

    console.log(forecastRequestPath);

    fetch(forecastRequestPath)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log("Current Temp: " + data.list[0].main.temp + " C");
        console.log("Current Humidity: " + data.list[0].main.humidity + "%");
        console.log("Current Windspeed: " + data.list[0].wind.speed + "kph");

        currentTemp.textContent = data.list[0].main.temp;
        currentHumidity.textContent = data.list[0].main.humidity;
        currentWind.textContent = data.list[0].wind.speed;
    
        for (i=1; i<5; i++){
            $("#" + i + "FromNowTemp").html = (data.list[i].main.temp + " C");
            $("#" + i + "FromNowHumidity").html = (data.list[i].main.humidity + "%");
        }
});

}

