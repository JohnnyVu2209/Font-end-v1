import {
    CREATE_CENTER,
    GET_LIST_CENTER,
    DELETE_CENTER,
    GET_CENTER,
    UPDATE_CENTER,
    REMOVE_MEMBER_TO_CENTER,
    ADD_MEMBER_TO_CENTER,
    GET_LIST_CENTER_FOR_SELECT
} from '../constants/types'
const initialState = { centers: {Items:[]}, center: { Users:[] }, selectCenter:[] };

function centerReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_CENTER:
            return { ...state, centers: payload };
        case CREATE_CENTER:
            return { ...state, center: payload };
        case DELETE_CENTER:
            return {
                ...state,
                centers:{
                    ...state.centers,
                    Items: state.centers.Items.filter(item => item.Id !== payload)
                }
            };
        case GET_CENTER:
            return { ...state, center: payload };
        case UPDATE_CENTER:
            return { ...state, center: payload };
        case REMOVE_MEMBER_TO_CENTER:
            return {
                ...state,
                center: {
                    ...state.center,
                    Users: state.center.Users.filter(item => item.Id !== payload)
                }
            };
        case ADD_MEMBER_TO_CENTER:
            return {...state, center: payload};
        case GET_LIST_CENTER_FOR_SELECT:
            return {...state, selectCenter: payload}
        default:
            return state;
    }

}

export default centerReducer
