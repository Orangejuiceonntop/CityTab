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

//weather widget
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

//Settings Screen
let settings = document.getElementById("settings")
let settingsOpen = document.getElementById("settingsOpen")
let settingsClose = document.getElementById("settingsClose")

settingsOpen.addEventListener("click", event => {
    settings.style.display = "block"
})

settingsClose.addEventListener("click", event => {
    settings.style.display = "none"
})

//Calendar widget
const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNext = document.querySelectorAll(".icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag; 
}
renderCalendar();

prevNext.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date (currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date ();
        }
        renderCalendar();
    })
})

//settings toggles/screen
///Name display
const nameInput = document.getElementById("nameInput");
const nameDisplay = document.getElementById("nameDisplay");

nameInput.addEventListener("keyup", display);

nameDisplay.innerHTML = "Hello, " + localStorage.getItem("value");

if (localStorage.getItem("value") === null) {
    nameDisplay.innerHTML = "Hello, _____"
}

function display() {
    localStorage.setItem('value', nameInput.value);
    nameDisplay.innerHTML = "Hello, " + localStorage.getItem("value")
}

///buttons
