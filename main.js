$(".home.location").ready(function () {

    let stateOptions = function () {
        states.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".stateSelect").append(newOpt);
        });
    }
    stateOptions()

    let monthOptions = function () {
        month.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".month").append(newOpt);
        });
    }
    monthOptions()
    let dayOptions = function () {
        day.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".day").append(newOpt);
        });
    }
    dayOptions()
    let yearOptions = function () {
        year.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".year").append(newOpt);
        });
    }
    yearOptions()

    $('select').formSelect();

    recentCities = [];

    let getCities = function () {
        recentCities = JSON.parse(localStorage.getItem("cityArray"));
        if (!recentCities) {
            localStorage.setItem("cityArray", JSON.stringify(recentCities));
        }
    };
    getCities()

    $(".search").on("click", function () {
        if (($("select.month").val() === null) || ($("select.day").val() === null) || ($("select.year").val() === null) || ($("select.stateSelect").val() === null) || (!$("#input_text").val())) {
            alert("you dummy");
        }

        let month = $("select.month").val();
        let day = $("select.day").val();
        let year = $("select.year").val();
        let state = $("select.stateSelect").val();
        let city = $("#input_text").val().trim()
        if (!recentCities) {
            recentCities = [(`${city}, ${state}`)]
        } else if (recentCities.length >= 0) {
            recentCities.unshift(`${city}, ${state}`)
        }
        localStorage.setItem("cityArray", JSON.stringify(recentCities))
        $("#input_text").val(" ")


        changePage()
    })

    function changePage() {
        location.replace("location.html")
    }

    getCoords(recentCities)

    function getCoords(arr) {
        console.log(recentCities[0])

        if (!arr) {
            return;
        }

        let str = arr[0]
        let split = str.split(",")
        let myCity = split[0].split(" ").join("%20")
        let state = split[1].replace(" ", "")
        let searchID = `${myCity}%2C%20${state}`
        let apiKey = "key=16fa0f1560a34557aeefa93881a42dfb";

        const queryURL = `https://api.opencagedata.com/geocode/v1/json?q=${searchID}&${apiKey}&language=en&pretty=1`

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (responseOC) {

            latCode = (responseOC.results[0].geometry.lat);
            lngCode = (responseOC.results[0].geometry.lng);
            console.log(`${latCode} and ${lngCode} `)

            let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latCode}&lon=${lngCode}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (responseFuture) {
                    $(".weather").empty();
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
                    let cityName = responseFuture.city.name;
                    //building the weather condition array
                    for (a = 1; a < 40; a++) {
                        let currentType = responseFuture.list[a].weather[0].main;
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
                    for (i = 0; i < 40; i++) {
                        //run through all the temps over the next 5 days and convert them to F and put in temp array
                        let futureTemp = responseFuture.list[i].main.temp;
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
                    //building the wind speed array
                    for (a = 1; a < 40; a++) {
                        let currentWind = responseFuture.list[a].wind.speed;
                        windArray.push(currentWind);
                    };
                    //check for rain or snow or clear precentages
                    for (a = 0; a < windArray.length; a++) {
                        if (windArray[a] > maxWindSpeed) {
                            maxWindSpeed = windArray[a];
                        };
                    };
                    maxWindSpeed = parseInt(maxWindSpeed);

                    $weatherSummary = $(".weatherSummary")
                    $plannerDiv = $("<div>");
                    $header = $(".locationTitle");
                    $header.text("Your Five Day Weather Packing Guide!")
                    // $plannerDiv.append($header);
                    $headericon = $("<i>")
                    $headericon.addClass("fas fa-suitcase-rolling");
                    $header.prepend($headericon);
                    $headericon = $("<i>")
                    $headericon.addClass("fas fa-suitcase");
                    $header.append($headericon);
                    //decision tree for temp, formating the temp and adding it to the planner
                    $tempText = $("<h5>");
                    $tempText.addClass("temp");
                    $tempText.append(` The temps will be between ${coldtemp} and ${hottemp}, with an average of ${tempAverage}.`);
                    if (tempAverage < 32) {
                        $tempText.prepend(` The average temp will be below freezing in ${cityName}! Make sure you bring a warm coat with layers plus a hat and gloves. `);
                    } else if (tempAverage < 50) {
                        $tempText.prepend(` The temperature with be cool but nice in ${cityName}! Definitely bring a jacket or warm sweater and layers. `);
                    } else if (tempAverage < 70) {
                        $tempText.prepend(` The temperature with be cool but nice in ${cityName}! You may need a sweather or light jacket when you are wandering. `);
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
                        $precipText.append(`Bummer! it is going to rain most of the time you are in ${cityName}! It will rain ${rainPercent}% of the time, so bring an umbrella or raincoat, depending on your style. `)
                    };
                    $rainicon = $("<i>")
                    $rainicon.addClass("fas fa-cloud-showers-heavy");
                    $precipText.prepend($rainicon);
                    $weatherSummary.append($precipText);

                    ///addding other facts
                    $factsDiv = $("<div>")
                    $headerF = $("<h5>");
                    $headerF.addClass("header");
                    $headerF.text(` Here are other helpful facts to know for your trip to ${cityName}: `);
                    $headerFicon = $("<i>");
                    $headerFicon.addClass("fas fa-list-ul");
                    $headerF.prepend($headerFicon);
                    $factsDiv.append($headerF);
                    //adding the time zone discussion
                    $timeZone = $("<h5>");
                    let currentTZone = responseOC.results[0].annotations.timezone.name;
                    let currentOffset = responseOC.results[0].annotations.timezone.offset_sec;
                    let currentOffsethours = currentOffset / 3600;
                    let timeFromNY = currentOffsethours + 5;
                    let timeFromLA = currentOffsethours + 8;
                    let timefromLondon = currentOffsethours;

                    $timeZone.text(` ${cityName} is in the ${currentTZone} time zone. That puts it ${timeFromNY} hours different from NYC, ${timeFromLA} hours from LA, and ${timefromLondon} hours from London. Plan accordingly when scheulding activities.`);
                    $timeFicon = $("<i>");
                    $timeFicon.addClass("fas fa-history");
                    $timeZone.prepend($timeFicon);
                    $factsDiv.append($timeZone);
                    //adding sunset and sunrise and daylight
                    let currentSunrise = responseOC.results[0].annotations.sun.rise.apparent;
                    let currentSunriseTime = moment.unix(currentSunrise).format("hh:mm A");
                    let currentSunset = responseOC.results[0].annotations.sun.set.apparent;
                    let currentSunsetTime = moment.unix(currentSunset).format("hh:mm A");
                    let dayLength = (currentSunset - currentSunrise) / 3600
                    let dayLengthHours = parseInt(dayLength);
                    let dayLengthMinutes = parseInt((dayLength - dayLengthHours) * 60);

                    $sunTime = $("<h5>");
                    $sunTime.text(` The sun will rise at ${currentSunriseTime} and set at ${currentSunsetTime}, giving you ${dayLengthHours} hours and ${dayLengthMinutes} minutes of daylight. Plenty of time to have fun! `)
                    $sunicon = $("<i>");
                    $sunicon.addClass("fas fa-sun");
                    $sunTime.prepend($sunicon);
                    $factsDiv.append($sunTime);
                    $weatherSummary.append($factsDiv);
                    console.log("weatherSummary done 2");
                    $(".weather").append($weatherSummary);

                    //adding 5 day planner
                    $weatherHourly = $(".weatherHourly");
                    $daysText = $("<h4>");
                    $daysText.text(`Hourly Forecast:`);
                    $dateicon = $("<i>");
                    $dateicon.addClass("fas fa-calendar-day");
                    $daysText.prepend($dateicon);
                    $weatherHourly.append($daysText);

                    $box1 = $("<div>");
                    $box1.addClass(`box col s12`);
                    $weatherHourly.append($box1);
                    $box1head = $("<h5>");
                    $box1head.addClass("center-align");
                    $box1.append($box1head);

                    $box2 = $("<div>");
                    $box2.addClass(`box col s12`);
                    $weatherHourly.append($box2);
                    $box2head = $("<h5>");
                    $box2head.addClass("center-align");
                    $box2.append($box2head);

                    $box3 = $("<div>");
                    $box3.addClass(`box col s12`);
                    $weatherHourly.append($box3);
                    $box3head = $("<h5>");
                    $box3head.addClass("center-align");
                    $box3.append($box3head);

                    $box4 = $("<div>");
                    $box4.addClass(`box col s12`);
                    $weatherHourly.append($box4);
                    $box4head = $("<h5>");
                    $box4head.addClass("center-align");
                    $box4.append($box4head);

                    $box5 = $("<div>");
                    $box5.addClass(`box col s12`);
                    $weatherHourly.append($box5);
                    $box5head = $("<h5>");
                    $box5head.addClass("center-align");
                    $box5.append($box5head);

                    for (i = 0; i < 39; i++) {
                        $forecastText = $("<h5>");
                        // let currentWeather = responseFuture.list[i].weather[0].main;
                        let gotTime = responseFuture.list[i].dt;
                        let time = moment.unix(gotTime).format("ha");
                        let time2 = moment.unix(gotTime).format("MM/DD/YY");
                        let futureTemp = responseFuture.list[i].main.temp;
                        futureTemp = (futureTemp - 273.15) * (9 / 5) + 32;
                        futureTempF = parseInt(futureTemp);
                        $forecastText.text(`${time} \u00A0\ ${futureTempF}° \u00A0\ `);
                        let currentDate = parseInt(moment.unix(responseFuture.list[i].dt).format("D"));
                        let currentWeather4Icon = responseFuture.list[i].weather[0].main;
                        let dateCheck = parseInt(moment.unix(responseFuture.list[1].dt).format("D"));

                        if (currentDate === dateCheck) {
                            $box1.append($forecastText);
                            $box1head.text(time2)
                        } else if (currentDate === (dateCheck + 1)) {
                            $box2.append($forecastText)
                            $box2head.text(time2)
                        } else if (currentDate === (dateCheck + 2)) {
                            $box3.append($forecastText)
                            $box3head.text(time2)
                        } else if (currentDate === (dateCheck + 3)) {
                            $box4.append($forecastText)
                            $box4head.text(time2)
                        } else if (currentDate === (dateCheck + 4)) {
                            $box5.append($forecastText)
                            $box5head.text(time2)
                        }

                        if (currentWeather4Icon == "Rain") {
                            $threehricon = $("<i>")
                            $threehricon.addClass("fas fa-cloud-rain");
                            $forecastText.append($threehricon);
                        } else if (currentWeather4Icon == "Snow") {
                            $threehricon = $("<i>")
                            $threehricon.addClass("far fa-snowflake");
                            $forecastText.append($threehricon);
                        } else if (currentWeather4Icon == "Clouds") {
                            $threehricon = $("<i>")
                            $threehricon.addClass("fas fa-cloud");
                            $forecastText.append($threehricon);
                        } else if (currentWeather4Icon == "Clear") {
                            $threehricon = $("<i>")
                            $threehricon.addClass("fas fa-sun");
                            $forecastText.append($threehricon);
                        } else if (currentWeather4Icon == "Clear") {
                            $threehricon = $("<i>")
                            $threehricon.addClass("fas fa-moon");
                            $forecastText.append($threehricon);
                        };
                    };

                });
        });
    };

    $(".weatherBtn").on("click", function () {
        $("#events").hide()
        $("#weather").show()
    })

    $(".eventBtn").on("click", function () {
        $("#weather").hide()
        $("#events").show()
    })


})
