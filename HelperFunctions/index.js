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
            if(err){console.log(err)}
            })
            console.log(`socket connection established`);
            return;
        }
    
    static saveMessage(message,username,roomname)
    //used to save message to db
    {
        const message = new messages({
            name:username,
            chat:message,
            roomName:roomname
        }).save((err,result)=>{
            if(err){
                console.log(err)
            }
        }).catch((err)=>{throw err})

    }
}


module.exports =  Helper;