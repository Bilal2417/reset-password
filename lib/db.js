import mongoose from "mongoose";
import { User } from "../models/user";


export async function connectDb(){

    try{

        let connect = mongoose.connect('mongodb://127.0.0.1:27017/SendMail')
        console.log('db connected')
        console.log(connect)


    }catch(e){
        console.log(e);
    }


}