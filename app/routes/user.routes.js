const { User, validate } = require("../models/user.model");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../constants/constants");
const { generateOTP } = require("../services/OTP");
const { sendEmail } = require("../services/MAIL");


router.post('/', async(req,res) => {
    try {
        const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).send({message:'Email Already Exists',status:'Failure'})
    }else{
        const otpGenerated = generateOTP();
        // user = new User(_.pick(req.body,["fullname","email","username","password","otp"]))
        user = new User({
            email:req.body.email,
            password:req.body.password,
            fullname : req.body.fullname,
            username:req.body.username,
            otp:otpGenerated
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
       
        await user.save();
        console.log(user,'user');
        try {
            await sendEmail({to:req.body.email,OTP:otpGenerated})
            // const token = jwt.sign({_id:user._id,exp: Math.floor(Date.now() / 1000) + 60}, JWT_SECRET);
            res.status(200).send({status:'Success',message:'OTP Sent To Your Email'})
        } catch (error) {
            res.status(400).send({error})
        }
       
        // res.status(200).send({data : _.pick(user,['_id','fullname',"email","username","password"]),message:'Registered SuccessFully',status:'Success'})
    }
    } catch (error) {
        res.status(500).send({error})
    }

})

// const verify = router.post('/',verifyEmail)

module.exports = router;

// module.exports = verify;