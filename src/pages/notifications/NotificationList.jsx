import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../../components/Notification/Notification';

import useStyles from "./styles";

export const SuccessToast = (message) => {
    var classes = useStyles();
    var componentProps = {
        type: "shipped",
        message: message,
        variant: "contained",
        color: "success",
    };
    var component = ((<Notification
        {...componentProps}
        className={classes.notificationComponent} />), {
            position: toast.POSITION.TOP_RIGHT,
            progressClassName: classes.progress,
            className: classes.notification
        })
    return component;
}

export const ToastOption = {
    position: toast.POSITION.TOP_RIGHT,
    progressClassName: useStyles.progress,
    className: useStyles.notification
};