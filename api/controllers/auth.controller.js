import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next)=>{
    console.log(req.body);
    const {username, email, password} = req.body;

    const hashedPassword= bcryptjs.hashSync(password, 10);
    //Creating new Entry with input we got
    const newUser= new User({username, email, password:hashedPassword});
    try{
        //Method to save
        await newUser.save();
        res.status(201).json("User created Successfully!");

    }catch(error){
        //default method
        // res.status(500).json(error.message);

        //can return custom error response
        // return next(errorHandler(500, "error from function"));

        //return actual error
        return next(error);
    }
}