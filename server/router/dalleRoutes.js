import express from 'express';
import {Configuration,OpenAIApi} from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})

const openAi=new OpenAIApi(configuration);
const router=express.Router();
// router.get('/',(req,res)=>{
//     res.send('Dalle get');
// })

router.post('/',async (req,res)=>{
    const {prompt}=req.body;
    
    try{
        const response=await openAi.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json'
        })
        res.status(200).send({photo:response.data.data[0].b64_json});
    }
    catch(err){
        console.log(err?.response.data.error.message);
        res.status(500).send(err?.response.data.error.message);
    }
})

export default router;