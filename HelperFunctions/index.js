const events = require('../api/models/eventsModel');
const messages = require("../api/models/chatModel");
const Room = require("../api/models/roomModel")

class Helper{
  //class containers the helper methods used through out application
  static logEvent(eventName,username)
    //logs socket events
    {
      events.logEvent({
      eventType:eventName,
      User: username}, function(err){
      if(err){
          events.logEvent({
              eventType:"error",
              user:"System"
          })
      }
      })
      return;
    }
  
  static saveMessage(message,username,roomname)
  //used to save message to db
  {
      console.log(username)
      const chat = new messages({
        name:username,
        chat:message,
        roomName:roomname
      })
      chat.save((err,result)=>{
        if(err){
          return err
        }else{
          console.log(result)
          return result
        }
    })
  }

  static fetchMessagesByRoom (roomName = "main"){
    var promise = new Promise((resolve, reject)=>{
      messages.find(()=>{})
        .where("roomName",roomName)  
        .then(result=>{
            resolve(result)
          }).catch(error=>{
            reject(error)
          })
    })
   return promise.then((result)=>{
     return result
   })
  }

  static fetchAllRooms(){
    var promise = new Promise((resolve, reject)=>{
      Room.find()
        .select("roomName -_id")
        .then(result=>{
          const rooms = result.map(element=>{return element.roomName})
          resolve(rooms)
        })
        .catch(error=>{
          reject(error)
        })
    })

    return promise.then(result=>{
      return result
    })
  }
  
  static addRoom(name) {
    //called on create room event
    const room = new Room({
      roomName: name
    })
    room.save((err, result)=>{
      if(err){
        //should log error
        return err
      }
      return result
    })
  }
}


module.exports =  Helper;