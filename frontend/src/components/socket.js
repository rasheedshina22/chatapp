import openSocket from 'socket.io-client';

class io {
    constructor(){
        this.socket = openSocket.connect("localhost:3030")
        this.socket.on("connect",()=>console.log("connected"))
        this.socket.on("new_message",()=>{
            console.log("server sent message")
        })
    }

    sendMessage(msg){
        this.socket.emit("new_message",{message:msg})
    }


}

export default io;
