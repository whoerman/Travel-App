//takes geocode from googlejs.js and AjAXs's it though Ticket API
//whole page should be wrapped in a function


var cities = ["Boston","Miami"];
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cities[0] + "?apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd";
//var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=azaUxsQPC2NvNoM7ZPpJOHJ0xw2N0iqd";

function abc(){
    $.ajax({
        url: queryURL,
        method:"GET"
    }).done(function (response){
        console.log("Response: "+JSON.stringify(response));
    })
}

abc();