const apiCall = (address) => {
    fetch(address).then((response) => {
        response.json().then(({error, name, timezone, temperature, chanceOfRain, summary}) => {
            const pTag = document.querySelector("p");
            pTag.style.display = "block";
            if (!error) {
                // return console.log(data);
                return pTag.textContent = `Name: ${name}
                Timezone: ${timezone}
                Temperature: ${temperature}
                Chance of Rain: ${chanceOfRain}%
                Summary: ${summary}`;
            }
            pTag.textContent = `Error: ${error}`;
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