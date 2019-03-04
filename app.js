const express = require('express');
const app = express()

//routing
const router = require('./api/routes/router');

//set template engine
app.set('view engine','ejs')

// middleware
app.use(express.static('public'))

//routes
app.use('/',router)
app.use('/api',router);

module.exports = app;