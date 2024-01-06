const User = require('../models/user-model');
const Token = require('../models/token-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail')


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

        // send verification link after signup

        //sending userId and token to Token model
        const token = await new Token({
            userId: result._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save();

        // frontend url to send to the user email to verify email
        const url = `http://localhost:5173/user/${result._id}/verify/${token.token}`;

        const send_to = result.email;
        const sent_from = process.env.EMAIL_USER; //"dynamickubbs@outlook.com";
        const message = `
            <p>Hello ${result.username}, Verify your Email by clicking this link </p>
            <a href=${url}>Verify your email address</a>
            <p> This link expires in 1hr </p>
        `
      
        // send email to verify email
        sendEmail(sent_from, send_to, "Verify Email", message)
    
        console.log(result);
        res.status(201).send({message: "Please verify Email sent to your inbox to continue"})
    } catch (err) {
        res.status(500).json({message:`${err.message}`})
    }
};

exports.verifyEmail = async (req, res) => {
    // verify link by email
    try {
        const user = await User.findOne({_id: req.params.id}).exec();
        if(!user) return res.status(400).send({message: "invalid link"});

        const token = await Token.findOne({userId: user._id, token: req.params.token}).exec();
 
        if(!token) return res.status(400).send({message: "invalid link"});
    
        await User.updateOne({_id:user._id},{verified: true}).exec();
        await token.remove;

        res.status(200).send({message: "Email verified successfully"});

    } catch (error) {
        console.log(error)
        res.status(500).send({message: "internal server error"})
    }
}


exports.signin = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message:"email and password are required"});

      // check if user with email exist in the database
    const foundUser = await User.findOne({email}).exec();
    // console.log(foundUser)
    if(!foundUser) return res.status(401).json({message:"user does not exist"});
    // console.log(foundUser.verified)

    // resnd link if not verified
    if(!foundUser.verified){
        let token = await Token.findOne({userId: foundUser._id}).exec();
        if(!token){
            const token = await new Token({
                userId: foundUser._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save();
    
            // frontend url to send to the user email to verify email
        const url = `http://localhost:5173/user/${result._id}/verify/${token.token}`;
    
            const send_to = foundUser.email;
            const sent_from = process.env.EMAIL_USER; //"dynamickubbs@outlook.com";
            const message = `
                <p>Hello ${foundUser.username}, Verify your Email by clicking this link </p>
                <a href=${url}>Verify your email address</a>
                <p> This link expires in 1hr </p>
            `
          
            // send email to verify email
            sendEmail(sent_from, send_to, "Verify Email", message)
        
            res.status(201).send({message: "Please verify email sent to your inbox"})
        }
    }

    // check if password is matches
    const pwdMatch = bcrypt.compareSync(password, foundUser.password)
    // if(!pwdMatch) return res.status(401).json({message:"wrong incredentials... check email | password"});
    
    // create jwt 
   if(pwdMatch && foundUser.verified ){
    const roles = Object.values(foundUser.roles);
    const user = foundUser.username;
    const _id = foundUser._id;
    // console.log(id)
    const accessToken = jwt.sign(
        {
           "userInfo":{
            "username":foundUser.username,
            "email":foundUser.email,
            "roles":roles,
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
    res.json({accessToken, user, roles, _id})
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
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result)

    res.clearCookie('jwt', {httpOnly:true, sameSite:'none', secure:true});
    res.sendStatus(204)
};


// sign in using google
exports.googleSignIn = async (req, res) => {
    try {
        // check if email exist
        const user = await User.findOne({email: req.body.email}).exec();

        if(user){
            const token = jwt.sign({id:user._id}, process.env.ACCESS_TOKEN);
            const {password: pass, ...rest} = user._doc;
            // const data = newUser._doc;
            res.cookie('jwt', token, {httpOnly: true, sameSite:'none', secure:true})
                .status(200)
                .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const refreshToken = jwt.sign(
                {"username":req.body.username},
                process.env.REFRESH_TOKEN, {expiresIn: "1d"}
            );
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                refreshToken
            });

            
            await newUser.save();

            const roles = Object.values(newUser.roles);
            const token = jwt.sign({id: newUser._id, roles:roles}, process.env.ACCESS_TOKEN);
            const {password: pass, ...rest} = newUser._doc;
            // const data = newUser._doc;
            res.cookie('jwt', token, {httpOnly: true, sameSite:'none', secure:true})
               .status(200).json(rest)
        }
    } catch (error) {
        console.log(error)
    }
}
