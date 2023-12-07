const express = require("express");
const { createListing } = require("../controllers/listing-controller");
const multer = require('multer');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});


router.post("/api/createlisting", upload.array('photos'), createListing);

module.exports = router