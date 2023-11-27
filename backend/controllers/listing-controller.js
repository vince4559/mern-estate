const listingModel = require('../models/listing-model')

exports.createListing = async(req, res) => {
    let listing ;
    try {
        listing = await listingModel.create(req.body);
    } catch (err) {
        console.log(err)
    };

    if(!listing){
        res.status(404).json({message:"listing cannot be created"})
    }
    res.status(200).json(listing);
}