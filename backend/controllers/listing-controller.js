const listingModel = require('../models/listing-model');
const {uploadImage }= require('../firebase/uploadImage');

exports.createListing = async(req, res) => {
    let listing ;
    const files = req.files;
    
    if(!files) return res.status(404).json({message:"files must be provided"})
    try {
        const urls = await Promise.all(files.map(uploadImage));

        // console.log({urls});
        const url = [...urls].map(file =>file)
        // console.log(`url:${url}`)

        listing = await listingModel.create({...req.body, photos:url});
    } catch (err) {
        console.log(err)
    };

    if(!listing){
        res.status(404).json({message:"listing cannot be created"})
    }
    res.status(200).json(listing);
};

exports.getListingById = async(req, res) => {
    const id = req.params.id;
    if(!id)return res.send('id is required')
    let listing;
    try {
        listing = await listingModel.findById(id);
    } catch (error) {
        console.log(error);
    }

    if(!listing){
        return res.status(404).json({message:'listing not found'});
    }
    return res.status(200).json({listing})
};

exports.deleteListingById = async(req, res) => {
    let listing;
    const id = req.params.id;

    if(!id) return res.status(404).json({message: 'listing id is required'});

    try {
        listing = await listingModel.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }

    if(!listing){
        return res.status(404).json({message: 'listing not deleted'})
    }
    return res.status(200).json({message: 'listing deleted'})
};

exports.updateListingById = async(req, res) => {
    let listing;
    const id = req.params.id;
    // listing = listingModel.findById(id);

    if(!id) return res.status(404).json({message:'listing id is required'});

    try {
        listing = await listingModel.findByIdAndUpdate(id, {$set:req.body}, {new:true}); 
        res.status(200).json(listing)
    } catch (error) {
        console.log(error)
        if(!listing) return res.status(404).json({message:'cannot find listing'})
    }

}