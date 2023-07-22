const db = require('./mongodb');

const eventSchema = new db.Schema({
    id : {
        type : Number,
       // required : true
    },
    eventName : {
        type: String,
        required: true,
        minLength : [ 3 , "Name should have minimum 3 characters"]
    },
    location : {
        type: String,
        required: true
    },
    maximumParticipantsAllowed : {
        type: Number,
        required: true
    },
    activeParticipants : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    datetime : {
        type : String,
        required : true
    }
})

module.exports = db.model('events' , eventSchema);