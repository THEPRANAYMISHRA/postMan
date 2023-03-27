const express=require("express")
const userRouter=express.Router()
const UserModel=require("../model/users.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    bcrypt.hash(password,5,async(err, hash)=>{
        if(err){
            res.status(400).send({"msg":"something went wrong"})
        }else{
            let user= new UserModel({name,email,gender,password:hash,age,city,is_married})
            await user.save()
            res.send({"msg":"new user registered!"})
        }
    });
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    let user= await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password, function(err, result) {
            if(result){
                let token=jwt.sign({UserID:user.__id}, 'pranay');
                res.status(200).send({
                    "msg":"login done",
                    "token":token
                })
            }else{
                res.send({"msg":"wrong details"})
            }
        });
    }else{

    }
})






module.exports=userRouter