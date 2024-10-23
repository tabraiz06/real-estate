const express = require('express')
const userRoutes = require('../backend/routes/user')
const propertyRoutes = require('../backend/routes/property')
const path = require('path');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(propertyRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 8080;

app.get('/hello-server',(req,res)=>{
    res.send("hello from server")
});
    
const DB_URL = process.env.DB_URL


mongoose.connect(DB_URL).then(successful=>{
    console.log("connected to db")
}).catch(err=>
    console.log("failed connection",err)
)



app.listen(PORT, ()=>{
    console.log(`server is up on port : ${PORT}`)
})
