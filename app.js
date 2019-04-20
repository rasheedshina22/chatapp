const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const path = require("path")

//routing
const router = require('./api/routes/router');

//set template engine
app.set('view engine','ejs')

// middleware
app.use(express.static(path.join('frontend/build')))
app.use(bodyParser.json())

//routes
app.get('/',(req,res,next)=>res.render('index'))
app.use('/api',router);
app.use("*",(req,res)=>{
    res.send(path.join(__dirname + 'frontend/build/index.html'))
})

module.exports = app;