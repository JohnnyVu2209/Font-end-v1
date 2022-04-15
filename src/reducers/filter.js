import {SEARCH_TEXT} from '../constants/types'

const initialState = {searchText: ''}

export default function Filter(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SEARCH_TEXT:
            return {
                ...state,
                searchText: payload
            };
            
    
        default:
            return state;
    }
    
}
