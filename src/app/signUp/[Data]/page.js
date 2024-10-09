"use client";
import { useForm } from "react-hook-form"
import "./../signUp.css"
import { useDispatch, useSelector } from "react-redux";
import { addUser, newMail, newName, newPassword, removeUser } from "@/store/logSlice";
import ReduxProvider from "@/components/reduxProvider/reduxProvider";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { verifyToken } from "@/app/utilities";

export default function SignUp () {
    return <ReduxProvider>
<SignComp/>
    </ReduxProvider>
}
  function SignComp() {
    let abc;
    let params = useParams()
    let dispatch = useDispatch()
    let users = useSelector(function(store){
        return store.logSlice.users
    })
    let {handleSubmit , register , formState:{errors}} = useForm()
    
    
  async function eg()  {
        let verify = await verifyToken(params.Data)
        // console.log(verify.payload)
if(verify){
    console.log("Verifying Token ..." , verify.payload)
    // dispatch(addUser(verify.payload))
    dispatch(newPassword(verify.payload.userPassword))
    dispatch(newMail(verify.payload.userMail))
    dispatch(newName(verify.payload.userName))
}
}
eg()


let resetData = useSelector(function(store){
    return store.logSlice
})
const saveData = async (data , evt)  => {
    let verify = await verifyToken(params.Data)
    evt.preventDefault()
        let checkDuplication 
            if(resetData.password === data.password){
                checkDuplication = true
            }


        if(checkDuplication){
            if(data.userPassword == data.confirmPassword){
let user ={
  name : resetData.name,
  password : data.userPassword,
  email : data.email,
}
dispatch(removeUser(data.password))
dispatch(addUser(user))
    dispatch(newPassword(data))
                console.log(resetData.password)

                toast.success("Password changed successfully !")
            }
          }
          else{
            console.log(verify.payload.userPassword)
            toast.error("insufficient credential !")
            // dispatch(addUser(data))
        }   
        console.log(data)
    }
    return <>
    <form onSubmit = {handleSubmit(saveData)}>
    <h2 className ="">Change Password</h2>
  <label>
    <p className="label-txt">ENTER YOUR EMAIL</p>
    <input type="text" className="input"  readOnly value={resetData.email}
/>
    <div className="line-box"  style={ {background: errors.email && (errors.email.type == "required" || errors.email.type == "pattern")  ? ' red' : '#BCBCBC'} }>
      <div className="line" />
    {/* {errors.email && errors.email.type == "required" ? <div className="color-red">Email required</div> : null}
    {errors.email && errors.email.type == "pattern" ? <div className="color-red">Email should be in correct format</div> : null} */}
    </div>
  </label>
  <label>
    <p className="label-txt">ENTER OLD PASSWORD</p>
    <input type="password" className="input" 
     {...register("password", { required : true , minLength : 5 })}/>
    <div className="line-box"  style={ {background: errors.password && (errors.password.type == "required" || errors.password.type == "minLength")  ? ' red' : '#BCBCBC'} }>
    
      <div className="line" />
     {errors.password && errors.password.type == "required" ? <div className="color-red">Password required</div> : null}
     {errors.password && errors.password.type == "minLength" ? <div className="color-red">Password should be atleast 5 characters long</div> : null}
    </div>
  </label>
  <label>
    <p className="label-txt">ENTER NEW PASSWORD</p>
    <input type="password" className="input" 
     {...register("userPassword", { required : true , minLength : 5 })}/>
    <div className="line-box"  style={ {background: errors.newpassword && (errors.userPassword.type == "required" || errors.newpassword.type == "minLength")  ? ' red' : '#BCBCBC'} }>
    
      <div className="line" />
     {errors.userPassword && errors.userPassword.type == "required" ? <div className="color-red">Password required</div> : null}
     {errors.userPassword && errors.userPassword.type == "minLength" ? <div className="color-red">Password should be atleast 5 characters long</div> : null}
    </div>
  </label>
  <label>
    <p className="label-txt">CONFIRM NEW PASSWORD</p>
    <input type="password" className="input" 
     {...register("confirmPassword", { required : true , minLength : 5 })}/>
    <div className="line-box"  style={ {background: errors.confirmPassword && (errors.confirmPassword.type == "required" || errors.confirmPassword.type == "minLength")  ? ' red' : '#BCBCBC'} }>
    
      <div className="line" />
     {errors.confirmPassword && errors.confirmPassword.type == "required" ? <div className="color-red">Password required</div> : null}
     {errors.confirmPassword && errors.confirmPassword.type == "minLength" ? <div className="color-red">Password should be atleast 5 characters long</div> : null}
    </div>
  </label>
  <button type="submit">submit</button>
</form>

    </>
}