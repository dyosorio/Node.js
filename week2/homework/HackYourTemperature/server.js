
//HackYourTemperature App

//Set up your web server using Express (creating an Express instance
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
//const API_KEY = require('./sources/keys.json').API_KEY;
//initialize express
const app = express();


//Handlebars Middleware
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use handlebars as a template to render the template
app.get('/', function(req, res){
    //res.send('hello from backend to frontend!');
    console.log('running on port 3000');
    res.render('index');
})

app.post('/weather', function(req, res){
  const cityName = req.body.cityName;
  const API_KEY = "a54b947f262e2c5b975e64258dc64f90";

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`)
  .then((response) => {
    let temp = response.data.main.temp;
    res.render('index', { weatherText: `The temperature in ${cityName} is ${temp}C!` })
  })
  .catch((err) => {
    res.render('index', { weatherText: "City is not found!" })
    console.log(err);
  })
})

//listen to port 3000
app.listen(3000);