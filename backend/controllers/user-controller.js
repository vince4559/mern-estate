const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

exports.updateUser = async(req, res) => {
    const {username, email, password} = req.body;
    const {id} = req.params;
    let user;

    if(!id) return res.status(400).json({message:"user ID is required"})
      
        const hashedPwd = bcrypt.hashSync(password, 10)

        if(password){
            password = hashedPwd
        }
    try {
        user = await User.findByIdAndUpdate(id, {username, email, password});
        res.status(200).json({user})
    } catch (err) {
        console.log(err)
    }

    if(!user){
        return res.status(404).json({message:"User not updated"})
    }
};



exports.deleteUser = async(req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({message:"user ID is required"})
    let user;

    try {
        user = await User.findByIdAndDelete(id);
        res.status(200).json({message:"user deleted successfully"})
    } catch (err) {
        console.log(err)
    }

    if(!user){
        return res.status(404).json({message:"User not deleted"})
    }

}