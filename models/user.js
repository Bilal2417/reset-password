import mongoose, { mongo } from "mongoose";

let userSchema = mongoose.Schema({
    name:String,
    password:String,
    email:String,
});

// new user banana
export let User = mongoose.models.user ||  mongoose.model('user', userSchema);