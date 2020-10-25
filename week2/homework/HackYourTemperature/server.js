/*
HackYourTemperature

Create a web server, using Express.js.
The necessary modules for this project: they are express (our web server), express-handlebars (our templating engine) and axios.
*/

//Set up your web server using Express (creating an Express instance
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
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
  res.send(cityName);
  console.log(cityName);
})

//listen to port 3000
app.listen(3000);