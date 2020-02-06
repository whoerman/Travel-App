//takes goecoded data and runs it though AJAX for weather
//whole page should be wrapped in a function

let latitude = "43.072";

let longitude = "-70.763";




function todayWeather() {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (responseNow) {
            console.log(responseNow);
            currentTempK = responseNow.main.temp;
            currentTempF = (currentTempK-273.15)*(9/5)+32;
            currentTemp = parseInt(currentTempF)
            console.log(currentTemp);

        });
};



function futureWeather() {
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (responseFuture) {
            console.log(responseFuture);

        });
};


$(".search").on("click", function () {
    todayWeather();
    futureWeather();
});
