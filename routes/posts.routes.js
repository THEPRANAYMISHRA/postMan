const express=require("express")
const postRouter=express.Router()
const PostModel=require("../model/posts.model")

postRouter.get("/",async(req,res)=>{
    let posts= await PostModel.find()
    res.send(posts)
})
postRouter.post("/posts/add",async(req,res)=>{
    const payload=req.body
    try {
        let post=new PostModel(payload)
        await post.save()
        res.send({"msg":"post uploaded"})
    } catch (error) {
        res.send({"msg":"login first"})
    }
})

postRouter.patch("/posts/update/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let post=await PostModel.findByIdAndUpdate(id)
        res.send({"msg":"updated"})
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})

postRouter.delete("/posts/delete/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let post=await PostModel.findByIdAndDelete(id)
        res.send({"msg":"deleted"})
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})












module.exports=postRouter