import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res)=>{
    console.log(req.body);
    const {username, email, password} = req.body;

    const hashedPassword= bcryptjs.hashSync(password, 10);
    const newUser= new User({username, email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("User created Successfully!");

    }catch(error){
        res.status(500).json(error.message);
    }
}