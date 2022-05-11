import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import centerService from "../../services/center.service";

export const GetSelectCenter = createAsyncThunk("center/selectCenter", async () =>{
    const response = await centerService.getListSelectCenters();
    return response.data;
});

export const createCenter = createAsyncThunk("center/create", async (data) => {
    const response = await centerService.createCentral(data);
    return response.data;
});

export const createCenterForm = createAsyncThunk("center/createForm", async (data) => {
    const response = await centerService.createCentralForm(data);
    return response.data;
});

export const centerDetail = createAsyncThunk("center/detail", async (id) => {
    const response = await centerService.getCenter(id);
    return response.data;
});

export const addCentralAdmin = createAsyncThunk("center/addCentralAdmin", async ({centerId, userId}) => {
    const response = await centerService.addCAdminToCenter(centerId, userId);
    return response.data;
});

export const removeCentralAdmin = createAsyncThunk("center/removeCentralAdmin", async ({centerId, userId}) => {
    await centerService.removeUserFromCenter(centerId, userId);
    return userId;
});

export const updateCenter = createAsyncThunk("center/update", async ({id, data}) => {
    const response = await centerService.updateCenter(id,data);
    return response.data;
});
export const updateCenterForm = createAsyncThunk("center/updateForm", async ({id, data}) => {
    const response = await centerService.updateCenterForm(id,data);
    return response.data;
});
export const disableCenter = createAsyncThunk("center/disable",async (id) => {
    await centerService.deleteCenter(id);
    return id;
});

export const retrieveCenters = createAsyncThunk("center/retrieve", async ({perPage, page}) =>{
    const response = await centerService.getListCenters(perPage, page);
    return response.data;
});

const initialState = {centers: {Items:[]}, center: { Users:[] }, selectCenter:[]}

const centerSlice = createSlice({
    name:"center",
    initialState: initialState,
    reducers:{
        // retrieveCenters: (state, {payload}) =>{
        //     state.centers = payload;
        // },
        removeSelectCenter: (state) =>{
            state.selectCenter = [];
        },
        removeCenterDetail: (state) => {
            state.center = {};
        }
    },
    extraReducers:{
        [retrieveCenters.fulfilled] : (state, {payload}) =>{
            return {...state, centers: payload.Data}
        },
        [GetSelectCenter.fulfilled] : (state, {payload}) =>{
            return {...state, selectCenter: payload.Data}
        },
        [createCenter.fulfilled] : () =>{
            return;
        },
        [createCenterForm.fulfilled] : () =>{
            return;
        },
        [updateCenter.fulfilled] : () =>{
            return;
        },
        [updateCenterForm.fulfilled] : () =>{
            return;
        },
        [centerDetail.fulfilled] : (state, {payload}) => {
            return {...state, center: payload.Data};
        },
        [addCentralAdmin.fulfilled] : (state, {payload}) => {
            return {...state, center: payload.Data};
        },
        [removeCentralAdmin.fulfilled] : (state, {payload}) => {
            return {...state, center: {...state.center, Users: state.center.Users.filter(item => item.Id !== payload)}};
        },
        [disableCenter.fulfilled] : (state, {payload}) => {
            return {...state, centers: {...state.centers, Items: state.centers.Items.filter(item => item.Id === payload).Status = false}};
        },
    }
});

const {reducer, actions} = centerSlice;
export const {removeSelectCenter, removeCenterDetail} = actions;
export default reducer;