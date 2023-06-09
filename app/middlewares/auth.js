const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/constants');

const verifytoken = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(token,'token');
    if(!token){
        return res.status(403).send('Token is Required for Authentication')
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log(decoded,'decoded');
        req.user = decoded;
    } catch (error) {
        return res.status(400).send('Invalid Token')
    }
    return next();
}

module.exports = verifytoken;