import {post, get,getWithParams, postForm,del, put, putForm,postWithParams} from '../helpers/httpHelper'

const API_URL = "/Center"

const getListSelectCenters = () =>{
    return get(`${API_URL}/list-center-for-select`);
}

const getListCenters = (limit, page) => {
    return getWithParams(`${API_URL}/list-centers`, {limit, page});
}

const createCentral = (data) =>{
    return post(`${API_URL}/create`,data);  
}
const createCentralForm = (data) =>{
    return postForm(`${API_URL}/create-form`,data);  
}
const deleteCenter = (id) => {
    return del(`${API_URL}/delete/${id}`)
}

const getCenter = (id) => {
    return get(`${API_URL}/get/${id}`)
}

const updateCenter = (id,data) => {
    return put(`${API_URL}/update/${id}`,data)
}

const updateCenterForm = (id,data) => {
    return putForm(`${API_URL}/update-form/${id}`,data)
}

const removeUserFromCenter = (cId,uId) =>{
    return postWithParams(`${API_URL}/removeUser`,{
        centerId: cId,
        userId: uId
    })
}

const addCAdminToCenter = (cId,uId) => {
    return postWithParams(`${API_URL}/addUser`,{
        centerId: cId,
        userId: uId
    })
}

const centerService = {
    getCenter,
    getListSelectCenters,
    getListCenters,
    createCentral,
    createCentralForm,
    deleteCenter,
    updateCenter,
    updateCenterForm,
    removeUserFromCenter,
    addCAdminToCenter
}

export default centerService;

