import express from "express";
import Post from "../models/post.js";
import * as dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();
const router=express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


router.get('/',async (req,res)=>{
    try{
    const posts= await Post.find({});
    console.log(posts);
    return res.status(200).json({success:true, posts});
    }
    catch(error){
        return res.status(500).json({success:false,message:error});
    }
})

router.post('/',async (req,res)=>{
    const {photo,prompt,name}=req.body;
    try{
    const photo_url=await cloudinary.uploader.upload(photo)
    const post = new Post({name,prompt,photo:photo_url.url});
    await post.save();
    return res.status(201).json({success:true,post});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false, message:err});
    }
})

export default router;