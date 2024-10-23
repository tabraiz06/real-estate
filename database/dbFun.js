const mongoose = require('mongoose');
const usermodel=require('./models/user');
const jwt = require('jsonwebtoken');
const idcounter=require('./models/counter')
const bcrypt = require('bcrypt')

require('dotenv').config();
const secretKey ="Mirza";

let userid=async()=>{
    let user =await idcounter.findOne();
    if (!user) {
         
    let res={ userID: 10, ppdID: 10 }
        let idcreate=await idcounter.create(res)   
        return "UGK"+idcreate.userID;
    } 
     await idcounter.updateOne({ ppdID: user.ppdID }, { $set: { userID: user.userID+1 } })
     
     let newUser="UGK"+(user.userID+1)
    return newUser
}
let PPDid=async()=>{
    let user =await idcounter.findOne();
    if (!user) {
         
    let res={ userID: 10, ppdID: 10 }
        let idcreate=await idcounter.create(res)   
        return "PPD"+idcreate.ppdID;
    } 
     await idcounter.updateOne({ userID: user.userID }, { $set: { ppdID: user.ppdID+1 } })
     
     let newPro="PPD"+(user.ppdID+1)
    return newPro
}

let tokenUser = (user) => {  
    let userEmail = user.email
    let token=jwt.sign(userEmail,secretKey);   
    return token;
}
let authUser=async(req,res,next)=>{ 
    try {
        let authHeader = req.headers.authorization; 

        // Bearer[space]tokenHere
        let token = authHeader && authHeader.split(' ')[1]
        if (!token) {
            
            return res.status(401).json({ status: "failed", message: "Token not provided" });
        }
        
        const data = jwt.verify(token, secretKey);
        

    let user =await usermodel.findOne({email: data });
    if (!user) {
        return res.status(404).json({ status: "failed", message: "User not found" });            
    } 
    req.user = user; 
    
    next() 
    } 
    catch (error) {
        return res.status(401).json({ status: "failed", message: error.message }) 
    }
}

let registerUser=async(data)=>{
    try {
        let userEmail = data.email
        let rawPassword = data.password
        let hashedPassword = await encrypt(rawPassword,10)
        
        if( await userExists(userEmail)){
            return {status:"failed",message:"User already exists, please sign in."}
        }

        data.password = hashedPassword
        let userID =await userid() 

        let user=await usermodel.create({userID:userID,...data});
        return {status:"success",data:user}
    } catch (error) {
        return {status:"failed",message:error.message}
    }
}
let loginUser=async(data)=>{

    let rawPassword = data.password

   
    try {
        let user=await usermodel.findOne({email:data.email});        
        if (!user) {
            return {status:"failed",message:"User not found"}            
        }
        
        let passwordMatches = await decrypt(user.password,rawPassword)

        if(!passwordMatches){
            return {status:"failed",message:"Password does not matches"}
        }

        let auth=tokenUser({email:user.email});
        return {status:"success",token:auth}   
            
    } catch (error) {
        console.log(error)
        return {status:"failed",message:"Internal error",error:error}
    }    
}

let userExists = async(userEmail)=>{
    try{
        let user = await usermodel.findOne({email:userEmail})

        if(!user){
            return false
        }

        return true 
    }

    catch(error){
        return false
    }
}

async function encrypt(rawPassword,salt){
    let hashedPassword = await bcrypt.hash(rawPassword,salt);
    return hashedPassword
}

async function decrypt(hashPassword,rawPassword){
    let passwordMatches = await bcrypt.compare(rawPassword,hashPassword);
    return passwordMatches
}

module.exports={registerUser,loginUser,authUser,PPDid}




