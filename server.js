const express = require('express');
const cors = require('cors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const users = require('./app/routes/user.routes');
const verify = require('./app/routes/otp.routes');
const allusers = require('./app/routes/users.routes')
const auth = require('./app/routes/auth.routes')
const { default: mongoose } = require('mongoose');
const config = require('config');
const { SERVER_DB_URI } = require('./app/constants/constants');

// const verifyEmail = require('./app/routes/user.routes');



const app = express();

if(!config){
    console.log('FATAL ERROr : Private Key is not Defiened')
    process.exit(1)
}
// var corsoptions = {
//     origin: 'http://localhost:3000',
//     // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
//     // allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
//     // credentials: true
// }
app.use(cors());
console.log(SERVER_DB_URI,'SERVER_DB_URI');
mongoose.connect(SERVER_DB_URI)
.then(() => console.log('Database Connected'))
.catch(err => console.log('Something Went Wrong', err))

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.json({message:"Welcome To Students Results"});
})
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/allusers',allusers);
app.use('/api/otpverify',verify)

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`Server is Running on Port ${PORT}`)
})