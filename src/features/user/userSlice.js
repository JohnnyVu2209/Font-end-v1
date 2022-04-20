import { createSlice } from "@reduxjs/toolkit"

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
    }
});

const {reducer, actions} = userSlice;
export const {createUser, retrieveUsers} = actions;
export default reducer;