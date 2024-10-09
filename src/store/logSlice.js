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
    name : null,
    password : null,
    email: null,
    },
    reducers:{
        addUser : ( oldData , newData ) =>{
            oldData.users.filter((user)=>{
                if(!(user.name == newData.payload.name)){
                    oldData.users.push(newData.payload)
                }
            })
        },
        removeUser : ( oldData , newData ) =>{
            oldData.users = oldData.users.filter((user)=>{
              return user.password !== newData.payload
            })
        },
        logUser : ( oldData , newData ) => {
            oldData.loggedUser = newData.payload
        },
        newPassword : ( oldData , newData ) => {
            oldData.password = newData.payload
        },
        newMail : ( oldData , newData ) => {
            oldData.email = newData.payload
        },
        newName : ( oldData , newData ) => {
            oldData.name = newData.payload
        },
    }
})

export let { addUser , removeUser , logUser , newPassword , newMail , newName } = logSlice.actions