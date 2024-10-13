import { headers } from "next/headers"
import axios from "../../axios"
export default () => {
  const abc = async()=>{
    try{
      
      let resp = await axios.post("/api/auth",{
        action : "POST",
        headers : {
          "Content-Type" : "application/json"
        }
      })
    }catch(e){
      console.log(e)
    }
  }
  abc()
  return <>
<h2>Goto Login Page if you have an account</h2>
<h2>Goto SignUp Page if you don't have an account</h2>
  </>
}