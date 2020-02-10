$(document).ready(function () {
    apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";

    let recentCities = [];

    function buildQuery(cityState) {

        let queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + dest + apiKey + "&language=en&pretty=1";
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






        })


    }
    $(".search").on("click", cityState, function() {
        let dest = $("#input_text").val();


        if(!$("#input_text").val()) {
        alert("please enter a valid city");
        return;
        
        
        buildQuery()
    }
        return cityState;
});
destinationSearch()
})
