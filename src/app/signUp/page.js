"use client";
import { useForm } from "react-hook-form"
import "./signUp.css"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/store/logSlice";
import ReduxProvider from "@/components/reduxProvider/reduxProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp () {
    return <ReduxProvider>
<SignComp/>
    </ReduxProvider>
}
 function SignComp() {
  let route = useRouter()
    let dispatch = useDispatch()
    let users = useSelector(function(store){
        return store.logSlice.users
    })
    let {handleSubmit , register , formState:{errors}} = useForm()

    const saveData =  (data , evt)  => {
        evt.preventDefault()
        let checkDuplication = users.find((user)=>{
            if(user.name === data.name){
                return true
            }
        })

        if(checkDuplication){
            toast.error("Account already exist")
        }
        else{
            toast.success("Account Created")
            dispatch(addUser(data))
          route.push("./login")
        }   
        console.log(data)
    }
    return <>
    <form onSubmit = {handleSubmit(saveData)}>
    <h2 className ="">Sign Up</h2>
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
  <button type="submit">submit</button>
</form>

    </>
}