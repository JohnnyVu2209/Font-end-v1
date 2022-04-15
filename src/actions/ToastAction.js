import { SHOW_TOAST,HIDE_TOAST } from "../constants/types";

export const showToast = () => ({
    type:SHOW_TOAST
});

export const hideToast = () => ({
    type:HIDE_TOAST
});