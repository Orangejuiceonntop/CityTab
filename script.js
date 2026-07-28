//search bar
const input = document.getElementById('input');

input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        const search = input.value;
        window.location.href = _blank`https://www.google.com/search?q=${search}`;
    }
});

//clock-time
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
    let description = document.getElementById("description");
    let location = document.getElementById("location");


    location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`)
                    .then(response => response.json())
                    .then(data => {
                        const temp = data.current.temperature_2m;
                        temperature.innerHTML = temp
                    });
        
    }

    function error() {
        location.innerHTML = "Unable to retrieve your location";
    }

}
getWeather()