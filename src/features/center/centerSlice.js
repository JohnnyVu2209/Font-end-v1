import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import centerService from "../../services/center.service";

export const GetSelectCenter = createAsyncThunk("center/selectCenter", async () =>{
    const response = await centerService.getListSelectCenters();
    return response.data;
});

const initialState = {centers: {Items:[]}, center: { Users:[] }, selectCenter:[]}

const centerSlice = createSlice({
    name:"center",
    initialState: initialState,
    reducers:{
        retrieveCenters: (state, {payload}) =>{
            state.centers = payload;
        },
        removeSelectCenter: (state) =>{
            state.selectCenter = [];
        }
    },
    extraReducers:{
        [GetSelectCenter.fulfilled] : (state, {payload}) =>{
            return {...state, selectCenter: payload.Data}
        }
    }
});

const {reducer, actions} = centerSlice;
export const {retrieveCenters, removeSelectCenter} = actions;
export default reducer;