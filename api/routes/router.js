//file handles system routing
const express = require('express');
const router = express.Router();

const chat = require('../models/chatModel');
const eventsModel = require('../models/eventsModel');

router.get('/history',(req,res,next)=>{
    //route calls static chatModel method, which only takes a call back as input
    const chats =chat.findAllChats((err,result)=>{
        if(err){
            return err
        }
        return result
    }).then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(400).json({err})
        throw err;
})
})

router.post('/roomHistory',(req, res, next)=>{
    const roomName = req.body.roomName
    chat.findByRoom(roomName,(err, result)=>{
        if(err){
            return err;
        }
        return result
    }).then((result)=>res.status(200).json(result))
        .catch((err)=>{
            res.status(400).json({error:err})
            throw err;
        })
})

router.get('/eventsLog',(req,res)=>{
    eventsModel.getAll(function(err,result){
        if(err){
            console.log(err)
            return err
        }
        return result
    }).then((result)=>{
          res.status(200).json({result})   
         })
      .catch((err)=>{
          res.status(400).json(result)
      })
})

router.get("/me",(req, res)=>{
    const chats = chat.find((error, result)=>{
        if(error){
            console.log(error)
        }
    }).where("roomName","main")
      .then(result=>{
          return res.json(result)
      })
      .catch(error=>res.json({data:"error"}))

      
})

router.all("*",function(req, res){
    return res.status(404).json({
        data:"route not found"
    })
})

module.exports = router;