import {SEARCH_TEXT} from '../constants/types'
export const setSearchText=(text) =>{
    return {
        type: SEARCH_TEXT,
        payload: text,
    }
}