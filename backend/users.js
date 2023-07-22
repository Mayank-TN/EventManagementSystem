const mongoose = require('./mongodb')

const UserSchema = mongoose.Schema({
    id : Number,

    email : {
        type : String ,
        required : true
    },
    eventId : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('users' , UserSchema )