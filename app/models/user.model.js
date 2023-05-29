const Joi = require('joi');

const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    fullname : {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email : {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    username : {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    password : {
        type:String,
        required:true,
        minlength:8,
        maxlength:255
    },
    otp : {
        type:Number,
        required:true
    },
    active : {
        type:Boolean,
        default:false
    }
}));

function validateUser(user){
    const schema = Joi.object({
        fullname : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(50).required().email(),
        username : Joi.string().min(4).max(20).required(),
        password : Joi.string().min(8).max(255).required(),
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser