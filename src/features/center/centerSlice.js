import {createSlice} from "@reduxjs/toolkit";

const initialState = {centers: {Items:[]}, center: { Users:[] }, selectCenter:[]}

const centerSlice = createSlice({
    name:"center",
    initialState: initialState,
    reducers:{
        retrieveCenters: (state, {payload}) =>{
            state.centers = payload;
        }
    }
});

const {reducer, actions} = centerSlice;
export const {retrieveCenters} = actions;
export default reducer;