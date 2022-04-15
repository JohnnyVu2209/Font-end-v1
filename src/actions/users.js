import {
    CREATE_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
    CREATE_USER_WITH_FORM,
    UPDATE_USER_WITH_FORM,
    GET_UNV_CENTRAL_ADMIN,
    GET_USER
} from '../constants/types'
import userService from '../services/user.service';

export const createUser = (body) => async (dispatch) => {
    try {
        const res = await userService.createUser(body);

        dispatch({
            type: CREATE_USER,
            payload: res.data.Data,
        });
        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createUserForm = (form) => async (dispatch) => {
    try {
        const res = await userService.createUserForm(form);

        dispatch({
            type: CREATE_USER_WITH_FORM,
            payload: res.data.Data,
        });

        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
    ;
}


export const updateUser = (id, body) => async (dispatch) => {
    try {
        const res = await userService.updateUser(id, body);

        dispatch({
            type: UPDATE_USER,
            payload: res.data.Data,
        });
        return Promise.resolve(res.data.Data);

    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateUserForm = (id, form) => async (dispatch) => {
    try {
        const res = await userService.updateUserForm(id, form);

        dispatch({
            type: UPDATE_USER_WITH_FORM,
            payload: res.data.Data,
        });
        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await userService.deleteUser(id);

        dispatch({
            type: DELETE_USER,
            payload: id,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const retrieveUsers = (limit, page) => async (dispatch) => {
    try {
        const res = await userService.getListUser(limit, page);
        dispatch({
            type: RETRIEVE_USERS,
            payload: res.data.Data,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const GetUnvCentralAdmin = () => async (dispatch) => {
    try {
        const res = await userService.getUnvCAdmin();
        dispatch({
            type: GET_UNV_CENTRAL_ADMIN,
            payload: res.data.Data
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetUser = (id) => async (dispatch) => {
    try {
        const res = await userService.getUser(id);
        dispatch({
            type:GET_USER,
            payload: res.data.Data
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

