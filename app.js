const express = require('express');
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser')
const path = require("path")

//routing
app.use(cors({ origin:"http://localhost:3000" }))
const router = require('./api/routes/router');
const User = require('./api/models/userModel');

//set template engine
app.set('view engine','ejs')

// middleware
app.use(express.static(path.join('frontend/build')))
app.use(bodyParser.json())

//routes
app.get('/',(req,res,next)=>res.render('index'))

app.post('/login',(req, res)=>{
  // handles the login logic
  const {username, password} = req.body
  User.findOne({username},'username password', function(error, result){
    if(error){
      res.status(500).json({message:"authentication failed"})
    }
    if(result){
      /*if result found verify password 
      * status 200 on success and 201 on incorrect password
      ***/
      password === result.password ? res.status(200).json(result) : res.status(201).json({message:"authentication failed"}) 
    }
    else{
      //user not found
      return res.status(202).json({message:"user not found"})
    //   const user = new User({password,username})
    //   user.save()
    //     .then(result=>{
    //       res.status(200).json(result)
    //     }).catch(error=>{
    //       res.status(500).json({message:"something went wrong"})
    //     })
    }
  })
})

app.post('/signup',(req, res)=>{
  // handles the login logic
  const {username, password} = req.body
  User.findOne({username}, function(error, result){
    if(error){
      res.status(500).json({message:"authentication failed"})
    }
    if(result){
      console.log(result)
      res.status(201).json({message:"User exists"})
    }
    else{
      const user = new User({password,username})
      user.save()
        .then(result=>{
          res.status(200).json(result)
        }).catch(error=>{
          console.log(error)
          res.status(500).json({message:"Oops, Something went wrong"})
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