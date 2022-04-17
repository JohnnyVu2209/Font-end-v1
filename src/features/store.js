import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "./message/messageSlice"
import authReducer from "./auth/authSlice"

export const store = configureStore({
    reducer:{
        message: messageReducer,
        auth: authReducer
    },
});