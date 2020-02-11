//takes geocode from googlejs.js and AjAXs's it though Ticket API
//whole page should be wrapped in a function

var city = “Boston”;
var apiKey = “azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd”;
var queryUrl = “https://www.ticketmaster.com/v3/events/search/?q=” + city + apiKey;
$.ajax({
    url: queryUrl,
    method: “GET”
}).then(function (ticketMaster) {
    var eventsT = ticketMaster.events;
    var text = [];
    for (i = 0; i < 5; i++) {
        text +=
            “<div class=‘eventDisplay’><p>” +
            eventsT[i].name.text +
            “</p>” +
            “<p><a href=” +
            eventsT[i].url +
            ” target=‘_blank’>” +
            eventsT[i].url +
            “</a></p></div>“;
    }
    $.ajax({
        url: queryUrl,
        method: “GET”
    }).then(function (ticketMaster) {
        console.log(ticketMaster);
    })})





















