const apiCall = (address) => {
    fetch(address).then((response) => {
        response.json().then((data) => {
            const pTag = document.querySelector("p");
            pTag.style.display = "block";
            if (!data.error) {
                // return console.log(data);
                return pTag.textContent = `Name: ${data.name}
                Timezone: ${data.timezone}
                Temperature: ${data.temperature}
                Chance of Rain: ${data.chanceOfRain}%`;
            }
            pTag.textContent = `Error: ${data.error}`;
        }); 
    });
};

// Getting the input from the user!
// Since we may use heroku or localhost we don't actually need to type it explicitly 
// node inferes so like with our directories in href or path we can just write our route
const  endpoint = "/weather?address=";
const formInfo = document.querySelector("form");
formInfo.addEventListener("submit", (e) => {
    e.preventDefault();
    const address = formInfo.querySelector("input");
    const req = endpoint + address.value;
    apiCall(req);
});