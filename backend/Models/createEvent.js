const mongoose = require('mongoose');

const createEvent = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    eventLink:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    eligibility:{
        type:String,
        required:true
    }
})

const CreateEvent = mongoose.model('createEvent',createEvent);
module.exports = CreateEvent;