const express = require('express');
const router = express.Router();
const {signup, signin, refreshToken, signout, googleSignIn, verifyEmail, forgetPassword, resetPassword}  = require('../controllers/auth-controller')

router.post('/api/signup', signup );
router.post('/api/signin', signin );
router.get('/api/refresh', refreshToken);
router.get('/api/signout', signout);
router.post('/api/google', googleSignIn);
router.get('/api/user/:id/verify/:token',verifyEmail );
router.post('/api/forgot-password', forgetPassword);
router.post('/api/reset-password/:id/:token', resetPassword);



module.exports =  router;