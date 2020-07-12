// installed modules
const express = require('express');
const bodyParser = require('body-parser')

// vanilla modules
const path = require('path')

// routes
const indexRoutes = require('./routes/index')
const moviesRoutes = require('./routes/movies')

// database connection
const mongoConnect = require('./util/database').mongoConnect

// create the express application
const app = express();

// set default view engine and views directory
app.set('view engine', 'ejs')
app.set('views', 'views')

// serving files statically
app.use(express.static(path.join(__dirname, 'public')))

// middleware that alows to parse in forms
app.use(bodyParser.urlencoded({extended: false}))

// mount the app routes
app.use(indexRoutes)
app.use('/movies', moviesRoutes)

// error handler
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Error'
    });
});

// Connect to mongodb
mongoConnect(()=>{
    console.log('Ok')
})

module.exports = app;


