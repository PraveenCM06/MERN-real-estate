import mongoose from "mongoose";

//New Schema created with username, email and password 
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
}, {timestamps:true}); // give extra info as in when the account was created and other stuff


//Creating a model usng UserSchema
const User = mongoose.model('User', userSchema);

export default User;