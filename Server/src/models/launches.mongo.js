const mongoose = require('mongoose');

//Defining Schema
const launchesSchema = new mongoose.Schema({
    flightNumber:{
        type:Number,
        required:true,
    },
    launchDate:{
        type:Date,
        required:true,
    },
    mission:{
        type:String,
        required:true,
    },
    rocket:{
        type:String,
        required:true,
    },
    target:{
        type:mongoose.ObjectId,
        ref:'Planet'
    },
    upcoming:{
        type:Boolean,
        required:true,
    },
    customer:[ String ],
    success:{
        type:Boolean,
        required:true,
        default:true,
    },
});

module.exports = mongoose.model('Launch',launchesSchema);