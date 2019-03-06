const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const events = new Schema({
    type:String,
    date:{type:Date, default: Date.now()},
    User:String
})

events.statics.saveEvent = function(event,cb){
    
}
events.methods.
module.exports = mongoose('Events',events)