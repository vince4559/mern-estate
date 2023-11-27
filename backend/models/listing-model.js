const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    desc:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    regularPrice:{
        type:Number,
        required: true,
    },
    discountPrice:{
        type:Number,
        required: true,
    },
    bathroom:{
        type:Number,
        required: true,
    },
    bedroom:{
        type:Number,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    parkingSpot:{
        type:Boolean,
        required: true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    offer:{
        type:Boolean,
        required:true
    },
    imageUrl:{
        type:Array,
        required: true
    },
    userRef:{
        type:String,
        required: true
    },
},{timestamps: true})

module.exports = mongoose.model("listing", listingSchema);