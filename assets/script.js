cityArray = JSON.parse(localStorage.getItem("City History"))

var theCityName = document.getElementById("display-city-name")
var city = document.getElementById("display-city")
var currentTemp = document.getElementById("current-temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var uvIndex = document.getElementById("uv-index")
var subBtn = document.getElementById("sub-btn")
var cityInput = document.getElementById("city-finder")
var weatherBlocks = document.getElementById("weather-blocks")


getWeather = function(C) {
    console.log(C)
    let getThatWeater = "https://api.openweathermap.org/data/2.5/weather?q=" + C + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27";
    
    fetch(getThatWeater).then(function(response){
        
        console.log(getThatWeater);
        console.log(response);
        
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                let cityMainName = data.name
                let tempNow = data.main.temp
                let windSpeed = data.wind.speed
                let humidtyNow = data.main.humidity
                let lat = data.coord.lat
                let lon = data.coord.lon
                
                console.log(cityMainName)
                console.log(tempNow)
                console.log(humidtyNow)
                console.log(humidtyNow)
                console.log(lat)
                console.log(lon)
                
                theCityName.textContent = cityMainName
                city.textContent = "Current emperature is: " + tempNow;
                wind.textContent= "Current windspeed is: " + windSpeed
                humidity.textContent = "Current humitiy is: " + humidtyNow + "%"
                
                let getMoreWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27"

                fetch(getMoreWeather).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(citydata) {
                            let weatherDays = citydata.daily
                            console.log(citydata);
                            console.log(weatherDays);
                            
                            for(i = 0; i < 5; i++){
                                let timeStamp = citydata.daily[i].dt
                                let theDate = new Date(timeStamp * 1000)
                                let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                                let theMonth = months[theDate.getMonth()];
                                let theDay = theDate.getDate()
                                let theYear = theDate.getFullYear()
                                let fullDate = theMonth + "/" + theDay + "/" +  theYear

                                let forcastTemp= citydata.daily[i].temp.day
                                let forcastWindSpeed = citydata.daily[i].wind_speed
                                let forcastHumidity = citydata.daily[i].humidity


                                console.log(fullDate);

                                var divEl = document.createElement("div")
                                var h4El = document.createElement("h4")
                                var p1El = document.createElement("p")
                                var p2El = document.createElement("p")
                                var p3El = document.createElement("p")
                                var p4El = document.createElement("p")

                                weatherBlocks.appendChild(divEl)
                                divEl.appendChild(h4El)
                                divEl.appendChild(p1El)
                                divEl.appendChild(p2El)
                                divEl.appendChild(p3El)
                                divEl.appendChild(p4El)

                                divEl.setAttribute("style", "border: 3px solid black; width: auto;")
                                h4El.textContent = fullDate
                                p2El.textContent = "Temperature: " + forcastTemp
                                p3El.textContent = forcastWindSpeed + " MPH "
                                p4El.textContent = " Humidity: " + forcastHumidity


                            }
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
