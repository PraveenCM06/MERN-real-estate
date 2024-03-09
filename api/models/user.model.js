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
    photo: {
        type:String,
        default:"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
    },
}, {timestamps:true}); // give extra info as in when the account was created and other stuff


//Creating a model usng UserSchema
const User = mongoose.model('User', userSchema);

export default User;