const request = require("request");

const forecast = ({name, latitude, longitude}, callback) => {
    url = "https://api.darksky.net/forecast/b5ca722438ff2a5e4c9bc12bab2ae794/" + latitude + "," + longitude;
    const forecastOptions = {
        url,
        json: true
    };
    request( forecastOptions, (error, {body}) => {
        if (error) {
            callback(`Internet ainn't there you cunt`, undefined);
        }else if (body.error) {
            callback(`put in a right location asshole`, undefined);
        }else{
            const forecastData = body.currently;
            const {timezone} = body;
            const {temperature, precipProbability:chanceOfRain} = forecastData;
            const {summary} = body.daily; 
            const forecastInfo = {
                name,
                timezone,
                temperature,
                chanceOfRain,
                summary 
            };
            callback(undefined, forecastInfo); 
        }
    });
}

module.exports = forecast;