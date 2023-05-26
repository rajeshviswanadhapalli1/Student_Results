const express = require('express');
const cors = require('cors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const users = require('./app/routes/user.routes');
const { default: mongoose } = require('mongoose');
const app = express();

// var corsoptions = {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
//     // credentials: true
// }
app.use(cors());

mongoose.connect('mongodb+srv://rajesh:E4dc7kd7pGcJrTR@cluster0.bfixr1o.mongodb.net/Students_Results')
.then(() => console.log('Database Connected'))
.catch(err => console.log('Something Went Wrong', err))

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