const express = require('express');
const cors = require('cors');

const app = express();

var corsoptions = {
    origin:"http://localhost:8081"
}

app.use(cors(corsoptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.json({message:"Welcome To Students Results"});
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`Server is Running on Port ${PORT}`)
})