//search bar
const input = document.getElementById('input');

input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        const search = input.value;
        window.location.href = _blank`https://www.google.com/search?q=${search}`;
    }
});

//clock
function displayTime(){
    var dateTime = new Date();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();

    if(hours > 12) {
        hours = hours - 12
    }

    if(minutes < 10) {
        minutes = `0${minutes}`
    }

    if(hours == 0) {
        hours = 12
    }

    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
}
setInterval(displayTime, 10);

//weather
function getWeather() {
    let temperature = document.getElementById("temperature");
    let location = document.getElementById("location");


    location.innerHTML = "Locating...";
    temperature.innerHTML = "Loading..."

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`)
                    .then(response => response.json())
                    .then(data => {
                        const temp = data.current.temperature_2m;
                        temperature.innerHTML = temp + '° F'
                    });
            
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        location.innerHTML = data.city + ", " + data.countryCode;
                    })
        
    }

    function error() {
        location.innerHTML = "Couldn't get your location :(";
        temperature.innerHTML = "";
    }

}
getWeather()