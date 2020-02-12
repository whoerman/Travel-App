// // stating time zone and sun times

// let latitude = "43.072";
// let longitude = "-70.763";
// let cityName = responseFutureSample.city.name;

// //setting up your sunst info to put in div

// function factsPlanner() {
//     //emptying the weather div and making the global div to put in there
//     $(".sunset").empty();
//     $factsDiv = $("<div>");

//     //making the header and subheader and adding them to planner
//     $headerF = $("<h4>");
//     $headerF.addClass("header");
//     $headerF.text(` Here are other facts to know for your trip to ${cityName}: `);
//     $headerFicon = $("<i>");
//     $headerFicon.addClass("fas fa-list-ul");
//     $headerF.prepend($headerFicon);
//     $factsDiv.append($headerF);
//     //adding the time zone discussion
//     $timeZone = $("<h5>");    
//     let currentTZone= responseOC.results[0].annotations.timezone.name;
//     let currentOffset = ResponseOC.results[0].annotations.timezone.offset_sec;
//     let currentOffsethours = currentOffset/3600;
//     let timeFromNY = currentOffsethours + 5;
//     let timeFromLA = currentOffsethours+ 8;
//     let timefromLondon = currentOffsethours;
//     $timeZone.text(` ${cityName} is in the ${currentTZone} time zone. That puts it ${timeFromNY} hours different from NYC, ${timeFromLA} hours from LA, and ${timefromLondon} hours from London. Plan accordingly when scheulding activities.`);
//     $timeFicon = $("<i>");
//     $timeFicon.addClass("fas fa-history");
//     $timeZone.prepend($timeFicon);
//     $factsDiv.append($timeZone);
//     //adding sunset and sunrise and daylight
//     let currentSunrise = responseOC.results[0].annotations.sun.rise.apparent;
//     let currentSunriseTime = moment.unix(currentSunrise).format("hh:mm A");
//     let currentSunset = responseOC.results[0].annotations.sun.set.apparent;
//     let currentSunsetTime = moment.unix(currentSunset).format("hh:mm A");
//     let dayLength = (currentSunset-currentSunrise)/3600
//     let dayLengthHours = parseInt(dayLength);
//     let dayLengthMinutes =parseInt((dayLength-dayLengthHours)*60);
//     $sunTime = $("<h5>");
//     $sunTime.text(` The sun will rise at ${currentSunriseTime} and set at ${currentSunsetTime}, giving you ${dayLengthHours} hours and ${dayLengthMinutes} minutes of daylight. Plenty of time to have fun! `)
//     $sunicon = $("<i>");
//     $sunicon.addClass("fas fa-sun");
//     $sunTime.prepend($sunicon);
//     $factsDiv.append($sunTime);


//     $(".sunset").append($factsDiv);




// };
// factsPlanner();