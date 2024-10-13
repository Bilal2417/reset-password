"use client";
import Link from "next/link";
import { useForm } from "react-hook-form"
import "./login.css"
import { useDispatch, useSelector } from "react-redux";
import { logUser, newName } from "@/store/logSlice";
import ReduxProvider from "@/components/reduxProvider/reduxProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { generateToken } from "../utilities";
import axios from "../../../axios";

export default function Login () {
    return <ReduxProvider>
<LoginComp/>
    </ReduxProvider>
}
 function LoginComp() {
    let token;
    let route = useRouter()
    let dispatch = useDispatch()
    let users = useSelector(function(store){
        return store.logSlice.users
    })
    let {handleSubmit , register , formState:{errors}} = useForm()

    const saveData = async  (data , evt)  => {
        evt.preventDefault()
        // let checkDuplication = users.find((user)=>{
        //     if(user.email === data.email && data.password === user.password){
        //         return true
        //     }
        // })
//         let userData = new FormData()
// userData.append('action', "login")
// userData.append('name', data.name)
// userData.append('password', data.password)
// userData.append('email', data.email)
let userData = {
  action : "login" , 
  name : data.name ,
  password : data.password ,
  email : data.email
}
// let mail = {
//   action : "POST"
// }
try{


  let checkDuplication = await axios.post("/api/auth",userData)
  
  if(checkDuplication.data){
    toast.success("Account Logged In")

             localStorage.setItem("Token" , checkDuplication.data.token)
            //  if(checkDuplication.data.token){
            //   let tokenData = {
            //     action : "token",
            //     token : checkDuplication.data.token,
            //   }
            //   try{

            //     let sendToken = await axios.post("/api/auth", tokenData)
            //   }catch(e){
            //     console.log(e)
            //   }
            //  }
// console.log(token)
// dispatch(newName(data.name))
            dispatch(logUser(data))
          }
        else{
          toast.error("Account doesn't exist")
        }   
        console.log(data)
      }catch(e){
        toast.error("Error")
        console.log(e)
      }
    }
    return <>
    <form onSubmit = {handleSubmit(saveData)}>
    <h2 className ="">Login</h2>
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
  <label>
    <p className="label-txt">ENTER YOUR NAME</p>
    <input type="text" className="input" 
     {...register("name", { required : true , minLength : 3 })}/>
    <div className="line-box"  style={ {background: errors.name && (errors.name.type == "required" || errors.name.type == "minLength")  ? ' red' : '#BCBCBC'} }>
      <div className="line" />
    {errors.name && errors.name.type == "required" ? <div className="color-red">Username required</div> : null}
    {errors.name && errors.name.type == "minLength" ? <div className="color-red">Username should be atleast 3 characters long</div> : null}
    </div>
  </label>
  <label>
    <p className="label-txt">ENTER YOUR PASSWORD</p>
    <input type="password" className="input" 
     {...register("password", { required : true , minLength : 5 })}/>
    <div className="line-box"  style={ {background: errors.password && (errors.password.type == "required" || errors.password.type == "minLength")  ? ' red' : '#BCBCBC'} }>
    
      <div className="line" />
     {errors.password && errors.password.type == "required" ? <div className="color-red">Password required</div> : null}
     {errors.password && errors.password.type == "minLength" ? <div className="color-red">Password should be atleast 5 characters long</div> : null}
    </div>
  </label>
  {/* <div className="pass-block">
  <button className ="forgot-pass" onClick={()=>{
    route.push("/signUp/" + token)
  }}>Forgot Password?</button>
  </div> */}
  <button type="submit">submit</button>
</form>

    </>
}