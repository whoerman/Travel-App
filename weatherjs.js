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
let hour = null;


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
    //emptying the weather div and making the global div to put in there
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

    //adding a horizontal line
    $hrline = ("<hr>");
    $plannerDiv.append($hrline);

    //decision tree for temp, formating the temp and adding it to the planner
    $tempText = $("<h5>");
    $tempText.addClass("temp");
    $tempText.append(` The temps will be between ${coldtemp} and ${hottemp}, with an average of ${tempAverage}.`);
    if (tempAverage < 32) {
        $tempText.prepend(` The average temp will be below freezing in ${cityName}! Make sure you bring a warm coat with layers plus a hat and gloves. `);
    } else if (tempAverage < 50) {
        $.prepend(` The temperature with be cool but nice in ${cityName}! Definitely bring a jacket or warm sweater and layers. `);
    } else if (tempAverage < 70) {
        $.prepend(` The temperature with be cool but nice in ${cityName}! You may need a sweather or light jacket when you are wandering. `);
    } else {
        $tempText.prepend(` Awesome! Beach weather! The weather is going to hot in ${cityName}. Bring shorts and t-shirts/light shirts (and maybe a bathing suit!).`);
    };
    $tempicon = $("<i>")
    $tempicon.addClass("fas fa-temperature-low");
    $tempText.prepend($tempicon);
    $weatherSummary.append($tempText);

    //warning about wind if necessary
    $windText = $("<h5>");
    $windText.addClass("wind");
    if (maxWindSpeed < 10) {
        $windText.text(` No worries. The wind should be fairly calm. `);
    } else if (maxWindSpeed < 20) {
        $windText.text(` A little breezy at times, might need a layer. Wind should not be unpleasant. `);
    } else {
        $windText.text(` It will occasionally get very windy! Plan accordingly. Bring a kite! `);
    };
    $windText.append(` The maximum wind will be ${maxWindSpeed} mph.`);
    $windicon = $("<i>");
    $windicon.addClass("fas fa-wind");
    $windText.prepend($windicon);
    $weatherSummary.append($windText);

    //clear skies discussion
    $clearText = $("<h5>");
    $clearText.addClass("sun");
    $clearText.text(` Sun report: It will be clear ${clearPercent} percent of the time,`);
    let intClearPercent = parseInt(clearPercent);
    if (intClearPercent == 0) {
        $clearText.text(`Sadly, there will be no clear skies the entire time. No need for sunscreen.`)
    } else {
        if (tempAverage < 32) {
            $clearText.append(` but really cold, so only bring sunscreen if you are going skiing.`)
        } else {
            $clearText.append(`don't forget to bring sunscreen!.`)
        };
    };
    $clearicon = $("<i>");
    $clearicon.addClass("fas fa-cloud-sun");
    $clearText.prepend($clearicon);
    $weatherSummary.append($clearText);

    //precipitation discussion
    $precipText = $("<h5>");
    $precipText.addClass("precip");
    $precipText.text(` Precipition: `);
    if (rainPercent == 0) {
        if (snowPercent == 0) {
            $precipText.append(`Wonderful! there is no rain or snow in the forecast for ${cityName}, so enjoy and get outside! `)
        } else {
            $precipText.append(`There is snow in the forecast. It will snow ${snowPercent}% of the time you are in ${cityName}, so bring your winter gear and make a snowman!`)
        }
    } else if (rainPercent < 50) {
        $precipText.append(`Unfortunately, it is going to rain ${rainPercent}% of the time you are in ${cityName}. Depending on your style, you will need a raincoat or umbrella. `)
        if (snowPercent > 0) {
            $precipText.append(`Sadly, you have a double whammy! It is also going to snow ${snowPercent}% of the time you are there, so bring boots, too!`)
        }
    } else {
        $precipText.append(`Bummer! it is going to rain most of the time you are in ${cityname}! It will rain ${rainPercent}% of the time, so bring an umbrella or raincoat, depending on your style. `)
    };
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
    $daysText = $("<h5>");
    $daysText.addClass("threehour");
    $daysText.text(` On a short break, you need to be flexible, and know the exact conditions. Here are the detailed Forecasts (every 3 hours):`);
    $daysText.text(`Hourly Forecast:`);
    $dateicon = $("<i>")
    $dateicon.addClass("fas fa-calendar-day");
    $daysText.prepend($dateicon);
    $weatherHourly.append($daysText);
    let n = 0;
    for (i=0; i < 39; i++) {
    $forecastText = $("<h5>");
    let currentWeather = responseFutureSample.list[i].weather[0].main;
    let gotTime = responseFutureSample.list[i].dt;
    var time = moment.unix(gotTime).format("MM-DD=YYYY HH:mm");
    let futureTemp = responseFutureSample.list[i].main.temp;
    futureTemp = (futureTemp - 273.15) * (9 / 5) + 32;
    futureTempF = parseInt(futureTemp);
    $forecastText.text(` ${time}    ${currentWeather}   ${futureTempF}°`);
    $ellicon = $("<i>")
    $ellicon.addClass("fas fa-ellipsis-h");
    $forecastText.prepend($ellicon);
    $weatherHourly.append($forecastText);
    };

    //putting the panner on the page
    // $(".weather").append($plannerDiv);
}

//adding icons to 3 hour forcasts
function addIcon3Hour() {
    let currentWeather4Icon = responseFutureSample.list[i].weather[0].main;
    if (currentWeather4Icon == "Rain") {
        $threehricon = $("<i>")
        $threehricon.addClass("fas fa-cloud-rain");
        $forecastText.append($threehricon);
    };
    if (currentWeather4Icon == "Snow") {
        $threehricon = $("<i>")
        $threehricon.addClass("far fa-snowflake");
        $forecastText.append($threehricon);
    };
    if (currentWeather4Icon == "Clouds") {
        $threehricon = $("<i>")
        $threehricon.addClass("fas fa-cloud");
        $forecastText.append($threehricon);
    };

    if (currentWeather4Icon == "Clear") {
        $threehricon = $("<i>")
        $threehricon.addClass("fas fa-sun");
        $forecastText.append($threehricon);
    };
    if (currentWeather4Icon == "Clear") {
        $threehricon = $("<i>")
        $threehricon.addClass("fas fa-moon");
        $forecastText.append($threehricon);
    };
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
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latCode}&lon=${longitude}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

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


// $(".search").on("click", function () {
//     todayWeather();
//     futureWeather();
// });
