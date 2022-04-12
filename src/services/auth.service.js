import {post} from '../helpers/httpHelper';
import tokenService from './token.service';
const API_URL = "/authenticate";

const login = (username, password) =>{
    return post(`${API_URL}/login`, {
        username,
        password,
    })
    .then((response) =>{
        if(response.data.Token){
            tokenService.setUser(response.data);
        }
        return response.data;
    });
};

const logout = () =>{
    tokenService.removeUser();
};

const authService = {
    login,
    logout
}

export default authService;