const app = require('./app')
const http = require('http');
const server = http.createServer(app)

//helper functions
const Helper = require('./HelperFunctions')

//mongoose implementation
const mongoose = require('mongoose')
mongoose.connect('mongodb://admin:securepassword1@ds225010.mlab.com:25010/whatsapp-v2',
  {useNewUrlParser:true},
  (error, success)=>{
    if(error){
      Helper.logEvent("mongooseError","mongoDb")
    }
})
;

//socket.io implementation
const io = require('socket.io').listen(server);
//list of users currently logged in
let users ={} ;
let roomList =[]

let count = 0;

//listen on every connection
io.on('connection',(socket)=>{
  /***
   * commenting out logging 
   * Helper.logEvent('connection','System')
   */
  
  //initializing socket properties
  socket.username = null
  socket.on("username",(data)=>{
    socket.username = data.username
  })
  socket.room = 'main';
  count++;
  const getMessages =async (roomName)=>{
   return await Helper.fetchMessagesByRoom(roomName)
  }
  const getRooms = async ()=>{
    return await Helper.fetchAllRooms()
  }

  getRooms().then(result=>{
    roomList= result
  })
  getMessages().then((result)=>{
    //user first assigned to room 1
    socket.join(socket.room,()=>{
      socket.emit("roomChange")
  })
    socket.emit("initialize",{currentRoom:socket.room,username:socket.username, rooms:roomList, messages: result})
  })

  socket.on("createRoom",(data)=>{
    //user creates new room event
    roomList.push(data.roomName)
    Helper.addRoom(data.roomName)
    io.sockets.emit("createRoom",{rooms:roomList})
  })

  socket.on("switchRoom",(data)=>{
    //changing between rooms
    const roomName = data.roomName
    socket.room = roomName
    socket.leaveAll()
    socket.join(socket.room,()=>{
      getMessages(roomName).then(result=>{
        socket.emit("switchRoom",{roomName:socket.room, messages: result})
      })
    })
  })

  //each socket object represents a client instance
  socket.on('change_username',(data)=>{
    socket.username = data.username;
  })
  //listening on new message
  socket.on("new_message",(data)=>{
    //broadcasting the message. io.sockets is an object of all sockets
    //Helper.saveMessage saves to db
    Helper.saveMessage(data.message,socket.username,socket.room)
    io.sockets.in(socket.room).emit("new_message",{ chat:data.message, name:socket.username,date: new Date()})
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



