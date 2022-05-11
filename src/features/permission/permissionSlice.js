import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import permissionService from "../../services/permission.service";

export const GetSelectRole = createAsyncThunk("role/selectRole", async () =>{
    const response = await permissionService.getListSelectRoles();
    return response.data;
});

export const retrieveRoles = createAsyncThunk("role/retrieve", async ({perPage, page})=>{
    const response = await permissionService.getListRoles(perPage, page);
    return response.data;
});

export const deleteRole = createAsyncThunk("role/delete", async (id) => {
    await permissionService.deleteRoleWithPermission(id);
    return {id};
});

export const createRole = createAsyncThunk("role/create", async (data) => {
    const response = await permissionService.createRolePermission(data);
    return response.data;
});

export const getRoleDetails = createAsyncThunk("role/detail", async (id) => {
    const response = await permissionService.getRoleDetails(id);
    return response.data;
});

export const editRole = createAsyncThunk("role/edit", async ({id, data}) => {
    const response = await permissionService.editRoleWithPermission(id,data);
    return response.data;
});

const initialState = { roles: { Items: [] }, seletecRoles: [], permissions: [], role: { Permissions: [{ View: false, Edit: false, Create: false, Delete: false }] } };

const permissionSlice = createSlice({
    name: "permission",
    initialState: initialState,
    reducers: {
        // retrieveRoles: (state, { payload }) => {
        //     state.roles = payload;
        // },
        removeSelectRole : (state) => {
            state.seletecRoles = [];
        },
        removeRoleDetail: (state) => {
            state.role = {};
        }
    },
    extraReducers:{
        [GetSelectRole.fulfilled]: (state, {payload}) => {
            return {...state, seletecRoles: payload.Data}
        },
        [retrieveRoles.fulfilled]: (state, {payload}) => {
            return {...state, roles: payload.Data}
        },
        [deleteRole.fulfilled]: (state, {payload}) => {
            let index = state.roles.Items.findIndex(({Id}) => Id === payload.id);
            state.roles.Items.splice(index,1);
        },
        [createRole.fulfilled]: () => {
            return ;
        },
        [getRoleDetails.fulfilled]: (state, {payload}) => {
            return {...state, role: payload.Data};
        },
        [editRole.fulfilled]: () => {
            return;
        },
    }
});

const { reducer, actions } = permissionSlice;
export const {  removeSelectRole,removeRoleDetail } = actions;
export default reducer;