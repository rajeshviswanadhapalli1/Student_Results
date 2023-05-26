const { User, validate } = require("../models/user.model");

const express = require('express');
const router = express.Router();

router.post('/', async(req,res) => {
    try {
        const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).send('Email Already Exists')
    }else{
        user = new User({
            fullname:req.body.fullname,
            email:req.body.email,
            username:req.body.email,
            password:req.body.password
        })
        await user.save();
        console.log(user,'user');
        res.status(200).send({data : user,message:'Registered SuccessFully'})
    }
    } catch (error) {
        res.status(500).send({error})
    }

})

module.exports = router;