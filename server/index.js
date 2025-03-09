import express from 'express';
const app = express();

const port = 8000;

app.get('/',(req,res)=>{
    res.send("Hello from orebi api server");
});

// app.get("/products",(req,res)=>{
//     res.send('Product data will go here');
// });

app.listen(port,()=>{
    console.log('server is running on port: ${port}');
});
