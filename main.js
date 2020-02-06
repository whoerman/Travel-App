/*this will be the main file for js
initially it will be for button to listen for data
establishing variables
also to process the data back and forth to local storage
*/

$(document).ready(function () {

    let stateOptions = function () {
        states.forEach(function (item, index) {
            let newOpt = $("<option>");
            newOpt.attr("value", index);
            newOpt.text(item);
            $(".stateSelect").append(newOpt);
        });
    }
    stateOptions()

    let monthOptions = function () {
        month.forEach(function (item, index) {
            let newOpt = $("<option>");
            newOpt.attr("value", index);
            newOpt.text(item);
            $(".month").append(newOpt);
        });
    }
    monthOptions()
    let dayOptions = function () {
        day.forEach(function (item, index) {
            let newOpt = $("<option>");
            newOpt.attr("value", index);
            newOpt.text(item);
            $(".day").append(newOpt);
        });
    }
    dayOptions()
    let yearOptions = function () {
        year.forEach(function (item, index) {
            let newOpt = $("<option>");
            newOpt.attr("value", index);
            newOpt.text(item);
            $(".year").append(newOpt);
        });
    }
    yearOptions()

    $('select').formSelect();

    $(".search").on("click", function() {
        window.location.replace("location.html")
    })
});

