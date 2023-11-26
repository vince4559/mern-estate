const express = require('express');
const router = express.Router();
const {updateUser, deleteUser, getUserById} = require('../controllers/user-controller')


  
  
router.put('/api/updateuser/:id', updateUser);
router.get('/api/getUserById/:id', getUserById);
router.delete('/api/deleteuser/:id', deleteUser);


module.exports = router;