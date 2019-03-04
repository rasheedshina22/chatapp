$(function(){
    //creating a connection
 var socket = io.connect('http://localhost:3000')
 
 //buttons and input handles
 var message = $("#message")
var username =$("#username")
var send_message =$("#send_message") 
var send_username =$("#send_username")
var chatroom =$("#chatroom")
var feedback = $("#feedback")
var test = $("#test")

// change username event
send_username.click(()=>{
    console.log(username.val());
    socket.emit("change_username",{username:username.val()})
})


//send message event
send_message.click(()=>{
    socket.emit("new_message",{message:message.val()})
})

socket.on("test",(data)=>{
    test.append(`<p>${data.test}</p>`)
})
//get new message
socket.on("new_message",(data)=>{
    test.append("<p>data</p>")
    chatroom.append(`<p class='message'> @${data.username} : ${data.message} </p>`)
})

socket.on('test',(data)=>{
    test.append(`<p> data = ${data.test}</p>`)
})

//typing event emitter
message.bind("keypress",()=>{
    socket.emit("typing");
})

socket.on("typing",(data)=>{
    feedback.html(`<p><i> ${data.username} is typing ... </i></p>`)
})
});