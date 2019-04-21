const app = require('./app')
const http = require('http');
const server = http.createServer(app)

//mongoose implementation
const mongoose = require('mongoose')
mongoose.connect('mongodb://admin:securepassword1@ds225010.mlab.com:25010/whatsapp-v2',{useNewUrlParser:true})
    .catch((err)=>{throw err})
;

//helper functions
const Helper = require('./HelperFunctions')

//socket.io implementation
const io = require('socket.io').listen(server);
//list of users currently logged in
const users ={} ;
let roomList =["main"]

let count = 0;

//listen on every connection
io.on('connection',(socket)=>{
    //system log
    Helper.logEvent('connection','System')
    
    //initializing socket properties
    socket.username = 'Annonymous'+ Math.floor(Math.random()*100);
    socket.room = 'main';
    let socketRoom = 'main'
    count++;

    socket.emit("initialize",{countValue:count,usernameValue:socket.username, rooms:roomList})

    //user first assigned to room 1
    socket.join(socket.room,()=>{
        socket.emit("roomChange")
    })

    socket.on("createRoom",(data)=>{
        //user creates new room event
        roomList.push(data.roomName)
        io.sockets.emit("createRoom",{rooms:roomList})
    })

    socket.on("switchRoom",(data)=>{
        //changing between rooms
        console.log("room switched to ", data.roomName)
        const roomName = data.roomName
        socket.room = roomName
        socket.join(socket.room,()=>{
            console.log(roomName)
            socket.emit("switchRoom",{roomName:roomName})
        })
    })

    //each socket object represents a client instance
    socket.on('change_username',(data)=>{
        socket.username = data.username;
    })
    //listening on new message
    socket.on("new_message",(data)=>{
        console.log("new message received by server")
        //broadcasting the message. io.sockets is an object of all sockets
        //Helper.saveMessage saves to db
        //Helper.saveMessage(data.message,socket.username,socket.room)
        io.sockets.in(socket.room).emit("new_message",{message:data.message,username:socket.username})
        // io.sockets.emit("new_message",{message:data.message, username:socket.username})
    })

    //join a room
    socket.on('private',(data)=>{
        socket.UserId = data.userId;
        io.sockets.in(socket.userId).emit("joinRoom",{msg:data.msg,userId:data.userId})
        //console.log(`Room changed to ${roomName}`);
        socket.join(data.userId);
    })

    //listening on typing event
    socket.on("typing",(data)=>{
        io.sockets.to(socket.room).emit("typing",{username:socket.username})
    })

    socket.on("keyup",()=>{
        io.sockets.to(socket.room).emit("keyup")
    })
    socket.on('disconnect',(data)=>{
        Helper.logEvent('disconnect',socket.username)
    })  
    socket.on('disconnecting',(data)=>{
        count--;    //reduce count
        io.sockets.emit("count",count)
        Helper.logEvent('disconnecting',socket.username)
    })

})

//establishing the port
const port = (process.env.PORT|| 3030);

server.listen(port,()=>{
    console.log(`now listening on port ${port}`);
});



