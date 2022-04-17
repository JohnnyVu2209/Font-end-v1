import { createSlice } from "@reduxjs/toolkit";

const initialState = {message:null};

const messageSlice = createSlice({
    name:"message",
    initialState: initialState,
    reducers:{
        setMessage:(state, {payload}) => {
            state.message = payload;
        },
        clearMessage:(state) => {
            state.message = null
        }
    }
});

export const {setMessage, clearMessage} = messageSlice.actions;
export default messageSlice.reducer;