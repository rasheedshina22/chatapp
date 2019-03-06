//file handles system routing
const express = require('express');
const router = express.Router();

const chat = require('../models/chatModel')
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
    }).then((result)=>res.status(400).json(result))
        .catch((err)=>{
            res.status(400).json({error:err})
            throw err;
        })
})

router.post('/',(req,res,next)=>{
    const chats = new chat({
        name:req.body.name,
        chat:req.body.chat,
        roomName:req.body.roomName
    });
    chats.save((err,result)=>{
        if(err){
            res.status(500).json({err})
        }
        console.log('we are here')
        res.status(200).json({result})
    })
})




module.exports = router;