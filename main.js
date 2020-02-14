$(".home").ready(function () {

    $('.modal').modal();

    let stateOptions = function () {
        statesOpt.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".stateSelect").append(newOpt);
        });
    }
    stateOptions()

    let monthOptions = function () {
        monthOpt.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".month").append(newOpt);
        });
    }
    monthOptions()
    let dayOptions = function () {
        dayOpt.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".day").append(newOpt);
        });
    }
    dayOptions()
    let yearOptions = function () {
        yearOpt.forEach(function (item) {
            let newOpt = $("<option>");
            newOpt.attr("value", item)
            newOpt.text(item);
            $(".year").append(newOpt);
        });
    }
    yearOptions()

    $('select').formSelect();

    recentCities = [];
    searchDate = [];

    let getCities = function () {
        recentCities = JSON.parse(localStorage.getItem("cityArray"));
        if (!recentCities) {
            localStorage.setItem("cityArray", JSON.stringify(recentCities));
        }
    };
    getCities()

    let getDate = function () {
        searchDate = JSON.parse(localStorage.getItem("searchDate"));
        if (!searchDate) {
            localStorage.setItem("searchDate", JSON.stringify(searchDate));
        }
    };
    getDate()

    $(".modal-close").on("click", function () {
        $(".modal").hide()
    })

    $(".search").on("click", function () {
        if (($("select.month").val() === null) || ($("select.day").val() === null) || ($("select.year").val() === null) || ($("select.stateSelect").val() === null) || (!$("#input_text").val())) {
            $(".modal").show()
            return;
        }

        let month = $("select.month").val();
        let day = $("select.day").val();
        let year = $("select.year").val();
        if (!searchDate) {
            searchDate = [(`${year}-${month}-${day}`)]
        } else if (searchDate.length >= 0) {
            searchDate.unshift(`${year}-${month}-${day}`)
        }
        localStorage.setItem("searchDate", JSON.stringify(searchDate))
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
})
function changePage() {
    location.replace("location.html")
}

