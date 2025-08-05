import User from "../models/user.model.js";
import { generateToken } from "../lib/util.js";
import bcrypt from "bcryptjs"
import cloudinary from "cloudinary"


export const signup = async (req, res)=>{
    const { fullName, email, password } = req.body;
    try{
        // console.log(req.body);
        if(!email || !password || !fullName){
            return res.status(400).json({message : "All fields should be filled!"});
        }
        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 characters!"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message : "Email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password : hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id,res);

            await newUser.save();

            return res.status(201).json({
                fullName : newUser.fullName,
                _id : newUser._id,
                profilePic : newUser.profilePic,
                email : newUser.email,
            });
        }else{
            return res.status(400).json({message : "Invalid User"});
        }

    }catch(error){
        console.log("Error in sigunp controller : ", error)
        return res.status(500).json({message : "Internal server error"});
    }
};

export const login = async(req, res)=>{
    const {email, password} = req.body;

    try{
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        generateToken(user._id, res);

        res.status(201).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic
        });

    }catch(error){
        console.log("error in login credentials : ", error);
        res.status(500).json({message : "Internal server error"})
    }
};

export const logout = (req, res)=>{
    try{
        res.cookie("jwt", "", {maxAge : 0});
        res.status(201).json({message : 'Logged out succesfully'});
    }catch(error){
        console.log("error in logout credentials : ", error);
        res.status(500).json({message : 'Internal server error'});
    }
};

export const checkAuth = (req, res)=>{
    try{
        res.status(200).json(req.user)
    }catch(error){
        console.log("Error in Check Auth", error);
        res.status(500).json({message : "Internal Server Error"});
    }
};

export const updateProfile =async(req,res)=>{
    try{
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic){
        return res.status(400).json({message : "Profile Pic is required"});
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic : uploadResponse.secure_url}, {new : true});

    res.status(200).json(updatedUser);
    }catch(error){
        console.log("error in update profile");
        res.status(500).json({message : "Internal Server Error"});
    }
};