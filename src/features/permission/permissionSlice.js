import { createSlice } from "@reduxjs/toolkit";

const initialState = { roles: { Items: [] }, seletecRoles: [], permissions: [], role: { Permissions: [{ View: false, Edit: false, Create: false, Delete: false }] } };

const permissionSlice = createSlice({
    name: "permission",
    initialState: initialState,
    reducers: {
        retrieveRoles: (state, { payload }) => {
            state.roles = payload;
        }
    }
});

const { reducer, actions } = permissionSlice;
export const { retrieveRoles } = actions;
export default reducer;