const listingModel = require('../models/listing-model');
const {uploadImage }= require('../firebase/uploadImage');

exports.createListing = async(req, res) => {
    let listing ;
    const files = req.files;
    console.log(`Hello ${files}`)
    try {
        const urls = await Promise.all(files.map(uploadImage));

        console.log({urls});

        listing = await listingModel.create({...req.body, photos:urls });
    } catch (err) {
        console.log(err)
    };

    if(!listing){
        res.status(404).json({message:"listing cannot be created"})
    }
    res.status(200).json(listing);
}