"use client"

import { useForm } from "react-hook-form"
import "./../newPass.css"
import { toast } from "react-toastify"
import { useParams } from "next/navigation"
import axios from "../../../../axios"
import { useRouter } from "next/navigation"

export default () => {
    let params = useParams()
    let route = useRouter()
    let { handleSubmit , register , formState:{errors}} = useForm()
    

    const saveData = async ( data ) => {
        if(data.password !== data.Confirmpassword){
            toast.error("Passwords are not same")
        }
        else{
            let user = {
                action : "user_by_id" ,
                id : params.Id ,
                password : data.password
            }
            try{
                let resp = await axios.post("/api/auth",user)
                if(resp){
                    toast.success("Account successfuly Updated !!")
           route.push("/")
                }
            }catch(e){
                console.log(e)
            }
        }
    }
    return <>
      <form onSubmit = {handleSubmit(saveData)}>
    <h2 className ="">New Password</h2>
  <label>
    <p className="label-txt">ENTER NEW PASSWORD</p>
    <input type="password" className="input" 
     {...register("password", { required : true , minLength : 5 })}/>
    <div className="line-box"  style={ {background: errors.password && (errors.password.type == "required" || errors.password.type == "minLength")  ? ' red' : '#BCBCBC'} }>
    
      <div className="line" />
     {errors.password && errors.password.type == "required" ? <div className="color-red">Password required</div> : null}
     {errors.password && errors.password.type == "minLength" ? <div className="color-red">Password should be atleast 5 characters long</div> : null}
    </div>
  </label>
  <label>
    <p className="label-txt">CONFIRM NEW PASSWORD</p>
    <input type="password" className="input" 
     {...register("Confirmpassword", { required : true , minLength : 5 })}/>
    <div className="line-box"  style={ {background: errors.password && (errors.Confirmpassword.type == "required" || errors.Confirmpassword.type == "minLength")  ? ' red' : '#BCBCBC'} }>
    
      <div className="line" />
     {errors.Confirmpassword && errors.Confirmpassword.type == "required" ? <div className="color-red">Password required</div> : null}
     {errors.Confirmpassword && errors.Confirmpassword.type == "minLength" ? <div className="color-red">Password should be atleast 5 characters long</div> : null}
    </div>
  </label>

  <button type="submit">submit</button>
</form>
    </>
}