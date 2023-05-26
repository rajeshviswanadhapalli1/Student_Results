const { User, validate } = require("../models/user.model");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const verify = require('../middlewares/auth')
router.get('/',verify, async(req,res) => {
    try {
     
      
    let user = await User.find({});
    console.log(user,'user');
    if(user){
        return res.status(200).send({data:user,message:'Success'})
    }
    } catch (error) {
        res.status(500).send({error})
    }

})

module.exports = router;