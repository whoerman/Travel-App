//takes geocode from googlejs.js and AjAXs's it though Ticket API
//whole page should be wrapped in a function

function showPosition() {
    /*var x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;*/
    //var latlon = position.coords.latitude + "," + position.coords.longitude;
    var latlon = "38.8951,-77.0364"
    var days = 3
    var startDate = 2020 - 02 - 28


    $.ajax({
        type: "GET",
       /* url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&latlong=" + latlon, */
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd&radius=4&unit=miles&locale=*&size=5&countryCode=US&localStartDateTime=2020-02-28T00:00:00,2020-02-28T23:59:59&geoPoint=42.294709,-71.088111",
       async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            /* var e = document.getElementById("events");
             e.innerHTML = json.page.totalElements + " events found.";
             showEvents(json);
             initMap(position, json);*/
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });

}
showPosition();
