const express = require('express');
const cors = require('cors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const users = require('./app/routes/user.routes');
const { default: mongoose } = require('mongoose');
const app = express();

var corsoptions = {
    origin:"https://studentsresults.onrender.com"
}

mongoose.connect('mongodb+srv://rajesh:E4dc7kd7pGcJrTR@cluster0.bfixr1o.mongodb.net/Students_Results')
.then(() => console.log('Database Connected'))
.catch(err => console.log('Something Went Wrong', err))
app.use(cors(corsoptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.json({message:"Welcome To Students Results"});
})
app.use('/api/users',users)

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`Server is Running on Port ${PORT}`)
})