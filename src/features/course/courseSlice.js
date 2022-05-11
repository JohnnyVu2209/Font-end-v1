import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "../../services/course.service";

export const retrieveCourses = createAsyncThunk("course/retrieve", async ({ perPage, page }) => {
    const response = await courseService.getListCourse(perPage, page);
    return response.data;
});

export const createCourse = createAsyncThunk("course/create", async (data) => {
    const response = await courseService.createCourse(data);
    return response.data;
});
export const createCourseForm = createAsyncThunk("course/createForm", async (data) => {
    const response = await courseService.createCourseForm(data);
    return response.data;
});
export const courseDetails = createAsyncThunk("course/detail", async (id) => {
    const response = await courseService.getCourse(id);
    return response.data;
});

export const addTeacher = createAsyncThunk("course/addTeacher", async ({ courseId, teacherId }) => {
    const response = await courseService.addTeacherToCourse(courseId, teacherId);
    return response.data;
});

export const removeTeacher = createAsyncThunk("course/removeTeacher", async ({ courseId, teacherId }) => {
    await courseService.removeTeacherFromCourse(courseId, teacherId);
    return teacherId;
});

export const updateCourse = createAsyncThunk("course/update", async ({ id, data }) => {
    const response = courseService.updateCourse(id, data);
    return response;
});
export const updateCourseForm = createAsyncThunk("course/updateForm", async ({ id, data }) => {
    const response = courseService.updateCourseForm(id, data);
    return response;
});

const initialState = { courses: { Items: [] }, course: { Teachers: [] } };

const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {
        removeCourseDetail: (state) => {
            state.course = {};
        }
    },
    extraReducers: {
        [retrieveCourses.fulfilled]: (state, { payload }) => {
            return { ...state, courses: payload.Data }
        },
        [courseDetails.fulfilled]: (state, { payload }) => {
            return { ...state, course: payload.Data }
        },
        [addTeacher.fulfilled]: (state, { payload }) => {
            return { ...state, course: payload.Data }
        },
        [removeTeacher.fulfilled]: (state, { payload }) => {
            return { ...state, course: { ...state.course, Teachers: state.course.Teachers.filter(item => item.Id !== payload) } }
        },
        [createCourse.fulfilled]: () => {
            return;
        },
        [createCourseForm.fulfilled]: () => {
            return;
        },
        [updateCourse.fulfilled]: (state, { payload }) => {
            return { ...state, course: payload.data.Data };
        },
        [updateCourseForm.fulfilled]: (state, { payload }) => {
            console.log(payload)
            return { ...state, course: payload.data.Data };
        },
    }
});

const { reducer, actions } = courseSlice;
export const { removeCourseDetail } = actions;
export default reducer;
