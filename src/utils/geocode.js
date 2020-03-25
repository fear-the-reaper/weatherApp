const request = require("request");

const geoCode = (name, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(name)}.json?access_token=pk.eyJ1IjoicmVhbHdvcmxkbnBjIiwiYSI6ImNrODA2Y29ubjBid2ozbG83aHViM2RsejkifQ.7IfeRNXp2WbiqnVpPxIIhg&limit=3`;
    const locationOptions = {
        url,
        json: true
    };
    // Remember the shit you see in the browser is in the body attr of the request obj!!!
    request(locationOptions, (error, {body}) => {
        if (error) {
            callback(`There ain't no interent you cunt!!!!!`, undefined);
        }else if (body.message === "Not Found" || body.features.length === 0) {
            callback(`put in a right name you fucking retard`, undefined);   
        }else {
            const {place_name:name, center:coOrds} = body.features[0];
            longitude = coOrds[0];
            latitude = coOrds[1];
            const data = {
                name,
                longitude,
                latitude
            };
            callback(undefined, data);
        }
    }); 
};

module.exports = geoCode;