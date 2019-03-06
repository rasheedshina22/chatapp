const express = require('express');
const app = express()
const bodyParser = require('body-parser')
//routing
const router = require('./api/routes/router');

//set template engine
app.set('view engine','ejs')

// middleware
app.use(express.static('public'))
app.use(bodyParser.json())

//routes
app.get('/',(req,res,next)=>res.render('index'))
app.use('/api',router);

module.exports = app;