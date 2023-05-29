const { User, validate } = require("../models/user.model");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../constants/constants");
const { generateOTP } = require("../services/OTP");
const { sendEmail } = require("../services/MAIL");
// findByIDAndUpdate

router.post('/', async(req,res) => {
    console.log(req,'verifyuser');

    const {email,otp} = req.body;
    const user = await validateUserSignup(email,otp,res);
    if(user){
        const token = jwt.sign({_id:user._id,exp: Math.floor(Date.now() / 1000) + 60}, JWT_SECRET);
        res.status(200).send({token:token,status:'Success',message:'User Verified SuccessFully'})
    }  
})

const validateUserSignup = async(email,otp,res) => {
    console.log(email,'email');
    const user = await User.findOne({email})
    console.log(user,'useruser');
    if(!user){
        res.status(400).send({message:'User Not Found',status:'Failure'})
    }
    else if(user && user.otp !== otp){
        res.status(400).send({message:'Invalid OTP',status:'Failure'})
    }else{
        const updatedUser = await User.findByIdAndUpdate(user._id,{
            $set : {active:true}
        })
        return updatedUser;
    }
   
}

module.exports = router;