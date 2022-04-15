import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REFRESH_TOKEN
} from '../constants/types';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null};

export default function Auth(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return{
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                user: {...user, Token: payload}
            };
        default:
            return state;
    }
}