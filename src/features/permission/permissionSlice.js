import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import permissionService from "../../services/permission.service";

export const GetSelectRole = createAsyncThunk("role/selectRole", async () =>{
    const response = await permissionService.getListSelectRoles();
    return response.data
});

const initialState = { roles: { Items: [] }, seletecRoles: [], permissions: [], role: { Permissions: [{ View: false, Edit: false, Create: false, Delete: false }] } };

const permissionSlice = createSlice({
    name: "permission",
    initialState: initialState,
    reducers: {
        retrieveRoles: (state, { payload }) => {
            state.roles = payload;
        },
        removeSelectRole : (state) => {
            state.seletecRoles = [];
        }
    },
    extraReducers:{
        [GetSelectRole.fulfilled]: (state, {payload}) => {
            return {...state, seletecRoles: payload.Data}
        }
    }
});

const { reducer, actions } = permissionSlice;
export const { retrieveRoles, removeSelectRole } = actions;
export default reducer;