import express from 'express';
import 'dotenv/config';
import dbConnect from './config/mongodb.js';
import userRouter from './routes/userRouter.js';

const app = express();

const port = process.env.PORT || 8000;
dbConnect()

console.log(process.env.PORT)

app.get('/',(req,res)=>{
    res.send("Hello from orebi api server");
});

app.use('/api/user',userRouter)

app.get('/api',(req,res)=>{
    res.send('this is orebi commerce')
})


app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});
