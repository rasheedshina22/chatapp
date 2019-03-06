const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const events = new Schema({
    type:String,
    date:{type:Date, default: Date.now()},
    User:String
})

events.methods.
module.exports = mongoose('Events',events)