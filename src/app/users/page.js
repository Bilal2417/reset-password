"use client"
import ReduxProvider from "@/components/reduxProvider/reduxProvider";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./../globals.css"
import "../signUp/signUp.css"
// src\app\signUp\signUp.css
export default function Users () {
    return <ReduxProvider>
        <UserComp/>
    </ReduxProvider>
}

function UserComp() {
    let route = useRouter()
    let token ;
    useEffect(()=>{
    
      token = localStorage.getItem("Token");
      console.log(token)
    })
        
        
      let users = useSelector(function(store){
            return store.logSlice.users
        })



    return <>
    <ul class="list-group">
        {
users.map((user)=>{
return <>
    <li className="list-group-item">
        <strong>Name: </strong><span>{user.name} </span>
        <strong>Password: </strong><span>{user.password}</span>
        <button className="buttons" onClick = {()=>{
            console.log("Current User : ",user)
route.push("/signUp/"+ user._id)
        }}>Change Password</button>
        </li>
</>
    
})
        }
</ul>
    </>
}