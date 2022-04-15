import {
    CREATE_CENTER,
    DELETE_CENTER,
    GET_CENTER,
    GET_LIST_CENTER,
    UPDATE_CENTER,
    REMOVE_MEMBER_TO_CENTER,
    ADD_MEMBER_TO_CENTER,
    GET_LIST_CENTER_FOR_SELECT
} from '../constants/types';
import centerService from '../services/center.service'

export const retrieveCenters = (limit, page) => async (dispatch) => {
    try {
        const res = await centerService.getListCenters(limit, page);
        dispatch({
            type: GET_LIST_CENTER,
            payload: res.data.Data,
        });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetCenter = (id) => async (dispatch) => {
    try {
        const res = await centerService.getCenter(id);
        dispatch({
            type: GET_CENTER,
            payload: res.data.Data
        });
        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createCenter = (body) => async (dispatch) => {
    try {
        const res = await centerService.createCentral(body);
        dispatch({
            type: CREATE_CENTER,
            payload: res.data.Data,
        });
        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
};


export const createCenterForm = (body) => async (dispatch) => {
    try {
        const res = await centerService.createCentralForm(body);
        dispatch({
            type: CREATE_CENTER,
            payload: res.data.Data,
        });
        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const DeleteCenter = (id) => async (dispatch) => {
    try {
        await centerService.deleteCenter(id);
        dispatch({
            type: DELETE_CENTER,
            payload: id
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export const UpdateCenter = (id, data) => async (dispatch) => {
    try {
        const res = await centerService.updateCenter(id, data);
        dispatch({
            type: UPDATE_CENTER,
            payload: res.data.Data
        });
        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateCenterForm = (id, data) => async (dispatch) => {
    try {
        const res = await centerService.updateCenterForm(id, data);
        dispatch({
            type: UPDATE_CENTER,
            payload: res.data.Data
        });
        return Promise.resolve(res.data.Data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const RemoveMemFromCen = (cId, uId) => async (dispatch) => {
    try {
        await centerService.removeUserFromCenter(cId, uId);
        dispatch({
           type:REMOVE_MEMBER_TO_CENTER,
           payload: uId 
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const AddCAdminToCen = (cId, uId) => async (dispatch) =>{
    try {
        const res = await centerService.addCAdminToCenter(cId,uId);
        dispatch({
            type:ADD_MEMBER_TO_CENTER,
            payload: res.data.Data,
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}
export const GetSelectCenterData = () => async (dispatch) => {
    try {
        const res = await centerService.getListSelectCenters();
        dispatch({
            type:GET_LIST_CENTER_FOR_SELECT,
            payload:res.data.Data,
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}