const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventsModel = new Schema({
    eventType:String,
    date:{type:String, default: new Date()},
    User:String
})

EventsModel.statics.logEvent = function(val,cb){
    const eventObj = new this(val);
    eventObj.save(cb)
        
}

EventsModel.statics.getAll = function(cb){
    return this.find(cb)
}

module.exports = mongoose.model('Events',EventsModel)