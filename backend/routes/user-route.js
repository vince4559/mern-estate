const express = require('express');
const router = express.Router();
const {updateUser, deleteUser} = require('../controllers/user-controller')


  
  
router.put('/api/updateuser/:id', updateUser);
router.delete('/api/deleteuser/:id', deleteUser);


module.exports = router;