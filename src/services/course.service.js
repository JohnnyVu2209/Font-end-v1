import { getWithParams, get, postForm, post, put, putForm, putWithParams } from "../helpers/httpHelper"

const API_URL = "/Course"

const getListCourse = (limit, page) => {
    return getWithParams(`${API_URL}/getlist`,{limit, page});
};

const createCourseForm = (data) => {
    return postForm(`${API_URL}/course-create-form`,data);
};

const createCourse = (data) => {
    return post(`${API_URL}/course-create`,data);
};

const getCourse = (id) => {
    return get(`${API_URL}/get-course/${id}`)  
};

const updateCourse = (id, data) =>{
    return put(`${API_URL}/course-update/${id}`, data);
};

const updateCourseForm = (id, data) => {
    return putForm(`${API_URL}/course-update-form/${id}`,data);
};

const addTeacherToCourse = (courseId, teacherId) => {
    return putWithParams(`${API_URL}/add-teacher-to-course`,{
        courseId: courseId,
        teacherId: teacherId
    });
};

const removeTeacherFromCourse = (courseId, teacherId) => {
    return putWithParams(`${API_URL}/remove-teacher-from-course`,{
        courseId: courseId,
        teacherId: teacherId
    });
};

const courseService = {
    getListCourse,
    getCourse,
    createCourse,
    createCourseForm,
    updateCourseForm,
    updateCourse,
    addTeacherToCourse,
    removeTeacherFromCourse
}

export default courseService;