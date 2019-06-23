const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const path = require("path")

//routing
const router = require('./api/routes/router');
const User = require('./api/models/userModel');

//set template engine
app.set('view engine','ejs')

// middleware
app.use(express.static(path.join('frontend/build')))
app.use(bodyParser.json())

//routes
app.get('/',(req,res,next)=>res.render('index'))

app.post('/',(req, res)=>{
  const {username, password} = req.body
  User.findOne({username},'username password', function(error, result){
    if(error){
      res.status(400).json({message:"authentication failed"})
    }
    if(result){
      //if user found confirm password
      password === result.password ? res.status(200).json(result) : res.status(201).json({message:"authentication failed"}) 
    }else{
      //user not found
      const user = new User({password,username})
      user.save()
        .then(result=>{
          res.status(200).json(result)
        }).catch(error=>{
          res.status(500).json({message:"something went wrong"})
        })
    }
  })
  
})

/* api routes*/
app.use('/api',router);
app.use("*",(req,res)=>{
  res.status(404).json({data:{error:"not found"}})
})

module.exports = app;