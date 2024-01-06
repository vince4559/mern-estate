const express = require('express');
const router = express.Router();
const {signup, signin, refreshToken, signout, googleSignIn, verifyEmail}  = require('../controllers/auth-controller')

router.post('/api/signup', signup );
router.post('/api/signin', signin );
router.get('/api/refresh', refreshToken);
router.get('/api/signout', signout);
router.post('/api/google', googleSignIn);
router.get('/api/user/:id/verify/:token',verifyEmail );



module.exports =  router;