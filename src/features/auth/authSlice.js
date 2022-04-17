import { createSlice } from "@reduxjs/toolkit";
import tokenService from "../../services/token.service";

const initialState = {isAuthenticated : !!tokenService.getUser(), user: tokenService.getUser()};

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        login:(state, {payload}) => {
            state.isAuthenticated = true;
            state.user = payload;
        },
        logout:(state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    }
})

const {reducer, actions} = authSlice;
export const {login, logout} = actions;
export default reducer;