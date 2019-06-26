// this is the model for the list of rooms
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const room = new Schema({
    roomName: String,
    created: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model("Rooms",room)