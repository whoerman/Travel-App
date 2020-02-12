//takes goecoded data and runs it though AJAX for weather
//whole page should be wrapped in a function

let tempArray = [];
let conditionArray = [];
let windArray = [];
let fractionC = null;
let clearPercent = null;
let fractionR = null;
let rainPercent = null;
let fractionS = null;
let snowPercent = null;
let coldtemp = null;
let hottemp = null;
let tempAverage = null;
let windMax = null;
let maxWindSpeed = 0;


let latitude = "43.072";
let longitude = "-70.763";
let cityName = responseFutureSample.city.name;

function processWeatherData() {
    checkConditions();
    checkTemps();
    checkWind();
    weatherPlanner();
}
processWeatherData();

function weatherPlanner() {
    $(".weather").empty();
    $weatherSummary = $(".weatherSummary")
    $plannerDiv = $("<div>");
    $header = $(".locationTitle");
    $header.text("Your Five Day Weather Packing Guide!")
    // $plannerDiv.append($header);
    $headericon = $("<i>")
    $headericon.addClass("fas fa-suitcase-rolling");
    $header.prepend($headericon);
    // $subheader = $("<h5>");
    // $(".pageDescript").text(`Plan your packing based on the weather! For the next 5 days in ${cityName}, here are the weather details:`);
    // // $plannerDiv.append($subheader);
    $headericon = $("<i>")
    $headericon.addClass("fas fa-suitcase");
    $header.append($headericon);
    //temperature discussion
    $tempText = $("<h5>");
    $tempText.append(` The temps will be between ${coldtemp} and ${hottemp}, with an average of ${tempAverage}.`);
    if (tempAverage < 40) {
        $tempText.prepend(`It is going to be cold in ${cityName}! Make sure you bring a layers plus a hat and gloves. `);
    };
    if (tempAverage > 70) {
        $tempText.prepend(" Awesome! Beach weather!");
    };
    $tempicon = $("<i>")
    $tempicon.addClass("fas fa-temperature-low");
    $tempText.prepend($tempicon);
    $weatherSummary.append($tempText);

    //wind discussion
    $windText = $("<h5>");
    if (maxWindSpeed < 15) {
        $windText.text(`The wind should be fairly calm. `)
    };
    if (maxWindSpeed > 15) {
        $windText.text(`It will be occasionally windy. `)
    };
    $windText.append(`The maximum wind will be ${maxWindSpeed} mph.`);
    $windicon = $("<i>")
    $windicon.addClass("fas fa-wind");
    $windText.prepend($windicon);
    $weatherSummary.append($windText);

    //clear skies discussion
    $clearText = $("<h5>");
    $clearText.text(`Sun report: It will be clear ${clearPercent} percent of the time,`);
    let intClearPercent = parseInt(clearPercent);
    if (intClearPercent = 0) {
        $clearText.text(`Sadly, there will be no clear skies the entire time.`)
    };
    if (tempAverage < 40) {
        $clearText.append(` but cold, so only bring sunscreen if you are going skiing.`)
    };
    if (tempAverage > 40) {
        $clearText.append(` don't forget to bring sunscreen!.`)
    };

    $clearicon = $("<i>")
    $clearicon.addClass("fas fa-cloud-sun");
    $clearText.prepend($clearicon);
    $weatherSummary.append($clearText);

    //precipitation discussion
    $precipText = $("<h5>");
    $precipText.text(`Precipition: `);
    $precipText.append(`It will rain ${rainPercent}%  of the time you are in ${cityName}, so bring a raincoat or umbrella. `);
    $precipText.append(`It will snow ${snowPercent} percent of the time, so bring your winter gear! `);
    $rainicon = $("<i>")
    $rainicon.addClass("fas fa-cloud-showers-heavy");
    $precipText.prepend($rainicon);
    $weatherSummary.append($precipText);

    // $linebreak= ("<br>");
    // $plannerDiv.append($linebreak);
    // $hrline= ("<hr>");
    // $plannerDiv.append($hrline);

    //adding 5 day planner
    $weatherHourly = $(".weatherHourly")
    $box1 = $("<div>");
    $box1.addClass(`box col s12`);
    $weatherHourly.append($box1);
    $box2 = $("<div>");
    $box2.addClass(`box col s12`);
    $weatherHourly.append($box2);
    $box3 = $("<div>");
    $box3.addClass(`box col s12`);
    $weatherHourly.append($box3);
    $box4 = $("<div>");
    $box4.addClass(`box col s12`);
    $weatherHourly.append($box4);
    $box5 = $("<div>");
    $box5.addClass(`box col s12`);
    $weatherHourly.append($box5);
    $daysText = $("<h5>");
    $daysText.text(`Hourly Forecast:`);
    $dateicon = $("<i>")
    $dateicon.addClass("fas fa-calendar-day");
    $daysText.prepend($dateicon);
    $weatherHourly.append($daysText);
    let n = 0;
    for (i = 0; i < 39; i++) {
        $forecastText = $("<h5>");
        let currentWeather = responseFutureSample.list[i].weather[0].main;
        let gotTime = responseFutureSample.list[i].dt;
        var time = moment.unix(gotTime).format("ha MM/DD/YYYY");
        let futureTemp = responseFutureSample.list[i].main.temp;
        futureTemp = (futureTemp - 273.15) * (9 / 5) + 32;
        futureTempF = parseInt(futureTemp);
        $forecastText.text(` ${time}    ${currentWeather}   ${futureTempF}°`);
        $ellicon = $("<i>")
        $ellicon.addClass("fas fa-genderless");
        $forecastText.prepend($ellicon);
        let boxNum = 1;
        let currentDate = parseInt(moment.unix(responseFutureSample.list[i].dt).format("D"));
        let dateCheck = parseInt(moment.unix(responseFutureSample.list[1].dt).format("D"));
        if (currentDate === dateCheck) {
            $box1.append($forecastText);
        } else if (currentDate === (dateCheck + 1)) {
            $box2.append($forecastText)
        } else if (currentDate === (dateCheck + 2)) {
            $box3.append($forecastText)
        } else if (currentDate === (dateCheck + 3)) {
            $box4.append($forecastText)
        } else if (currentDate === (dateCheck + 4)) {
            $box5.append($forecastText)
        } 
    };

    //putting the panner on the page
    // $(".weather").append($plannerDiv);
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
    //check for rain or snow or clear precentages
    for (a = 0; a < windArray.length; a++) {
        if (windArray[a] > maxWindSpeed) {
            maxWindSpeed = windArray[a];
        };
    };
    maxWindSpeed = parseInt(maxWindSpeed);
};



function checkTemps() {
    for (i = 0; i < 40; i++) {
        //run through all the temps over the next 5 days and convert them to F and put in temp array
        let futureTemp = responseFutureSample.list[i].main.temp;
        futureTemp = (futureTemp - 273.15) * (9 / 5) + 32;
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

