import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (request, response)=>{
    response.json({
        message: "hello world!!!"
    })
};

export const updateUser = async (request, response, next)=>{
    if(request.user.id != request.params.id ){
        return next(errorHandler(403, "❌ Update Failed, Make sure You're Signed in and try again"));
    }
    try {
        if(request.body.password){
            request.body.password = bcryptjs.hashSync(request.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set:{
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                photo: request.body.photo,
            }
        }, {new:true})

        const {passowrd, ...rest} = updatedUser._doc;

        response.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (request, response, next) =>{
    if(request.user.id != request.params.id ){
        return next(errorHandler(401, "❌ Delete Failed, Make sure You're Signed in and try again"));
    }
    try {
        await User.findByIdAndDelete(request.params.id);
        response.clearCookie('access_token');
        response.status(200).json('User has  been deleted');
    } catch (error) {
        next(error);
    }
}