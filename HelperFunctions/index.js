const events = require('../api/models/eventsModel');
const messages = require("../api/models/chatModel");

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
    const m = new messages({
      name:username,
      chat:message,
      roomName:roomname
    })
    m.save((err,result)=>{
      if(err){
        console.log(err)
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
  
}


module.exports =  Helper;