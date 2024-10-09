"use client"
import ReduxProvider from "@/components/reduxProvider/reduxProvider";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


export default function Users () {
    return <ReduxProvider>
        <UserComp/>
    </ReduxProvider>
}

function UserComp() {
    let route = useRouter()
    let token = localStorage.getItem("Token")


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
        <button onClick = {()=>{
            console.log(token)
route.push("/signUp/"+ token)
        }}>Change Password</button></li>
</>
    
})
        }
</ul>
    </>
}