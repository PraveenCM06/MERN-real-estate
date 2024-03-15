import jwt from 'jsonwebtoken';
export const verifyToken = (request, response, next)=>{
    const token = request.cookies.access_token;
    if(!token){
        return next(errorHandler(401, "Unauthorized"));
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (error, user)=>{
        if(error){
            return next(errorHandler(403, "Forbidden"));
        }
        request.user = user;
        next();
    });
};