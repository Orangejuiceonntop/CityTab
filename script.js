//search bar
const input = document.getElementById('input');

input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        const search = input.value;
        window.location.href = _blank`https://www.google.com/search?q=${search}`;
    }
});