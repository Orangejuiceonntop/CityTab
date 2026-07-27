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