const express = require('express');
const router = express.Router();
const {signup, signin, refreshToken}  = require('../controllers/auth-controller')

router.post('/api/signup', signup );
router.post('/api/signin', signin );
router.get('/api/refresh', refreshToken);


module.exports =  router;