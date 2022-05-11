import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user.service";

export const fetchAsyncUsers = createAsyncThunk("users/retrieve",
async ({perPage, page}) =>{
    const response = await userService.getListUser(perPage, page);

    return response.data;
});

export const fetchAsyncUser = createAsyncThunk("users/fetchUserInfo", async (id) => {
    const response = await userService.getUser(id);
    return response.data;
});

export const createUser = createAsyncThunk("users/create", async (data) => {
    const response = await userService.createUser(data);
    return response.data;
});
export const createUserForm = createAsyncThunk("users/createForm", async (data) => {
    const response = await userService.createUserForm(data);
    return response.data;
});
export const deleteUser = createAsyncThunk("users/delete", async ({id}) => {
    await userService.deleteUser(id);
    return {id};
}); 
export const updateUser = createAsyncThunk("users/update", async ({id, data}) => {
    const response = await userService.updateUser(id, data);
    return response.data;
});
export const updateUserForm = createAsyncThunk("users/updateForm", async ({id, data}) =>{
    const response = await userService.updateUserForm(id, data);
    return response.data;
});
export const getUnvCentralAdmin = createAsyncThunk("users/getUnvCA", async () => {
    const response = await userService.getUnvCAdmin();
    return response.data;
});

export const getTeachersNotInCourse = createAsyncThunk("user/teacherNotInCourse", async (id) =>{
    const response = await userService.getTeachersNotCourse(id);
    return response.data;
});

const initialState = {users: { CurrentPage:0,TotalItems:0,Items: [] }, user: {Role:{},Center:{}}};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers:{
        // createUser:(state, {payload}) => {
        //     state.user = payload;
        //     state.users.Items.push(payload);
        // },
        retrieveUsers:(state, {payload}) =>{
            state.users = payload
        },
        removeUser: (state) => {
            state.user = {};
        },
        removeListUsers: (state) => {
            state.users = [];
        }
    },
    extraReducers:{
        [fetchAsyncUsers.fulfilled]: (state, {payload}) =>{
            console.log("Fetched Successfully");
            return {...state, users : payload.Data}
        },
        [fetchAsyncUser.fulfilled]: (state, {payload}) =>{
            return {...state, user : payload.Data}
        },
        [createUser.fulfilled] : (state, {payload}) => {
            return ;
        },
        [createUserForm.fulfilled] : (state, {payload}) => {
            return ;
        },
        [updateUser.fulfilled] : () => {
            return ;
        },
        [updateUserForm.fulfilled] : () => {
            return ;
        },
        [deleteUser.fulfilled] : (state, {payload}) => {
            let index = state.users.Items.findIndex(({Id}) => Id === payload.id);
            state.users.Items.splice(index,1);
        },

        [getUnvCentralAdmin.fulfilled]: (state,{payload}) => {
            return {...state, users : payload.Data};
        },
        [getTeachersNotInCourse.fulfilled]: (state,{payload}) => {
            return {...state, users : payload.Data};
        }
    }
});

const {reducer, actions} = userSlice;
export const {retrieveUsers, removeUser, removeListUsers} = actions;
export default reducer;