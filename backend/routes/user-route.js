const express = require('express');
const router = express.Router();
const {updateUser, deleteUser, getUserById, getUserListings} = require('../controllers/user-controller')


  
  
router.put('/api/updateuser/:id', updateUser);
router.get('/api/getUserById/:id', getUserById);
router.delete('/api/deleteuser/:id', deleteUser);
router.get('/api/userlisting/:id', getUserListings);


module.exports = router;