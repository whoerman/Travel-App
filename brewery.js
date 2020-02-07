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

breweriesZip();

function breweryList() {
    for (i=0; i<responseBrewery.length; i++) {
        let breweryName = responseBrewery[i];
        console.log(breweryName);
    }
}

function breweriesCity() {
    let queryURL = `https://api.openbrewerydb.org/breweries?by_postal=03801`

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (responseBrewery) {
            console.log(responseBrewery);

        });
};
