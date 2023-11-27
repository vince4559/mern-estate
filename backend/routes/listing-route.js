const express = require("express");
const { createListing } = require("../controllers/listing-controller");
const router = express.Router();

router.post("/api/createlisting", createListing);

module.exports = router