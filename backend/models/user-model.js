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
    verified:{
        type:Boolean, 
        default: false
    },
    roles:{
        User:{
            type:Number,
            default:201
        },
        Admin:Number
    },
    refreshToken: String
},{timestamps: true})

module.exports = mongoose.model('user', userScheema);