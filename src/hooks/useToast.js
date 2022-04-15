import { useToatDispatchContext } from '../reducers/ToastContext';
import { ADD_TOAST, REMOVE_TOAST } from "../constants/types";

export function useToast(delay) {
    const dispatch = useToatDispatchContext();

    function toast(type, message) {
        const id = Math.random().toString(36).substr(2, 9);
        dispatch({
            type: ADD_TOAST,
            toast: {
                type,
                message,
                id,
            }
        });
        setTimeout(() =>{
            dispatch({type: REMOVE_TOAST, id});
        },delay)
    }

    return toast;
}