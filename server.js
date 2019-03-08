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
let count = 0

//listen on every connection
io.on('connection',(socket)=>{
    //system log
    Helper.logEvent('connection','System')
    
    //initializing socket properties
    socket.username = 'Annonymous'+ Math.floor(Math.random()*100);
    socket.room = 'r1';
    
    count++;

    socket.emit("initialize",{countValue:count,usernameValue:socket.username})

    //user first assigned to room 1
    socket.join(socket.room,()=>{
        socket.emit("roomChange")
    })

    //each socket object represents a client instance
    socket.on('change_username',(data)=>{
        socket.username = data.username;
    })
    //listening on new message
    socket.on("new_message",(data)=>{
        //broadcasting the message. io.sockets is an object of all sockets
        
        io.sockets.in(socket.room).emit("new_message",{message:data.message,username:socket.username})
        // io.sockets.emit("new_message",{message:data.message, username:socket.username})
    })

    //join a room
    socket.on('joinRoom',(roomName)=>{
        socket.room = roomName;
        io.sockets.in(socket.room).emit("joinRoom",socket.username)
        console.log(`Room changed to ${roomName}`)
        socket.join(roomName);
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
const port = (process.env.PORT|| 3000);

server.listen(port,()=>{
    console.log(`now listening on port ${port}`);
});



