"use client";
import { useForm } from "react-hook-form"
import "./../signUp.css"
import { useDispatch, useSelector } from "react-redux";
import { addOtp } from "@/store/logSlice";
import ReduxProvider from "@/components/reduxProvider/reduxProvider";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { verifyToken } from "@/app/utilities";
import axios from "../../../../axios";
import { useRouter } from "next/navigation";

export default function SignUp () {
    return <ReduxProvider>
<SignComp/>
    </ReduxProvider>
}
  function SignComp() {
    let route = useRouter()
    let params = useParams()
    let dispatch = useDispatch()
    let users = useSelector(function(store){
        return store.logSlice.users
    })
    let logging = useSelector(function(store){
        return store.logSlice.loggedUser
    })
    
    let {handleSubmit , register , formState:{errors}} = useForm()
    

const saveData = async (data , evt)  => {
  evt.preventDefault()
   let user = {
    action : "get_users-byId",
    id : params.Data
   }
   try{

     let resp = await axios.post("/api/auth",user)
     if(resp){
       console.log(resp.data.user)
       let checkDuplication = false;
        if(data.email == resp.data.user.email){
          checkDuplication = true
        }

      if(checkDuplication){
        let otp;
        function generateOtp(){
          otp = Math.ceil(Math.random()*999999)
        }
        generateOtp()
        if(otp < 100000){
          generateOtp()
        }
        console.log("otp : " ,otp)
let resetUser ={
action : "POST",
email : data.email,
Otp : String(otp),
}

try{

  let resp = await axios.post("/api/auth",resetUser)
  toast.success("Email sent successfully")
  dispatch(addOtp(otp))
  route.push("/verification/" + params.Data)
}catch(e){
  console.log(e)
}
      } else{
        toast.error("Email doesn't exist!")
    }   
      }
    }catch(e){
      console.log(e)
    }

//           }
         
//         console.log(data)
    }
    return <>
    <form onSubmit = {handleSubmit(saveData)}>
    <h2 className ="">Change Password</h2>
    <label>
    <p className="label-txt">ENTER YOUR EMAIL</p>
    <input type="text" className="input" 
    {...register("email", { required : true ,  pattern : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}/>
    <div className="line-box"  style={ {background: errors.email && (errors.email.type == "required" || errors.email.type == "pattern")  ? ' red' : '#BCBCBC'} }>
      <div className="line" />
    {errors.email && errors.email.type == "required" ? <div className="color-red">Email required</div> : null}
    {errors.email && errors.email.type == "pattern" ? <div className="color-red">Email should be in correct format</div> : null}
    </div>
  </label>
  
  <button type="submit">submit</button>
</form>

    </>
}