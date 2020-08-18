const express = require("express");
const axios = require("axios");
const path = require("path");
const hbs = require("hbs");
const app = express();

//setting up public folder and file path
const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

//setting up views folder and file path
const viewsPath = path.join(__dirname, "/views");

//setting up view engine for HBS (handlebars)
app.set("view engine", "hbs");
app.set("views", viewsPath);

//specifying these to be able to pass values from forms from one page to another.
app.use(express.urlencoded());
app.use(express.json());

app.get("/", async (req, res) => {
    res.render("index");
    isDisplayDetails: false
})

app.post("/", async (req, res) => {
    const cityName = req.body.city;
    const countryName = req.body.country;

    weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=30d64ac16ef032114d93a172306f5a8e`;

    
    const apiResponse = await axios.get(weatherURL).then((response) => {
        //needed to return the response to the variable.
        return response.data
    }).catch((error) => {
        console.log(error);
    });

    console.log(apiResponse);
       
        //res.send("Inside of index");
        res.render("index", {
            temperature: apiResponse.main.temp,
            city: apiResponse.name,
            country: apiResponse.sys.country,
            pic: apiResponse.weather[0].icon,
            weatherType: apiResponse.weather[0].main,
            weatherDescription: apiResponse.weather[0].description,
        });
          
});





//API key - 30d64ac16ef032114d93a172306f5a8e



app.listen(5005, () => {
    console.log("Server is running on port 5005.")
});