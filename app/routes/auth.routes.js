const { User } = require("../models/user.model");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { JWT_SECRET } = require("../constants/constants");


router.post('/', async(req,res) => {
    console.log(req.body,JWT_SECRET,'req.body');
    try {
        const {error} = validateUser(req.body);
      
        // console.log(error,'error');
        if(error){
            res.status(400).send(error.details[0].message)
        }
        let user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send('Incorrect Email or Password')
        }
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(400).send('Incorrect Email or Password')
        }
        const token = jwt.sign({_id:user._id,exp: Math.floor(Date.now() / 1000) + 60}, JWT_SECRET);
        res.send({token:token,status:'Success',message:'Login SuccessFully'})
    } catch (error) {
        res.status(500).send({error})
    }

})

function validateUser(user){
    const schema = Joi.object({
        email : Joi.string().min(5).max(50).required().email(),
        password : Joi.string().min(8).max(255).required(),
    });
    return schema.validate(user);
}
// function vali(req){
//     const schema = {
//         email : Joi.string().min(5).max(50).required().email(),
//         password : Joi.string().min(8).max(255).required()
//     }
//     return schema.validate(req)
// }
module.exports = router;