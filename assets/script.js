cityArray = JSON.parse(localStorage.getItem("City History"))

var theCityName = document.getElementById("display-city-name")
var city = document.getElementById("display-city")
var currentTemp = document.getElementById("current-temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var uvIndex = document.getElementById("uv-index")
var subBtn = document.getElementById("sub-btn")
var cityInput = document.getElementById("city-finder")
var theSearchHistory = document.getElementById("display-history")
var weatherBlocks = document.getElementById("weather-blocks")
var todaysIconHTML = document.getElementById("todays-icon")


getWeather = function(intialCityName) {
    // console.log(C)
    let getThatWeater = "https://api.openweathermap.org/data/2.5/weather?q=" + intialCityName + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27";
    
    fetch(getThatWeater).then(function(response){
        
        console.log(getThatWeater);
        // console.log(response);
        
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                let cityMainName = data.name
                let tempNow = data.main.temp
                let windSpeed = data.wind.speed
                let humidityNow = data.main.humidity
                let lat = data.coord.lat
                let lon = data.coord.lon
                
                theCityName.textContent = cityMainName
                city.textContent = "Current Temperature: " + tempNow;
                wind.textContent= "Windspeed: " + windSpeed + " MPH "
                humidity.textContent = "Current humidity is: " + humidityNow + "%"
                
                let getMoreWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d310cdc3e7de424fc0047cf1fd72fd27"

                fetch(getMoreWeather).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(citydata) {
                            let weatherDays = citydata.daily
                            let index = citydata.daily[0].uvi
                            let weatherIcon = citydata.daily[0].weather[0].icon
                            let todaysIcon = "http://openweathermap.org/img/wn/"+weatherIcon+".png";
                            $("#todays-icon").attr("src", todaysIcon);
                            console.log(citydata)

                            uvIndex.textContent = "UV Index: " + index;

                            if(index < 3){
                                $(uvIndex).addClass("bg-success")
                            }
                            if(index > 3 && index < 7){
                                $(uvIndex).addClass("bg-warning")
                            }
                            if(uvIndex > 7) {
                                $(uvIndex).addClass("bg-danger")
                            }
                            
                            //clears out weather blocks. so we cant span a ton of weather blocks and break the page 
                            weatherBlocks.textContent = ""

                            //creates the weather blocks for 5 day forcast
                            for(i = 0; i < 5; i++){

                                    let forcastIcon = citydata.daily[i].weather[0].icon
                                    let iconUrl = "http://openweathermap.org/img/wn/"+forcastIcon+".png";
                                
                                    let timeStamp = citydata.daily[i].dt
                                    let theDate = new Date(timeStamp * 1000)
                                    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                                    let theMonth = months[theDate.getMonth()];
                                    let theDay = theDate.getDate()
                                    let theYear = theDate.getFullYear()
                                    let fullDate = theMonth +" "+ theDay + "," +  theYear
                                    
                                    let forcastTemp= citydata.daily[i].temp.day
                                    let forcastWindSpeed = citydata.daily[i].wind_speed
                                    let forcastHumidity = citydata.daily[i].humidity
                                    
                                    console.log(forcastIcon)
                                    console.log(iconUrl);
                                    
                                    var divEl = document.createElement("div")
                                    var h4El = document.createElement("h4")
                                    var imgEl = document.createElement("img")
                                    var p2El = document.createElement("p")
                                    var p3El = document.createElement("p")
                                    var p4El = document.createElement("p")

                                    weatherBlocks.appendChild(divEl)
                                    divEl.appendChild(h4El)
                                    divEl.appendChild(imgEl)
                                    divEl.appendChild(p2El)
                                    divEl.appendChild(p3El)
                                    divEl.appendChild(p4El)

                                    divEl.setAttribute("style", "border: 3px solid white; margin: 2px;")
                                    $(divEl).addClass("col-12 col-sm-2 justify-contect-around")
                                    h4El.setAttribute("style", "border-bottom: 3px solid black")
                                    // $(p2El).addClass("w-auto")

                                    $(imgEl).addClass("icon border rounded-circle text-center")
                                    $(".icon").attr("src", iconUrl);

                                    h4El.textContent = fullDate
                                    // imgEl.textContent = iconUrl
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

displayHistory =function() {
    searchHistoy = JSON.parse(localStorage.getItem("City History"))

    if(searchHistoy == null) {
        searchHistoy = []
        getWeather("San Antonio")
    }
    else {

    
    
        //this will display the last searched city on page load.
        var lastSearchedItem = searchHistoy.slice(-1)

        for(let i = 0; i < 1; i++) {
            let displayLastCity = lastSearchedItem[i].Name
            console.log(displayLastCity)
            getWeather(displayLastCity)
        }
        
        //this will display the localstroage in reverse order
        for(let i=searchHistoy.length -1; i >= 0; i--) {
            let startingPoint =(searchHistoy.length - 1)
            let endPoint = (startingPoint - 10)
            console.log(startingPoint)
            console.log(i)

            //this allows for only 10 recently searched cities to be displayed
            if(i == endPoint) {
                break
            }
            else{

                let thisCity = searchHistoy[i].Name
                var historyDiv = document.createElement("button")
                
                theSearchHistory.appendChild(historyDiv)
                $(historyDiv).addClass("clear-div")
                historyDiv.setAttribute("style", "background-color: grey; color: white; margin: 1%; padding: 1%; height: 38px; border: 3px black solid")
                historyDiv.innerHTML = thisCity;
            }   
        }
    }

    // this will allow you to click on the list displayed of searched cities and search them again.
    clickHIstoryDiv = document.querySelector(".clear-div")
    $(".clear-div").on("click", function() {
        historyCity = ($(this).text())
        // getWeather(historyCity)

        cityInfo = {
            Name: historyCity,
        }
        
        if(cityArray == null) {
            cityArray = []
            cityArray.push(cityInfo)
            localStorage.setItem("City History", JSON.stringify(cityArray))
        }else{
            cityArray.push(cityInfo)
            localStorage.setItem("City History", JSON.stringify(cityArray))
        }
        document.location.reload()
    })
    

}

subBtn.addEventListener("click", function(event) {
    event.preventDefault()
    var cityName = cityInput.value;
    // console.log(cityName)
    
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
    document.location.reload()
    
    for(i=0;i<10;i++){
        historyDiv.textContent = " "
        displayHistory();
    }
   
})

displayHistory()