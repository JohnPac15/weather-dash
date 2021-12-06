cityArray = JSON.parse(localStorage.getItem("City History"))
var city = document.getElementById("display-city")
var currentTemp = document.getElementById("current-temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var uvIndex = document.getElementById("uv-index")

var subBtn = document.getElementById("sub-btn")
var cityInput = document.getElementById("city-finder")


getWeather = function(C) {
    console.log(C)
    let getThatWeater = "https://api.openweathermap.org/data/2.5/weather?q=" + C + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27";
    
    fetch(getThatWeater).then(function(response){
        
        console.log(getThatWeater);
        console.log(response);
        
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                let tempNow = data.main.temp
                let windSpeed = data.wind.speed
                let humidtyNow = data.main.humidity
                let lat = data.coord.lat
                let lon = data.coord.lon
                
                console.log(tempNow)
                console.log(humidtyNow)
                console.log(humidtyNow)
                console.log(lat)
                console.log(lon)
                
                city.textContent = "Currently in " + data.name + " the temperature is: " + tempNow;
                wind.textContent= "Current windspeed is: " + windSpeed
                humidity.textContent = "Current humitiy is: " + humidtyNow + "%"
                
                let getMoreWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d310cdc3e7de424fc0047cf1fd72fd27"

                fetch(getMoreWeather).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(citydata) {
                            console.log(citydata);
                        })
                    }
                })


            })
        }
    })
    
}

subBtn.addEventListener("click", function(event) {
    event.preventDefault()
    var cityName = cityInput.value;
    console.log(cityName)
    
    cityInfo = {
        Name: cityName,
    }
    
    if(cityArray == null) {
        cityArray = []
        cityArray.push(cityInfo)
        localStorage.setItem("City History", JSON.stringify(cityArray))
    }else{
        cityArray.push(cityInfo)
        localStorage.setItem("City History", JSON.stringify(cityArray))
    }
    
    getWeather(cityName)



})
