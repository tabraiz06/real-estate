const express = require('express')
const dbFun=require('../database/dbFun')

const router = express.Router()

router.post('/register',async(req,res)=>{
    try {
        let response = await dbFun.registerUser(req.body);
        if (response.status=='failed') {
           return res.status(404).json(response);   
        }
            res.status(200).json(response);         
    } catch (error) {
        res.status(500).json({status:"failed",message:"Internal error",error:error})
    }
});

router.post('/login',async(req,res)=>{
    try {
        let response = await dbFun.loginUser(req.body);
        if (response.status=='failed') {
           return res.status(404).json(response);   
        }
            res.status(200).json(response);         
    } catch (error) {
        res.status(500).json({status:"failed",message:"Internal error",error:error})
    }
});

router.get('/test',dbFun.authUser,async(req,res)=>{
    return res.status(200).json({
        status:"Authorized",
        email:req.user.email,
        username:req.user.username,
        userID:req.user.userID

    }); 
});

module.exports = router