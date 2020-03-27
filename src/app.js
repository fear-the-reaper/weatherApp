// to do path manip we use this 
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");


const app = express();
// Since heroku uses its own port which changes overtime we set it up!
// it has an evironment var we can access thru procees.env:
const port;
if (!process.env.PORT) {
    port = 3000;
} else {
    port = process.env.PORT;
}

const landingPage = path.join(__dirname, "../public");
const templates = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");
// to make dynamic web pages we use template engines we using hbs also set before using jackass
app.set("view engine", "hbs");
app.set("views", templates);
hbs.registerPartials(partials);
// to set a custom location we can do :
app.use(express.static(landingPage));

app.get("", (req, res) => {
    // how to get dynamic:
    res.render("index", {
        name: "Reaper",
        app: "Weather App",
        userName: "cluelessHero"
    });
});  

app.get("/about", (req, res) => {
    // how to get dynamic:
    res.render("about", {
        name: "Reaper",
        faq1: "faq",
        teams: "team",
        services: "services"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        name: "Reaper",
        error: "Welcome to the help page"
    });
});

// req has query strings that contains info of which thing we sshould get and do shit
app.get("/weather", (req, res) => {
    // Challenge of query string:
    console.log(req.query.address);
    const {address} = req.query;
    if(!address){
        return res.send({
            error: "Bitch give an address"
        });
    }
    geocode(address, (error, data) => {
        if(!error){
            return forecast(data, (error, {name, timezone, temperature, chanceOfRain} ) => {
                if(!error){
                    return res.send({
                        name,
                        timezone,
                        temperature,
                        chanceOfRain
                    });   
                }
                res.send({error});
            });
        }
        res.send({error});
    })
});

// new exp route:
app.get("/games", (req, res) => {
    res.send({
        games: []
    });
    console.log(req.query);
    
});

// 404 pages
// * => means wildcard basically we saying IF the above routes aren't the ones 
// provided send this :/. * can also be used route specific error pages 

// it comes last cuz we want to check all options
// route specifec:
app.get("/help/*", (req, res) => {
    res.render("error404", {
        msg: "Can't find this in the help section :("
    });
});

app.get("*", (req, res) => {
    res.render("error404", {
        msg: "you seem to be lost...."
    });
});



app.listen(port, () => {
    console.log("The server is up and running!!! @ " + port);
});