import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user.service";

export const fetchAsyncUsers = createAsyncThunk("users/fetchAsyncUsers",
async (pageRequest) =>{
    const response = await userService.getListUser(pageRequest.perPage,pageRequest.TotalItemspage);

    return response.data;
});

const initialState = {users: { CurrentPage:0,TotalItems:0,Items: [] }, user: {Role:{},Center:{}}};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers:{
        createUser:(state, {payload}) => {
            state.user = payload;
            state.users.Items.push(payload);
        },
        retrieveUsers:(state, {payload}) =>{
            state.users = payload
        }
    },
    extraReducers:{
        [fetchAsyncUsers.pending]: () =>{
            console.log("Pending");
        },
        [fetchAsyncUsers.fulfilled]: (state, {payload}) =>{
            console.log("Fetched Successfully");
            return {...state, users : payload.Data}
        },
        [fetchAsyncUsers.rejected]: () =>{
            console.log("Rejected!");
        }
    }
});

const {reducer, actions} = userSlice;
export const {createUser, retrieveUsers} = actions;
export default reducer;