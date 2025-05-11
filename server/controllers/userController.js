import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res) => {
    const { email, fullName, password, bio } = req.body;

    try{
        if(!email || !fullName || !password || !bio){
            return res.json({success:false, message:"Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success:false, message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            fullName,
            password:hashedpassword,
            bio
        });

        const token = generateToken(newUser._id);
        res.json({success:true,userData:newUser, token, message:"User created successfully"});

    }catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body;

    try{
        if(!email || !password){
            return res.json({success:false, message:"Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"});
        }
        const token = generateToken(user._id);
        res.json({success:true,userData:user, token, message:"User logged in successfully"});

    }catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}

export const checkAuth =(req,res)=>{
res.json({success:true, user:req.user});
}

export const updateProfile = async (req,res) => {
   
    try{
        const { fullName, bio, profilePic } = req.body;
        const userId = req.user._id;
        let updatedUser;
        if(!profilePic){
           await User.findByIdAndUpdate(userId, {bio, fullName}, {new:true});
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName, profilePic:upload.secure_url}, {new:true});
        }
        res.json({success:true,  message:"Profile updated successfully"});
    }catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}