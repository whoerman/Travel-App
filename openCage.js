//this will take the data from indexTest and geocode it//takes goecoded data and runs it though AJAX for weather
//whole page should be wrapped in a function
apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";


function buildQuery(city) {



    
    let queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + city + apiKey + "&language=en&pretty=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";
        console.log(response);
        

        let getWeb = queryURL + apiKey;

        console.log(city);
        
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
    let city = $("#search-term").val().trim();
    buildQuery(city);
});

