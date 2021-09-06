const path = require('path')
const express = require('express')
// Handlebars module
const hbs = require('hbs')
const chalk = require('chalk')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//console.log(path.join(__dirname,'../public'))
 
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine','hbs')                                    //set a value to express key and value(value is a module we installed ) , this all is for dynamic templates
app.set('views',viewsPath)                                      // customize the Views path
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {                                       // this is for dynamic page load (hbs module)
    res.render('index',{
        title:'Weather ',
        name:'Anup Panchal'
    })
})

 app.get('/about',(req,res) => {                                // this is for dynamic page load (hbs module)
    res.render('about',{
        title:'About me',
        name:'Anup Panchal'
    })
})

app.get('/help',(req,res) => {                                  // this is for dynamic page load (hbs module)
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help', 
        name:'Anup Panchal'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error:'Must required to address!'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, {weather_descriptions,temperature,feelslike} = {}) => {
            if(error){
                return res.send({ error })
            }
            const forecastData = `${weather_descriptions[0]} .It is currently ${temperature} degree out. It feels like ${feelslike} out`;

            console.log(chalk.green.inverse(location))
            console.log(chalk.green.inverse(forecastData))

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    });


})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            Error : ' you must have to provide term'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'Ohooo!',
        errorCode:404,
        error:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'Ohooo!',
        errorCode:404,
        error:'Page not Found'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000')
})

// ?search=gaming&rating=5  