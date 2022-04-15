import {
    CREATE_ROLE_PERMISSION,
    DELETE_ROLE_PERMISSION,
    EDIT_ROLE_PERMISSION,
    GET_LIST_ROLE,
    GET_LIST_ROLE_FOR_SELECT,
    GET_PERMISSIONS,
    GET_ROLE_DETAIL,
    UPDATE_PERMISSION_STATE
} from "../constants/types";
import permissionService from "../services/permission.service"


export const GetSelectRoleData = () => async (dispatch) => {
    try {
        const res = await permissionService.getListSelectRoles();
        dispatch({
            type: GET_LIST_ROLE_FOR_SELECT,
            payload: res.data.Data
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const RetrieveRoles = (limit, page) => async (dispatch) => {
    try {
        const res = await permissionService.getListRoles(limit, page);
        dispatch({
            type: GET_LIST_ROLE,
            payload: res.data.Data,
        });
        Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetPermissions = () => async (dispatch) => {
    try {
        const res = await permissionService.getPermissions();
        dispatch({
            type: GET_PERMISSIONS,
            payload: res.data.Data,
        });
        Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateRole = (data) => async (dispatch) =>{
    try {
        const res = await permissionService.createRolePermission(data);
        dispatch({
            type:CREATE_ROLE_PERMISSION,
            payload:res.data.Data
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const DeleteRole = (id) => async (dispatch) => {
    try {
        await permissionService.deleteRoleWithPermission(id);
        dispatch({
            type:DELETE_ROLE_PERMISSION,
            payload:id
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetRoleDetail = (id) => async (dispatch) =>{
    try {
        const res = await permissionService.getRoleDetails(id);
        dispatch({
            type: GET_ROLE_DETAIL,
            payload: res.data.Data
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const EditRole = (id,data) => async (dispatch) => {
    try {
        const res = await permissionService.editRoleWithPermission(id,data);
        dispatch({
            type:EDIT_ROLE_PERMISSION,
            payload:res.data.Data
        })
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}