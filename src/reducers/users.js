import {
    GET_USER,
    CREATE_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
    CREATE_USER_WITH_FORM,
    UPDATE_USER_WITH_FORM,
    GET_UNV_CENTRAL_ADMIN
} from '../constants/types'


const initialState = { users: { Items: [] }, user: {Role:{},Center:{}} };

function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_USER:
            return { ...state, user: payload };
        case CREATE_USER_WITH_FORM:
            return { ...state, user: payload };
        case RETRIEVE_USERS:
            return { ...state, users: payload };
        case UPDATE_USER:
            return { ...state, user: payload };
        case UPDATE_USER_WITH_FORM:
            return { ...state, user: payload };
        case DELETE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    Items: state.users.Items.filter(item => item.Id !== payload)
                }
            };
        case GET_UNV_CENTRAL_ADMIN:
            return {
                ...state,
                users: {
                    ...state.users,
                    Items: payload,
                }
            };
        case GET_USER:
            return {
                ...state,
                user: payload
            };

        default:
            return state;
    }
}
export default userReducer;
