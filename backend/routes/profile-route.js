const express = require('express');
const router = express.Router();
const {createProfile} = require('../controllers/profile-controller')

const multer = require('multer')


const upload = multer({
    storage: multer.memoryStorage(),
});

  
router.post("/profile",  upload.array("imgURL"), createProfile);


module.exports = router;