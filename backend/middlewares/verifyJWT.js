const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    console.log(authHeader); //bearer token
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403); //invalid token
        req.username = decoded.userInfo.username;
        req.mail = decoded.userInfo.mail;
        req.roles = decoded.userInfo.roles;
        next();
    })
}

module.exports = verifyJWT;