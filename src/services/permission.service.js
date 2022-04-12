import {put,del,post, get,getWithParams} from '../helpers/httpHelper'

const API_URL = "/Permission"

const getListSelectRoles = () =>{
    return get(`${API_URL}/get-select-role`);
}

const getListRoles = (limit,page) => {
    return getWithParams(`${API_URL}/get-list-role`,{limit,page});
} 

const getPermissions = () =>{
    return get(`${API_URL}/get-permission`);
}

const createRolePermission = (data) => {
    return post(`${API_URL}/create`,data);
}

const deleteRoleWithPermission = (id) =>{
    return del(`${API_URL}/delete/${id}`);
}

const getRoleDetails = (id) => {
    return get(`${API_URL}/get-role-detail/${id}`);
}

const editRoleWithPermission = (id,data) =>{
    return put(`${API_URL}/update/${id}`,data);
}

const permissionService = {
    getListSelectRoles,
    getListRoles,
    getRoleDetails,
    getPermissions,
    createRolePermission,
    editRoleWithPermission,
    deleteRoleWithPermission
}

export default permissionService;
