/*this will be the main file for js
initially it will be for button to listen for data
establishing variables
also to process the data back and forth to local storage
*/

$(document).ready(function () {


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
            newOpt.text(item);
            $(".stateSelect").append(newOpt);

            var instance = M.FormSelect.getInstance($('.stateSelect'));
            var _d = instance.getSelectedValues();
            console.log(_d);





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

    $(".search").on("click", function () {
        //window.location.replace("location.html")
    })
});

