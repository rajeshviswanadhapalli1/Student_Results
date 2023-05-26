const { User, validate } = require("../models/user.model");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash')

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
        user = new User(_.pick(req.body,["fullname","email","username","password"]))
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
        await user.save();
        console.log(user,'user');
        res.status(200).send({data : _.pick(user,['_id','fullname',"email","username","password"]),message:'Registered SuccessFully',status:'Success'})
    }
    } catch (error) {
        res.status(500).send({error})
    }

})

module.exports = router;