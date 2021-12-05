var city = document.getElementById("display-city")
var currentTemp = document.getElementById("current-temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var uvIndex = document.getElementById("uv-index")


getWeather = function() {
    let getThatWeater = "https://api.openweathermap.org/data/2.5/weather?id=1690295&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27";

    fetch(getThatWeater).then(function(response){
        
        console.log(getThatWeater);
        console.log(response);

        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                let tempNow = data.main.temp
                let windSpeed = data.wind.speed
                let humidtyNow = data.main.humidity

                console.log(humidtyNow)
                console.log(windSpeed)

                city.textContent = data.name + " / " + tempNow;
                wind.textContent = windSpeed
                humidity.textContent = humidtyNow
            })
        }
    })
    
}

getWeather();