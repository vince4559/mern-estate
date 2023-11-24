const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileScheema =  new Schema({
    username:{
        type:String,
        required: true,
    },
    imgURL:{
        type:Array,
        required: true,
    }
})

module.exports = mongoose.model('profile', profileScheema);