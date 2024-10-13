"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import ReduxProvider from '../reduxProvider/reduxProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addUser, addUserDataBase, logUser, logUserDataBase } from '@/store/logSlice';
import { verifyToken } from '@/app/utilities';
import "./header.css"
import { useEffect, useState, useRef } from 'react';
import axios from '../../../axios';
export default function Header (){
return <ReduxProvider>
    <Component/>
</ReduxProvider>
}
 function Component() {
  // const [hello, setHello] = useState(false);
  const tokenRef = useRef(false);
  const usersRef = useRef(false);
   let dispatch = useDispatch()
   let route = useRouter()
     let userData = useSelector(function(store){
         return store.logSlice.loggedUser
     })
     let user;
     let token ;
useEffect(()=>{

  token = localStorage.getItem("Token");
  console.log(token)
  verify();
})

       async function verify() {
        let getUsers = {
          action : "get_users"
        }
           let resp = await axios.post("/api/auth",getUsers)
           if(resp.data){
            if(!usersRef.current){

              console.log("Resppp",resp.data.users)
              resp.data.users.map((users)=>{
                dispatch(addUser(users))
              })
              usersRef.current = true
            }
           }
         if (token) {
           try {
             let verify = await verifyToken(token); 
             console.log(verify)
             
             user = {
               action : "tokenCheck",
               id : verify.payload.userId
              };
              
              userData = await axios.post("/api/auth",user)
            //   if (userData) {
            //     if (!hello) {
            //         console.log("UserData", userData);
            //         let abc = userData.data;
            //         console.log("display user", abc);
            //         dispatch(addUser(abc));
            //         dispatch(logUser(abc));
            //         setHello(true); // Update the state
            //     }
            // }
            if (userData) {
              if (!tokenRef.current) {
                  console.log("UserData", userData);
                  let abc = userData.data;
                  console.log("display user", abc);
                  // dispatch(addUser(abc));
                  dispatch(logUser(abc));
                  tokenRef.current = true; // Set to true to prevent future runs
              }
          }
            } catch (error) {
              console.error("Token verification failed:", error);
            }
          }
      }

     
    return <>
  <header className="d-flex justify-content-center py-3">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link href="/" className="nav-link active" aria-current="page">
          Home
        </Link>
      </li>
      <li className="nav-item">
        {userData ?  <p  className="nav-link">
            Welcome <strong>{userData.name} </strong>
        </p> : null }
      </li>
      <li className="nav-item">
        <a href="/users" className="nav-link">
          Users
        </a>
      </li>
      <li className="nav-item">
       {userData ? <p onClick={()=>{
        dispatch(logUser(null))
        localStorage.removeItem("Token")
      }} className="nav-link log-out">
          LogOut
        </p> : 
        <Link href="/login" className="nav-link">
        Login
      </Link>} 
      </li>
      <li>
      <p onClick={()=>{
        dispatch(logUser(null))
        localStorage.removeItem("Token")
        route.push("/signUp")
      }} className="nav-link log-out">
          SignUp
        </p> 
      </li>
    </ul>
  </header>
    </>
}