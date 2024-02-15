import { error } from "console";
import { Request , Response , NextFunction } from "express";

export const errorHandler = ( 
    error : Error,
    req : Request,
    res : Response,
    next : NextFunction
) =>{
    console.error(error);
    res.status(500).send(`Internal Server Error`);
    
} 

