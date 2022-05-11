import {post, postForm, getWithParams, get, put, putForm, del} from '../helpers/httpHelper'

const API_URL = "/user"


const createUserForm = (data) => {
    return postForm(`${API_URL}/create-with-form`,data);
};
const createUser = (data) => {
    return post(`${API_URL}/create`,data);
};

const getListUser = (limit,page) =>{
    return getWithParams(`${API_URL}/getlist`,{limit, page});
};

const getUser = (id) => {
    return get(`${API_URL}/get/${id}`)  
};

const updateUserForm = (id, data) => {
    return putForm(`${API_URL}/update-with-form/${id}`,data);
};

const updateUser = (id, data) => {
    return put(`${API_URL}/update/${id}`,data);
};

const deleteUser = (id) =>{
    return del(`${API_URL}/delete/${id}`);
};

const getUnvCAdmin = () =>{
    return get(`${API_URL}/get/central-admin-are-unv`)
}
const getTeachersNotCourse = (courseId) =>{
    return get(`${API_URL}/get/teacher-not-in-course/${courseId}`)
}

const userService = {
    createUserForm,
    createUser,
    getListUser,
    getUser,
    updateUserForm,
    updateUser,
    deleteUser,
    getUnvCAdmin,
    getTeachersNotCourse
}

export default userService;

