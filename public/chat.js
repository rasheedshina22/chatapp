$(function(){
    //creating a connection
//  var socket = io.connect('https://whatsapp-v2.herokuapp.com/')


var socket = io.connect('http://localhost:3000');
 //buttons and input handles
var message = $("#message")
var username =$("#username")
var send_message =$("#send_message")
var send_username =$("#send_username")
var chatroom =$("#chatroom")    //display
var feedback = $("#feedback")   //typing feedback
var room = $("#select") //room select tag
var count = $("#count")  //current users

username.val("default")

socket.emit("newUser",{firstName:"creig",password:'abcd'});

socket.on("userCreated",(data)=>{
    feedback.innerHTML(`${data.firstName} added to group`)
})

socket.on('newUser',(data)=>{
    feedback.innerHTML(`${data.firstName} you are now in the group` )
});

socket.on("incomingMessage",(data)=>{
    chatroom.append(`<p> ${data.text}</p>`)
})

// change username event
send_username.click(()=>{
    socket.emit("change_username",{username:username.val()})
});

//change room
room.change(()=>{
    const roomName = room.val()
    socket.emit('joinRoom',roomName)
});

socket.on("initialize",(data)=>{
    count.html(`Active Users: ${data.countValue}`)
    username.val(data.usernameValue);
});
//clear screen


//send message event
send_message.click(()=>{
    socket.emit("message",{text:message.val(),sender:"senderName",receiver:username.val()})
})

//get new message
socket.on("new_message",(data)=>{
    console.log("return of message")
    chatroom.append(`<p class='message'> @${data.username} : ${data.message} </p>`)
})

//typing event emitter
message.bind("keypress",()=>{
    socket.emit("typing");
})

socket.on("typing",(data)=>{
    feedback.html(`<p><i> ${data.username} is typing ... </i></p>`)
})

//
socket.on("joinRoom",(data)=>{
    chatroom.html("")
    feedback.html(`<p><i>${data.username} just joined room</i></p>`)
    setTimeout(()=>{
        feedback.html('')
    },5000)
})

message.focusout(()=>{
    setTimeout(()=>{
        socket.emit("keyup") 
    },5000)
       //cancel on type event
})

socket.on("keyup",()=>{
    feedback.html('')   //clear on typing 
})
});
