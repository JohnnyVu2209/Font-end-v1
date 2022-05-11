import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "./message/messageSlice"
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import searchReducer from "./search/searchSlice";
import centerReducer from "./center/centerSlice";
import permissionReducer from "./permission/permissionSlice";
import courseReducer from "./course/courseSlice";

export const store = configureStore({
    reducer:{
        message: messageReducer,
        auth: authReducer,
        user: userReducer,
        search: searchReducer,
        center: centerReducer,
        permission: permissionReducer,
        course: courseReducer
    },
});