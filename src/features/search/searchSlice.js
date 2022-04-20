import {createSlice} from "@reduxjs/toolkit"

const initialState = {searchText: ''};

const searchSlice = createSlice({
    name:"search",
    initialState:initialState,
    reducers:{
        setSearch: (state, {payload}) =>{
            state.searchText = payload;
        }
    }
});

const {reducer, actions} = searchSlice;
export const {setSearch} = actions;
export default reducer;