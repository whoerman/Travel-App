
$(document).ready(function () {

    recentCities = [];

    let getCities = function () {
        recentCities = JSON.parse(localStorage.getItem("cityArray"));
        if (!recentCities) {
            localStorage.setItem("cityArray", JSON.stringify(recentCities));
        }
    };
    getCities()


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
        // window.location.replace("location.html")
    })





    $(".weatherBtn").on("click", function () {
        console.log("I work!")
    })

    $(".eventBtn").on("click", function () {
        console.log("I work!")
    })



});

