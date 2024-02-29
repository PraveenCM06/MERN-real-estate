import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to DB");
}).catch(error=>{
    console.log(error);
    console.error("BAD AUTHENTICATION!!");
})
const port =3000;

const app = express();

app.listen(port, ()=>{
    console.log(`listening on port number ${port}`);
})

app.use('/api/user', userRouter)