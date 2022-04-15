import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    REFRESH_TOKEN
} from '../constants/types';
import AuthService from '../services/auth.service';
import ERRORS from '../constants/ErrorCode';
export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
            return Promise.resolve();
        },
        (error) => {
            const response =
                JSON.parse(error.response &&
                    error.response.request &&
                    error.response.request.response) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: ERRORS[response.Message],
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};

export const refreshToken = (token) => (dispatch) =>{
    dispatch({
        type: REFRESH_TOKEN,
        payload:token
    });
};