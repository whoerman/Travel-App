// stating time zone and sun times


//parameters from opencage
let currentLat = openCageSample.results[0].geometry.lat;
console.log(`Current Latitude: ${currentLat}`);
let currentLng = openCageSample.results[0].geometry.lng;
console.log(`Current Longitude: ${currentLng}`);

let currentTZone= openCageSample.results[0].annotations.timezone.name;
console.log(`Current Time Zone: ${currentTZone}`);

let currentOffset = openCageSample.results[0].annotations.timezone.offset_sec;
let currentOffsethours = currentOffset/3600;
console.log(`Correction from GMT is ${currentOffsethours} hours`);

let currentSunrise = openCageSample.results[0].annotations.sun.rise.apparent;
let currentSunriseTime = moment.unix(currentSunrise).format("hh:mm A");
console.log(`local current sunrise: ${currentSunriseTime}`);

let currentSunset = openCageSample.results[0].annotations.sun.set.apparent;
let currentSunsetTime = moment.unix(currentSunset).format("hh:mm A");
console.log(`local current sunset: ${currentSunsetTime}`);

let dayLength = (currentSunset-currentSunrise)/3600
let dayLengthHours = parseInt(dayLength);
let dayLengthMinutes =parseInt((dayLength-dayLengthHours)*60)
console.log(`Day light: ${dayLengthHours} and ${dayLengthMinutes} minutes`);