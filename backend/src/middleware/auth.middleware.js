import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async(req, res, next)=>{
    try{
        const token  = req.cookies.jwt;

        if(!token){
            return  res.status(401).json({message : "Unauthorized Access - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if(!decoded){
            return  res.status(400).json({message : "Unauthorized Access - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message : "User not Found"});
        }

        req.user = user;

        next();
    }catch(error){
        console.log("Error in protectRoute : ", error);
        return res.status(500).json({message : "Internal Server Error"});
    }
};