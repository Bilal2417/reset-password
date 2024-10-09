"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import ReduxProvider from '../reduxProvider/reduxProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addUser, logUser } from '@/store/logSlice';
import { verifyToken } from '@/app/utilities';
import "./header.css"
import { useEffect } from 'react';
export default function Header (){
return <ReduxProvider>
    <Component/>
</ReduxProvider>
}
 function Component() {
   let dispatch = useDispatch()
   let route = useRouter()
     let users = useSelector(function(store){
         return store.logSlice.loggedUser
     })
     let token = localStorage.getItem("Token");
     let user;
    //  let isVerified = false;
     useEffect(()=>{

       async function verify() {
        //  if (isVerified) return;
         if (token) {
           try {
             // Assuming you have a separate function to verify the token
             let verify = await verifyToken(token); // Change this to your actual verification function
           console.log(verify)
           user = {
             name: verify.payload.userName,
             password: verify.payload.userPassword,
             email: verify.payload.userMail,
            };
            dispatch(addUser(user));
            dispatch(logUser(user.name));
            // isVerified = true;
          } catch (error) {
            console.error("Token verification failed:", error);
          }
        }
      }
      // if (!isVerified) {
        verify();
      // }
    },[])
     
    return <>
  <header className="d-flex justify-content-center py-3">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link href="/" className="nav-link active" aria-current="page">
          Home
        </Link>
      </li>
      <li className="nav-item">
        {users ?  <p  className="nav-link">
            Welcome <strong>{users.name} </strong>
        </p> : null }
      </li>
      <li className="nav-item">
        <Link href="/users" className="nav-link">
          Users
        </Link>
      </li>
      <li className="nav-item">
       {users ? <p onClick={()=>{
        dispatch(logUser(null))
        localStorage.removeItem("Token")
        route.push("/signUp")
       }} className="nav-link log-out">
          LogOut
        </p> : 
        <Link href="/login" className="nav-link">
        Login
      </Link>} 
      </li>
      <li className="nav-item"  onClick={()=>{
          localStorage.removeItem("Token")
        }}>
        <Link href="/signUp" className="nav-link">
          SignUp
        </Link>
      </li>
    </ul>
  </header>
    </>
}