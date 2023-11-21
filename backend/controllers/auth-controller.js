const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


 exports.signup = async(req, res) => {
    const {username, email, password} = req.body;
    if(!email || !password || !username){
        return res.status(400).json({message:"all credentials are required"})
    };

    // check for duplicated data in database 
    const existingEmail = await User.findOne({email}).exec();
    const existingUsername = await User.findOne({username}).exec();

    if(existingEmail){
        return res.status(409).json({message:"email already exist.. try new email"})
    }else if(existingUsername){
        return res.status(409).json({message:"username already exist.. try new username"})
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
        res.status(201).json({message: "user created successfully"})
    } catch (err) {
        res.status(500).json({message:`${err.message}`})
    }
};


exports.signin = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message:"email and password are required"});

      // check if user with email exist in the database
    const foundUser = await User.findOne({email}).exec();
    // console.log(foundUser)
    if(!foundUser) return res.status(401).json({message:"user does not exist"});

    
    // check if password is matches
    const pwdMatch = bcrypt.compareSync(password, foundUser.password)
    // if(!pwdMatch) return res.status(401).json({message:"wrong incredentials... check email | password"});
    
    // create jwt 
   if(pwdMatch){
    const roles = Object.values(foundUser.roles);
    const user = foundUser.username;
    // console.log(user)
    const accessToken = jwt.sign(
        {
           "userInfo":{
            "username":foundUser.username,
            "email":foundUser.email,
            "roles":roles
           } 
        },
        process.env.ACCESS_TOKEN, {expiresIn: '30s'}
    );

    const refreshToken = jwt.sign(
        {"username":foundUser.username},
        process.env.REFRESH_TOKEN, {expiresIn: "1d"}
    );

    // saving refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result =  await foundUser.save();
    console.log(result)
    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'none', secure:true, maxAge:24*60*60*1000});
    res.json({accessToken, user, roles})
   }else{
    return res.status(401).json({message:"wrong incredentials... check email | password"})
   }

};



exports.refreshToken = async(req, res,) => {
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;
    if(!refreshToken) return res.sendStatus(401);

    console.log(refreshToken);

    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403); //forbiden
    console.log(foundUser)

    //evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if(err || foundUser.username !== decoded.username)return res.sendStatus(403);

        const roles = Object.values(foundUser.roles);

        const accessToken = jwt.sign(
            {
            "userInfo":{
                "username": decoded.username,
                "email": decoded.email,
                "roles":roles
                }
            },
            process.env.ACCESS_TOKEN, {expiresIn:'30s'}
        );
            res.json({accessToken})
    } )

};



exports.signout = async(req, res) => {
    // delete cookies from client
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;
    if(!refreshToken) return res.sendStatus(204); //no content

    // check if refreshtoken is in db
    const foundUser = await User.findOne({refreshToken}).exec();

    if(!foundUser){
        res.clearCookie('jwt', {httpOnly:true, sameSite:'none', secure:true});
        res.sendStatus(204); 
    };

    // delete refreshtoken in db
    foundUser.refreshToken = ' ';
    const result = await foundUser.save();
    console.log(result)

    res.clearCookie('jwt', {httpOnly:true, sameSite:'none', secure:true});
    res.sendStatus(204)
}
