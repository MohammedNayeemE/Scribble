import express from 'express';
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET , TOKEN_EXPIRES_DATE } from '../constant';
import { Request , Response } from 'express';

const BASE_URL = 'auth/'

const app = express();
const prisma = new PrismaClient();
const router = express.Router();


//@sign-up
router.post('/signup' , async (req : Request , res : Response) =>{
     const {username , email , password , image } = req.body;
     const hashedPassword = await bcryptjs.hash(password , 10);

     try{
       const user  = await prisma.user.create({
        data : {
            username : username ,
            password : hashedPassword,
            email : email,
            userpic : image


        }
       })
       const token = jwt.sign({
        userId : user.id 
       } , JWT_SECRET)
       res.cookie('authToken' , token , {httpOnly : true})
       res.status(200).json(
        {message : 'User Signed Successfully'}
       );
     }
     catch(error){
        console.error();
        return res.status(500).json({message : 'Internal Server Error'});
     }
})

//@login
router.post('/login' , async (req : Request , res : Response) =>{
    const {email  , password} = req.body;
    try{
     const user = await prisma.user.findUnique({
        where : {
            email
        }
     })
     if(!user){
        return res.status(401).json({
            message : `User Doesn't Exist`
        })
     }
     const passwordMatch = await bcryptjs.compare(password ,  user.password);
     if(!passwordMatch){
        return res.status(401).json({
            message : 'Credentials dont match'
        })
     }

     const token = jwt.sign(
        {userId : user.id } , JWT_SECRET
     )
     res.cookie( 'authToken' ,token , {httpOnly : true , expires : new Date(Date.now() + TOKEN_EXPIRES_DATE)})
     res.status(200).json({
        message : `User Signed In Successfully`
     })

    }
    catch(error){
        console.error();
        return res.status(500).json({message : 'Internal Server Error'});
     }
})

const MODULE = {
    router , 
    BASE_URL
}
export default MODULE;