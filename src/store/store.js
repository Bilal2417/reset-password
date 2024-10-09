import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { logSlice } from "./logSlice"

let mainReducer = combineReducers({
    logSlice : logSlice.reducer
})
export let mainStore = configureStore({
    reducer : mainReducer
})