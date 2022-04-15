import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import loader from './loader';
import filter from './filter';
import users from './users';
import centers from './centers';
import permissions from './permissions';
export default combineReducers({
    auth,
    message,
    loader,
    filter,
    users,
    centers,
    permissions
});