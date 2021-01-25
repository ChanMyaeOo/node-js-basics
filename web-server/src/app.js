const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

// app config
const app = express();
const port = 3000;

// public folder path
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// folder path for template
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// hbs config
app.set('view engine', 'hbs');
app.set('views', viewsPath)

hbs.registerPartials(partialsPath);



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chan Myae Oo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chan Myae Oo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        email: 'help@gmail.com',
        name: 'Chan Myae Oo'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide your location.'
        })
    }

    geocode(address, (error, { location, latitude, longitude } = {}) => {
        if(error) {
            res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Chan Myae Oo',
        text: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Chan Myae Oo',
        text: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('App is running on port ' + port)
})