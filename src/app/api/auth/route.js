import { User } from "../../../../models/user";
import { NextResponse } from "next/server";
import { generateToken } from "@/app/utilities";
import nodemailer from "nodemailer"

async function checkRequestType(request){

    let requestType = request.headers.get('content-type');
    
    switch(true){
  
        case requestType.includes('json'):{
            let data = await request.json();
            return {
                action:data.action,
                data
            }
        }
  
        case requestType.includes('form'):{
            let data = await request.formData();
            return {
                action:data.get('action'),
                data
            }
        }
  
    }
  
  }
  
  export async function POST (req){

    let request = await checkRequestType(req);

    if(request.action == "signUp"){

        let check = await User.findOne({
            email:request.data.email,
       });
       if(check){
        console.log("Bilal user exist")
        return NextResponse.json("exist");
        }
        else{

            console.log('SignUp Running');
            console.log(request)
             let user = User()
            user.name = request.data.name ,
            user.password = request.data.password ,
            user.email = request.data.email
            await user.save()
              }

        
    }
    else if(request.action == "login"){
        console.log('Login Running');
        console.log(request.data)
        let user = await User.findOne({
            name:request.data.name,
            password:request.data.password,
            email:request.data.email,
       });

       if(user){
console.log("User Found")

let token = await generateToken(user._id);

return NextResponse.json({
    user,
    token
})
}
else{
          console.log("User Error")
           return NextResponse.json(null);
      }
    }
    else if (request.action == "tokenCheck"){
        let user = await User.findById(request.data.id);
        return NextResponse.json(user);
    }
    else if (request.action == "user_by_id"){
        let user = await User.findByIdAndUpdate(request.data.id , {
            password : request.data.password
        });
        return NextResponse.json(user);
    }
    else if(request.action == "get_users"){

        let users = await User.find();
        
        return NextResponse.json({
         users
        })
    }
    else if(request.action == "get_users-byId"){

        let user = await User.findById(request.data.id);
        
        return NextResponse.json({
         user
        })
    }
    else if(request.action == "delete_user"){
        await User.findByIdAndDelete(request.data.userID);
            return NextResponse.json({
                success:true
               })
    }
    else if(request.action == "POST"){
const transport = nodemailer.createTransport({
    service : "gmail" ,
    auth: {
        user : "extracontent1006@gmail.com" ,
        pass : "tshkxvejbetbkcxc"
    },
})
const mailOptions = {
    from : ' "Superbell" <extracontent1006@gmail.com>' ,
    to : request.data.email , 
    subject : "Verification Mail" , 
    text : request.data.Otp
}
try{
await transport.sendMail(mailOptions)
// res.status(200).json({message : "Mail sent successfully"})
return NextResponse.json({ message: "Mail sent successfully" });
}catch(e){
    console.error(e)
    // res.status(500).json({error  :"Sending error" })
    return NextResponse.json({ error: "Sending error" }, { status: 500 });
}
    }
    return NextResponse.json({success:true});
  }