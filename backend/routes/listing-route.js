const express = require("express");
const { createListing, getListingById, deleteListingById, updateListingById, getListings } = require("../controllers/listing-controller");
const multer = require('multer');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});


router.post("/api/createlisting", upload.array('photos'), createListing);
router.get('/api/listing/:id', getListingById);
router.put('/api/updatelisting/:id', updateListingById)
router.delete('/api/deletelisting/:id', deleteListingById);
router.get('/api/getlistings', getListings);

module.exports = router