import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dbConnect from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';

const app = express();

const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json())
dbConnect()

console.log(process.env.PORT)

app.get('/',(req,res)=>{
    res.send("Hello from orebi api server");
});

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);

app.get('/api',(req,res)=>{
    res.send('this is orebi commerce')
})


app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});
