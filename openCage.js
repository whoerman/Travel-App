
var arrivalDate = document.querySelector("#arrivalDate").value;
var days = 5;
var day1;
var day2;
var day3;
var day4;
var day5;
var eventDays = [];
var day1Formatted = "2020-02-28";   // hardcoded for now
var day2Formatted = "2020-02-29";   // hardcoded for now
var day3Formatted = "2020-03-01";   // hardcoded for now
var day4Formatted = "2020-03-02";   // hardcoded for now
var day5Formatted = "2020-03-03";   // hardcoded for now
var latlon = "38.8951,-77.0364";    // hardcoded for now
var Day1Events = null;
var Day2Events = null;
var Day3Events = null;
var Day4Events = null;
var Day5Events = null;
var myVar = 0;


document.querySelector("#submitRequest").addEventListener("click", function () {
    arrivalDate = document.querySelector("#arrivalDate").value;

    if (!isNaN(days) && arrivalDate.length) {
        arrivalDate = arrivalDate.split("-");
        arrivalDate = new Date(arrivalDate[0], arrivalDate[1] - 1, arrivalDate[2]);

        day1 = arrivalDate.toString();

        arrivalDate.setDate(arrivalDate.getDate() + 1);
        day2 = arrivalDate.toString();

        arrivalDate.setDate(arrivalDate.getDate() + 1);
        day3 = arrivalDate.toString();

        arrivalDate.setDate(arrivalDate.getDate() + 1);
        day4 = arrivalDate.toString();

        arrivalDate.setDate(arrivalDate.getDate() + 1);
        day5 = arrivalDate.toString();

        console.log(" day 1 event date after 5 rounds: " + day1);
        console.log(" day 2 event date after 5 rounds: " + day2);
        console.log(" day 3 event date after 5 rounds: " + day3);
        console.log(" day 4 event date after 5 rounds: " + day4);
        console.log(" day 5 event date after 5 rounds: " + day5);

        eventDays = [day1, day2, day3, day4, day5];
        console.log("event days array " + eventDays);
    }




    myVar = setInterval(checkEventStatus, 1000);



});


function checkEventStatus() {
    if (Day1Events == null || Day2Events == null || Day3Events == null || Day4Events == null || Day5Events == null) {
        getAllEvents()
    }
    else {
        myStopFunction()
    }
}

function myStopFunction() {
    clearInterval(myVar);
    console.log("Day 1 Events: ");
    console.log(Day1Events);
    console.log("Day 2 Events: ");
    console.log(Day2Events);
    console.log("Day 3 Events: ");
    console.log(Day3Events);
    console.log("Day 4 Events: ");
    console.log(Day4Events);
    console.log("Day 5 Events: ");
    console.log(Day5Events);
}


function getAllEvents() {
    if (Day1Events == null) {
        getDay1Events();
    }

    if (Day2Events == null) {
        getDay2Events();
    }

    if (Day3Events == null) {
        getDay3Events();
    }

    if (Day4Events == null) {
        getDay4Events();
    }

    if (Day5Events == null) {
        getDay5Events();
    }

    console.log(Day1Events);
    console.log(Day2Events);
    console.log(Day3Events);
    console.log(Day4Events);
    console.log(Day5Events);

}

// get events for day 1 and store in Day1Events
function getDay1Events() {
    $.ajax({
        type: "GET",
        timeout: 3000,
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=" + day1Formatted + "T00:00:00," + day1Formatted + "T23:59:59&geoPoint=" + latlon,
        async: true,
        dataType: "json",
        success: function (Day1JSON) {
            Day1Events = Day1JSON;
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

// get events for day 2 and store in Day2Events
function getDay2Events() {
    $.ajax({
        type: "GET",
        timeout: 3000,
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=" + day2Formatted + "T00:00:00," + day2Formatted + "T23:59:59&geoPoint=" + latlon,
        async: true,
        dataType: "json",
        success: function (Day2JSON) {
            Day2Events = Day2JSON;
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

// get events for day 3 and store in Day3Events
function getDay3Events() {
    $.ajax({
        type: "GET",
        timeout: 3000,
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=" + day3Formatted + "T00:00:00," + day3Formatted + "T23:59:59&geoPoint=" + latlon,
        async: true,
        dataType: "json",
        success: function (Day3JSON) {
            Day3Events = Day3JSON;
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

// get events for day 4 and store in Day4Events
function getDay4Events() {
    $.ajax({
        type: "GET",
        timeout: 3000,
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=" + day4Formatted + "T00:00:00," + day4Formatted + "T23:59:59&geoPoint=" + latlon,
        async: true,
        dataType: "json",
        success: function (Day4JSON) {
            Day4Events = Day4JSON;
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

// get events for day 5 and store in Day5Events
function getDay5Events() {
    $.ajax({
        type: "GET",
        timeout: 3000,
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=10&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=" + day5Formatted + "T00:00:00," + day5Formatted + "T23:59:59&geoPoint=" + latlon,
        async: true,
        dataType: "json",
        success: function (Day5JSON) {
            Day5Events = Day5JSON;
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}