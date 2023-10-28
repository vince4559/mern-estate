const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheema =  new Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    refreshToken: String
})

module.exports = mongoose.model('user', userScheema);