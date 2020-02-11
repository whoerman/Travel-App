//this will take the data from indexTest and geocode it//takes goecoded data and runs it though AJAX for weather
//whole page should be wrapped in a function
// apiKey = "&key=16fa0f1560a34557aeefa93881a42dfb";
// let latCode = null;
// let lngCode = null;


// function getCoords(arr) {

//     if (!arr) {
//         return;
//     }

//     let str = arr[0]
//     let split = str.split(",")
//     let myCity = split[0].split(" ").join("%20")
//     let state = split[1].replace(" ", "")
//     let searchID = `${myCity}%2C%20${state}`

//     const queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + searchID + apiKey + "&language=en&pretty=1"
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {

//         latCode = (response.results[0].geometry.lat);
//         lngCode = (response.results[0].geometry.lng);
//         console.log(latCode);
//         console.log(lngCode);
//         futureWeather();
//     });
// }





