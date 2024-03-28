import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import path from 'path';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongo DB");
}).catch(error=>{
    console.log(error);
    console.error("BAD AUTHENTICATION!!");
})

const __dirname = path.resolve();

const port =3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(port, ()=>{
    console.log(`listening on port number ${port}`);
})

//if url has /user after api  then it will use the middleware of userRouter
app.use('/api/user', userRouter); 
//if url has  /auth after api  then it will use the middleware of authRouter
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist','index.html'));
});

//creating middleware for exception handling for multiple routes, 
//This is Good way instead of writing try catch block everywhere
app.use((error, request, response, next)=>{
    const statusCode = error.statusCode || 500;
const message = error.message || 'Internal Server Error';
return response.status(statusCode).json({
    success:false,
    statusCode,
    message
});
});

