const User = require('../models/user-model');
const bcrypt = require('bcryptjs')

 exports.signup = async(req, res) => {
    const {username, email, password} = req.body;
    if(!email || password ||username){
        return res.status(400).json({message:"email and password are required"})
    };

    // check for duplicated data in database 
    const duplicatedEmail = User.findOne(email).exec();
    const duplicatedUsername = User.findOne(email).exec();

    if(duplicatedEmail){
        return res.status(409).json({message:"email already existed"})
    }else if(duplicatedUsername){
        return res.status(409).json({message:"username already existed"})
    };


    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10)
    
    // save data to database

    try {
        const result = await User.create({
            username,
            email,
            password: hashedPwd
        });
    
        console.log(result);
    } catch (err) {
        res.status(500).json({message:`${err.message}`})
    }
};



exports.refreshToken = (req, res,) => {

}