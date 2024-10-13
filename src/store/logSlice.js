import { createSlice } from "@reduxjs/toolkit";

export let logSlice = createSlice({
    name:'logSlice',
    // initial data
    initialState:{
        users:[
            {
                name: 'dummy' ,
                password: 24170 ,
            }
        ],
    loggedUser:null,
    otp : 0
    },
    reducers:{
        addUser : ( oldData , newData ) =>{
            // oldData.users.filter((user)=>{
            //     if(!(user.name == newData.payload.name)){
            //     }
            // })
            oldData.users.push(newData.payload)
        },
        removeUser : ( oldData , newData ) =>{
            oldData.users = oldData.users.filter((user)=>{
              return user.password !== newData.payload
            })
        },
        logUser : ( oldData , newData ) => {
            oldData.loggedUser = newData.payload
        },
        addOtp : ( oldData , newData ) => {
            oldData.otp = newData.payload
        },
    }
})

export let { addUser , removeUser , logUser , addOtp  } = logSlice.actions