$(".location").ready(function () {
    
    if (recentCities === []) {
        return;
    }
    getCoords(recentCities);



    function getCoords(arr) {

        if (!arr) {
            return;
        }

        let str = arr[0]
        let split = str.split(",")
        let userCity = split[0];
        let myCity = split[0].split(" ").join("%20")
        let state = split[1].replace(" ", "")
        let searchID = `${myCity}%2C%20${state}`
        let apiKey = "key=16fa0f1560a34557aeefa93881a42dfb";

        const queryURL = `https://api.opencagedata.com/geocode/v1/json?q=${searchID}&${apiKey}&language=en&pretty=1`

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (responseOC) {

            let latCode = (responseOC.results[0].geometry.lat);
            let lngCode = (responseOC.results[0].geometry.lng);

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
                    let clearPercent = 0;
                    let fractionR = null;
                    let rainPercent = 0;
                    let fractionS = null;
                    let snowPercent = 0;
                    let coldtemp = null;
                    let hottemp = null;
                    let tempAverage = null;
                    let windMax = null;
                    let maxWindSpeed = 0;
                    let cityName = userCity;
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
                        $tempText.prepend(` The temperature will be cool but nice in ${cityName}! Definitely bring a jacket, warm sweater or layers. `);
                    } else if (tempAverage < 70) {
                        $tempText.prepend(` The temperature will be cool but nice in ${cityName}! You may need a sweater or light jacket when you are wandering. `);
                    } else {
                        $tempText.prepend(` Awesome, beach or poolside weather! The weather is going to hot in ${cityName}. Bring shorts and t-shirts/light shirts (and maybe a bathing suit!).`);
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
                        $windText.text(` A little breezy at times. Wind should not be unpleasant. `);
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
                        $clearText.text(` Sadly, there will be no clear skies the entire time. No need for sunscreen.`)
                    } else {
                        if (tempAverage < 32) {
                            $clearText.append(` but really cold, so only bring sunscreen if you are going skiing.`)
                        } else {
                            $clearText.append(` don't forget to bring sunscreen!.`)
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
                            $precipText.append(` Wonderful! There is no rain or snow in the forecast for ${cityName}, so enjoy and get outside! `)
                        } else {
                            $precipText.append(` There is snow in the forecast. It will snow ${snowPercent}% of the time you are in ${cityName}, so bring your winter gear and make a snowman!`)
                        }
                    } else if (rainPercent < 50) {
                        $precipText.append(` Unfortunately, it is going to rain ${rainPercent}% of the time you are in ${cityName}. Depending on your style, you will need a raincoat or umbrella. `)
                        if (snowPercent > 0) {
                            $precipText.append(` Sadly, you have a double whammy! It is also going to snow ${snowPercent}% of the time you are there, so bring boots, too!`)
                        }
                    } else {
                        $precipText.append(` Bummer! it is going to rain most of the time you are in ${cityName}! It will rain ${rainPercent}% of the time, so bring an umbrella or raincoat, depending on your style. `)
                    };
                    $rainicon = $("<i>")
                    $rainicon.addClass("fas fa-cloud-showers-heavy");
                    $precipText.prepend($rainicon);
                    $weatherSummary.append($precipText);

                    ///addding other facts
                    $factsDiv = $("<div>")
                    $headerF = $("<h4>");
                    $headerF.addClass("header");
                    $headerF.text(` Here are other helpful facts to know for your trip to ${cityName}: `);
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
                    let currentSunriseTime = moment.unix(currentSunrise).format("h:mm A");
                    let currentSunriseHourCalc = moment.unix(currentSunrise).format("HH")
                    let currentSunriseMinCalc = moment.unix(currentSunrise).format("mm")
                    let currentSunset = responseOC.results[0].annotations.sun.set.apparent;
                    let currentSunsetTime = moment.unix(currentSunset).format("h:mm A");
                    let currentSunsetHourCalc = moment.unix(currentSunset).format("HH")
                    let currentSunsetMinCalc = moment.unix(currentSunset).format("mm")
                    let formatHourTime = currentSunsetHourCalc - currentSunriseHourCalc
                    let formatMinTime = currentSunsetMinCalc - currentSunriseMinCalc

                    $sunTime = $("<h5>");
                    $sunTime.text(` The sun will rise at ${currentSunriseTime} and set at ${currentSunsetTime}, giving you ${formatHourTime} hours and ${formatMinTime} minutes of daylight. Plenty of time to have fun! `)
                    $sunicon = $("<i>");
                    $sunicon.addClass("fas fa-sun");
                    $sunTime.prepend($sunicon);
                    $factsDiv.append($sunTime);
                    $weatherSummary.append($factsDiv);
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

                    let date = searchDate[0];
                    let day0 = moment(date).format("YYYY-MM-DD");
                    let day1 = moment(day0).add(1, "days").format("YYYY-MM-DD");
                    let day2 = moment(day1).add(1, "days").format("YYYY-MM-DD");
                    let day3 = moment(day2).add(1, "days").format("YYYY-MM-DD");
                    let day4 = moment(day3).add(1, "days").format("YYYY-MM-DD");
                    console.log(day1)


                    const tick1URL = `https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=${day0}T00:00:00,${day0}T23:59:59&geoPoint=${latCode},${lngCode}`

                    $.ajax({
                        url: tick1URL,
                        method: "GET"

                    }).then(function (response) {
                        let newDiv = $("<div>");
                        newDiv.addClass(`event col s12 m5`);
                        $(".eventsDiv").append(newDiv);
                        let dateEl = $("<h5>");
                        let formatedDate = moment(response._embedded.events[0].dates.start.localDate).format("M/DD/YYYY")
                        dateEl.text(formatedDate);
                        newDiv.append(dateEl);
                        let titleEL = $("<h4>");
                        titleEL.text(response._embedded.events[0].name);
                        newDiv.append(titleEL);
                        let imgSrc = response._embedded.events[0].images[0].url;
                        newDiv.append(`<img class="eventImage" src=${imgSrc} />`);
                        let link = response._embedded.events[0].url;
                        newDiv.append(`<a href="${link}">Buy Tickets!</>`);

                        const tick2URL = `https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=${day1}T00:00:00,${day1}T23:59:59&geoPoint=${latCode},${lngCode}`

                        $.ajax({
                            url: tick2URL,
                            method: "GET"

                        }).then(function (response) {
                            let newDiv = $("<div>");
                            newDiv.addClass(`event col s12 m5`);
                            $(".eventsDiv").append(newDiv);
                            let dateEl = $("<h5>");
                            let formatedDate = moment(response._embedded.events[1].dates.start.localDate).format("M/DD/YYYY")
                            dateEl.text(formatedDate);
                            newDiv.append(dateEl);
                            let titleEL = $("<h4>");
                            titleEL.text(response._embedded.events[1].name);
                            newDiv.append(titleEL);
                            let imgSrc = response._embedded.events[1].images[0].url;
                            newDiv.append(`<img class="eventImage" src=${imgSrc} />`);
                            let link = response._embedded.events[1].url;
                            newDiv.append(`<a href="${link}">Buy Tickets!</>`);

                            const tick3URL = `https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=${day2}T00:00:00,${day2}T23:59:59&geoPoint=${latCode},${lngCode}`

                            $.ajax({
                                url: tick3URL,
                                method: "GET"

                            }).then(function (response) {
                                let newDiv = $("<div>");
                                newDiv.addClass(`event col s12 m5`);
                                $(".eventsDiv").append(newDiv);
                                let dateEl = $("<h5>");
                                let formatedDate = moment(response._embedded.events[2].dates.start.localDate).format("M/DD/YYYY")
                                dateEl.text(formatedDate);
                                newDiv.append(dateEl);
                                let titleEL = $("<h4>");
                                titleEL.text(response._embedded.events[2].name);
                                newDiv.append(titleEL);
                                let imgSrc = response._embedded.events[2].images[0].url;
                                newDiv.append(`<img class="eventImage" src=${imgSrc} />`);
                                let link = response._embedded.events[2].url;
                                newDiv.append(`<a href="${link}">Buy Tickets!</>`);

                                const tick4URL = `https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=${day3}T00:00:00,${day3}T23:59:59&geoPoint=${latCode},${lngCode}`

                                $.ajax({
                                    url: tick4URL,
                                    method: "GET"

                                }).then(function (response) {
                                    let newDiv = $("<div>");
                                    newDiv.addClass(`event col s12 m5`);
                                    $(".eventsDiv").append(newDiv);
                                    let dateEl = $("<h5>");
                                    let formatedDate = moment(response._embedded.events[2].dates.start.localDate).format("M/DD/YYYY")
                                    dateEl.text(formatedDate);
                                    newDiv.append(dateEl);
                                    let titleEL = $("<h4>");
                                    titleEL.text(response._embedded.events[2].name);
                                    newDiv.append(titleEL);
                                    let imgSrc = response._embedded.events[2].images[0].url;
                                    newDiv.append(`<img class="eventImage" src=${imgSrc} />`);
                                    let link = response._embedded.events[2].url;
                                    newDiv.append(`<a href="${link}">Buy Tickets!</>`);

                                    const tick5URL = `https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=${day4}T00:00:00,${day4}T23:59:59&geoPoint=${latCode},${lngCode}`

                                    $.ajax({
                                        url: tick5URL,
                                        method: "GET"

                                    }).then(function (response) {
                                        let newDiv = $("<div>");
                                        newDiv.addClass(`event col s12 m5`);
                                        $(".eventsDiv").append(newDiv);
                                        let dateEl = $("<h5>");
                                        let formatedDate = moment(response._embedded.events[2].dates.start.localDate).format("M/DD/YYYY")
                                        dateEl.text(formatedDate);
                                        newDiv.append(dateEl);
                                        let titleEL = $("<h4>");
                                        titleEL.text(response._embedded.events[2].name);
                                        newDiv.append(titleEL);
                                        let imgSrc = response._embedded.events[2].images[0].url;
                                        newDiv.append(`<img class="eventImage" src=${imgSrc} />`);
                                        let link = response._embedded.events[2].url;
                                        newDiv.append(`<a href="${link}">Buy Tickets!</>`);

                                    });

                                });
                            });

                        });

                    });

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
