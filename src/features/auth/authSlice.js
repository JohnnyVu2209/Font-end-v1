import { createSlice } from "@reduxjs/toolkit";
import tokenService from "../../services/token.service";

const initialState = {
    isAuthenticated : !!tokenService.getUser(), 
    user: tokenService.getUser(),
    isAdmin: tokenService.getUserInfo()?.Role.Name === "ADMIN",
    isCAdmin: tokenService.getUserInfo()?.Role.Name === "CENTRAL ADMIN"
};

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        login:(state, {payload}) => {
            state.isAuthenticated = true;
            state.user = payload;
            state.isAdmin = tokenService.getUserInfo()?.Role.Name === "ADMIN";
            state.isCAdmin = tokenService.getUserInfo()?.Role.Name === "CENTRAL ADMIN"
        },
        logout:(state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.isAdmin = false;
            state.isCAdmin = false;
        },
        refreshToken:(state,{payload}) => {
            state.user.Token = payload
        }
    }
})

const {reducer, actions} = authSlice;
export const {login, logout, refreshToken} = actions;
export default reducer;