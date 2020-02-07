//takes goecoded data and runs it though AJAX for weather
//whole page should be wrapped in a function

let tempArray = [];
let conditionArray = [];
let windArray =[];
let fractionC = null;
let clearPercent = null;
let fractionR = null;
let rainPercent = null;
let fractionS = null;
let snowPercent = null;
let coldtemp = null;
let hottemp = null;
let tempAverage = null;


let latitude = "43.072";
let longitude = "-70.763";
let cityName = responseFutureSample.city.name;

function processWeatherData() {
    checkConditions();
    checkTemps();
    checkWind();
    weatherReport();
    weatherPlanner();
}
processWeatherData();

function weatherReport() {
    console.log("Your Weather Packing Planner!")
    console.log("In the next 5 days:")
    console.log(`The temps will be between ${coldtemp} and ${hottemp}, with an average of ${tempAverage}.`)
    if (tempAverage < 40) {
        console.log("It is going to be cold! Make sure you bring a layers plus a hat and gloves.")
    };
    if (tempAverage > 70) {
        console.log("Awesome! Beach weather!");
    };
    if (clearPercent > 0) {
        console.log(`It will be clear ${clearPercent} percent of the time,`);
        if (tempAverage < 40) {
            console.log("but cold, so only bring sunscreen if you are going skiing.");
        };
        if (tempAverage > 60) {
            console.log("don't forget to bring sunscreen!.");
        };
    };
    if (rainPercent > 0) {
        console.log(`It will rain ${rainPercent} percent of the time, so bring a raincoat or umbrella.`);
    };
    if (rainPercent = 0) {
        console.log(`yay! It is not going to rain!`);
    };
    if (snowPercent > 0) {
        console.log(`It will snow ${snowPercent} percent of the time, so bring your winter gear!`);
    };
    if (snowPercent = 0) {
        console.log(`yay! It is not going to snow!`);
    };

};

function weatherPlanner() {
    $(".weather").empty();
    $plannerDiv = $("<div>");
    $header = $("<h4>");
    $header.text("Your Short Break Weather Packing Planner!")
    $plannerDiv.append($header);
    $subheader = $("<h5>");
    $subheader.text("Plan your packing based on the weather! ")
    

    //temperature discussion

    //putting the panner on the page
    $(".weather").append($plannerDiv);
}


function checkConditions() {
    //building the weather condition array
    for (a = 1; a < 40; a++) {
        let currentType = responseFutureSample.list[a].weather[0].main;
        conditionArray.push(currentType);
    };
    //check for rain or snow or clear precentages
    for (a = 0; a < conditionArray.length; a++) {
        if (conditionArray[a] == "Rain") {
            fractionR++;
            rainPercent = parseInt((fractionR / 39) * 100);
        };
        if (conditionArray[a] == "Snow") {
            fractionS++;
            snowPercent = parseInt((fractionS / 39) * 100);
        };
        if (conditionArray[a] == "Clear") {
            fractionC++;
            clearPercent = parseInt((fractionC / 39) * 100);
        };
    };
};

function checkWind() {
    //building the wind speed array
    for (a = 1; a < 40; a++) {
        let currentWind = responseFutureSample.list[a].wind.speed;
        windArray.push(currentWind);
    };
    console.log(windArray);
    //check for rain or snow or clear precentages
    for (a = 0; a < conditionArray.length; a++) {
        if (conditionArray[a] == "Rain") {

        };

    };
};




function checkTemps() {
    for (i = 0; i < 40; i++) {
        //run through all the temps over the next 5 days and convert them to F and put in temp array
        let futureTemp = responseFutureSample.list[i].main.temp;
        futureTemp = (futureTemp - 273.15)*(9/5) +32;
        futureTemp = parseInt(futureTemp);
        tempArray.push(futureTemp);
    };
    //finding the coldest and hottest  and average temps from the next 5 days
    coldtemp = 120; //starting it high
    hottemp = -40; //starting it low
    let totaltemp = 0;
    for (j = 0; j < tempArray.length; j++) {
        if (tempArray[j] < coldtemp) {
            coldtemp = tempArray[j];
        };
        if (tempArray[j] > hottemp) {
            hottemp = tempArray[j];
        };
        totaltemp = totaltemp + tempArray[j];
    };
    tempAverage = parseInt(totaltemp / (j + 1));

};

//get the current weather forecast information
function todayWeather() {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (responseNow) {
            console.log(responseNow);
            currentTempK = responseNow.main.temp;
            currentTempF = (currentTempK - 273.15) * (9 / 5) + 32;
            currentTemp = parseInt(currentTempF)
            console.log(currentTemp);

        });
};
``

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