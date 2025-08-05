import User from "../models/user.model.js";
import Message from "../models/messgae.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketID, io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res)=>{
    try{
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id : {$ne: loggedInUser}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(error){
        console.log("Error in fetching Users: ", error)
        res.status(500).json({message : "Internal Server Error"});
    }
};

export const getMessages = async(req,res)=>{
    try{
        const {id : userToChat} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or : [
                {senderId : myId, receiverId : userToChat},
                {senderId : userToChat, receiverId : myId},
            ],
        });

        res.status(200).json(messages);
    }catch(error){
        console.log("Error in fetching User: ", error);
        res.status(500).json({message : "Internal Server Error"});
    }
};

export const sendMessages = async(req,res) =>{
    try{
        const {text, image} = req.body;
        const {id : receiverId} = req.params;
        // console.log(receiverId);
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getRecieverSocketID(receiverId);

        if(receiverSocketId){
            io.to(receiverId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sending Message: ", error)
        res.status(500).json({message : "Internal Server Error"})
    }
};