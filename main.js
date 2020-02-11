
$(document).ready(function () {

<<<<<<< HEAD

    /*var next_id = $(".mtr-select");
    $.each(json, function(key, value) {
        $(next_id).append($("<option></option>").attr("value", value.id).text(value.name));
    });
    $(next_id).material_select();*/




    let stateOptions = function () {
        
        states.forEach(function (item, value) {
            $('.stateSelect').formSelect();
            let newOpt = $("<option>");
            newOpt.attr("value", value);
=======
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
>>>>>>> 01f1225cf43534400c72daf7cf7466a30f29fdef
            newOpt.text(item);
            $(".stateSelect").append(newOpt);

            var instance = M.FormSelect.getInstance($('.stateSelect'));
            var _d = instance.getSelectedValues();
            console.log(_d);





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

<<<<<<< HEAD
    $(".search").on("click", function () {
        //window.location.replace("location.html")
=======

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
        window.location.replace("location.html")
        todayWeather();
        futureWeather();
    })





    $(".weatherBtn").on("click", function () {
        console.log("I work!")
    })

    $(".eventBtn").on("click", function () {
        console.log("I work!")
>>>>>>> 01f1225cf43534400c72daf7cf7466a30f29fdef
    })



});

