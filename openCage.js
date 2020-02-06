//this will take the data from indexTest and geocode it//takes goecoded data and runs it though AJAX for weather
//whole page should be wrapped in a function
apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";


function buildQuery(cityState) {




    let queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + cityState + apiKey + "&language=en&pretty=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";
        console.log(response);


        let getWeb = queryURL + apiKey;

        console.log(cityState);

        console.log(response.results["0"].geometry);

        let latCode = (response.results["0"].geometry.lat);
        console.log(latCode);

        let lngCode = (response.results["0"].geometry.lng);
        console.log(lngCode);






        return getWeb;
    });
}



$("#run-search").on("click", function () {
    event.preventDefault();
    //let city = $("#search-term").val().trim();
    let searchCity = $("#input-text").val().trim();
    console.log(searchCity);

    let searchState = $(".selected").text();
    console.log(searchState);

    let cityState = (searchCity).text() + "," + (searchState).text();

    buildQuery(cityState);
});

