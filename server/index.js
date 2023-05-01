import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import postRouter from './router/postsRoutes.js';
import dalleRouter from './router/dalleRoutes.js';

dotenv.config();
const port=process.env.PORT;
const app=express();

app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use('/api/v1/post',postRouter);
app.use('/api/v1/dalle',dalleRouter);

app.get('/',(req,res)=>{
    res.send('Hello from DALL-E');
})

const startServer = async() => {
try{

connectDB(process.env.MONGODB_URL);

app.listen(port,()=>{
    console.log('server is up on port '+port);
})
}

catch(err){
console.log(err);
}

}


startServer();

