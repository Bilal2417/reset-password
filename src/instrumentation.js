import { connectDb } from "../lib/db";

export async function register(){

   await  connectDb();

    console.log('register running');

}