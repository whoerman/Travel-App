// DOM elements

/*
var test = "blake";
var arrival = "arrival date test string";
var departure = "departure date test string";
var arrivalEl = 2020-03-03;
var departureEl = 2020-03-03;
var day2 = 2020-03-04;
var date = new Date();          // Get current Date
*/

var invoiceDate = document.querySelector("#invoiceDate").value;
var days = Number(document.querySelector("#days").value);
var dueDateElement = document.querySelector("#dueDate");
var initialDepartureDate = document.querySelector("#invoiceDate").value;
var day1;
var day2;
var day3;
var day4;
var day5;
var eventDays;

/*
console.log("test variable = " + test);
console.log("arrival variable = " + arrival);
console.log("departure variable = " + departure);
console.log("arrivalEL variable = " + arrivalEl);
console.log("departureEL variable = " + departureEl);
*/

/*
function submitDates() {
    document.getElementById("demo").innerHTML = test;
    document.getElementById("aDate").innerHTML = arrival;
    document.getElementById("dDate").innerHTML = departure;
    arrivalEl = document.getElementById('arrivalForm').value;
    departureEl = document.getElementById('departureForm').value;
    document.getElementById("aDate").innerHTML = arrivalEl;
    document.getElementById("dDate").innerHTML = departureEl;
console.log("test variable = " + test);
console.log("arrival variable = " + arrival);
console.log("departure variable = " + departure);
console.log("arrivalEL variable = " + arrivalEl);
/* console.log("departureEL variable = " + departureEl); */

document.querySelector("#addDays").addEventListener("click", function () {
    invoiceDate = document.querySelector("#invoiceDate").value;
    days = Number(document.querySelector("#days").value);
    dueDateElement = document.querySelector("#dueDate");
    initialDepartureDate = document.querySelector("#invoiceDate").value;

    if (!isNaN(days) && invoiceDate.length) {
        console.log("1st invoice date: " + invoiceDate);
        invoiceDate = invoiceDate.split("-");
        console.log("invoice date after split " + invoiceDate);
        invoiceDate = new Date(invoiceDate[0], invoiceDate[1] - 1, invoiceDate[2]);
        console.log("invoice date after new date: " + invoiceDate);
        day1 = invoiceDate;
        console.log("day 1 date: " + invoiceDate);

        invoiceDate.setDate(invoiceDate.getDate() + 1);
        day2 = invoiceDate;
        console.log("day 2 date: " + invoiceDate);

        invoiceDate.setDate(invoiceDate.getDate() + 1);
        day3 = invoiceDate;
        console.log("day 3 date: " + invoiceDate);

        invoiceDate.setDate(invoiceDate.getDate() + 1);
        day4 = invoiceDate;
        console.log("day 4 date: " + invoiceDate);

        invoiceDate.setDate(invoiceDate.getDate() + 1);
        day5 = invoiceDate;
        console.log("day 5 date: " + invoiceDate)

        eventDays = [day1, day2, day3, day4, day5];
        console.log("event dates: " + eventDays);

        invoiceDate.setDate(invoiceDate.getDate() + days);
        console.log("invoice date after set date and adding days: " + invoiceDate);

        dueDateElement.valueAsDate = null;
        dueDateElement.valueAsDate = invoiceDate;
        console.log("initialDepartureDate = " + initialDepartureDate);
        console.log("invoiceDate = " + invoiceDate);
        console.log("dueDateElement = " + dueDateElement.value);
        document.getElementById("dueDate").innerHTML = invoiceDate;
    }
});