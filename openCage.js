$(document).ready(function() {
apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";

let recentCities = [];

function buildQuery(cityState) {




    let queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + cityState + apiKey + "&language=en&pretty=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (responseCoords) {

        apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";



        let getWeb = queryURL + apiKey;



        console.log(responseCoords.results["0"].geometry);

        let latCode = (responseCoords.results["0"].geometry.lat);
        console.log(latCode);

        let lngCode = (responseCoords.results["0"].geometry.lng);
        console.log(lngCode);
        return getWeb;
    });
}

let destinationSearch = function () {
    $(".search").on("click", function () {
        if (($("li.selected").text()) === "Select State") {
            alert("please select a valid state");
            return;
        }
        if (!$("#input_text").val()) {
            alert("please enter a valid city");
            return;
        }
        let city = $("#input_text").val()
        let state = $("li.selected").text()
        if (!recentCities) {
            recentCities = [(`${city}, ${state}`)]
        } else if (recentCities.length >= 0) {
            recentCities.unshift(`${city}, ${state}`)
        }
        localStorage.setItem("cityArray", JSON.stringify(recentCities))
       
        $("#input_text").val(" ")
    })
}
destinationSearch()
buildQuery()

})