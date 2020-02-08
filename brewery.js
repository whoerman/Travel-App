let zip = "03801"


function breweriesZip() {
    let queryURL = `https://api.openbrewerydb.org/breweries?by_postal=${zip}`

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (responseBrewery) {
            console.log(responseBrewery);

        });
};
