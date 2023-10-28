const express = require('express');
const router = express.Router();
const {signup, signin, refreshToken, signout}  = require('../controllers/auth-controller')

router.post('/api/signup', signup );
router.post('/api/signin', signin );
router.get('/api/refresh', refreshToken);
router.get('/api/signout', signout)


module.exports =  router;