const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
  name:{
    type: String,
    required:true
  },
  chat:String,
  date:{
    type: Date,
    default: new Date()
  },
  roomName:String
})

Chat.statics.findAllChats = function(cb){
  return this.find(cb)
}

Chat.statics.findByRoom = function(roomName, cb){
  return this.find(cb)
        .where('roomName',roomName)
}

module.exports= mongoose.model("Chats",Chat)