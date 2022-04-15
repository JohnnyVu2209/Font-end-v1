import {
    CREATE_ROLE_PERMISSION,
    DELETE_ROLE_PERMISSION,
    EDIT_ROLE_PERMISSION,
    GET_LIST_ROLE,
    GET_LIST_ROLE_FOR_SELECT,
    GET_PERMISSIONS,
    GET_ROLE_DETAIL
} from "../constants/types";

const initialState = { roles: { Items: [] }, seletecRoles: [], permissions: [], role: {Permissions:[{View:false,Edit:false,Create:false,Delete:false}]} }

function permissions(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_ROLE_FOR_SELECT:
            return { ...state, seletecRoles: payload };
        case GET_LIST_ROLE:
            return { ...state, roles: payload };
        case GET_PERMISSIONS:
            return { ...state, permissions: payload };
        case CREATE_ROLE_PERMISSION:
            return { ...state, role: payload };
        case DELETE_ROLE_PERMISSION:
            return {
                ...state,
                roles: {
                    ...state.roles,
                    Items: state.roles.Items.filter(item => item.Id !== payload)
                }
            };
        case GET_ROLE_DETAIL:
            return {...state, role: payload};
        case EDIT_ROLE_PERMISSION:
            return {...state, role: payload};
    default:
            return state;
    }
}

export default permissions
