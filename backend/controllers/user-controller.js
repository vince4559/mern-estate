const userModel = require('../models/user-model')
const bcrypt = require('bcryptjs')



exports.updateUser = async(req, res) => {
    const {id} = req.params;
    let user;

    if(!id) return res.status(400).json({message:"user ID is required"})

        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
    try {
        user = await userModel.findByIdAndUpdate(id, {$set:req.body}, {new:true});
        res.status(200).json(user)
        console.log("User updated succesfully")
    } catch (err) {
        console.log(err);
    }

    if(!user){
        return res.status(404).json({message:"User not updated"})
    }
};

exports.getUserById = async (req, res) => {
    const {id} = req.params;
    let user;

    try {
        user = await userModel.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    };
    
    if(!user) return res.status(404).json({message:"user not found"})
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