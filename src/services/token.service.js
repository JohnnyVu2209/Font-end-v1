
const user = JSON.parse(localStorage.getItem('user'));

const getLocalRefreshToken = () => {
    return user?.RefreshToken;
}

const getLocalToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.Token;
}

const updateLocalToken = (token,refreshToken) =>{
    user.Token = token;
    user.RefreshToken = refreshToken;
    localStorage.setItem('user', JSON.stringify(user));
}

const getUser = () =>{
    return user;
}

const getUserInfo = () => {
    return user?.Information;
}

const setUser = (User) => {
    console.log(JSON.stringify(User));
    localStorage.setItem("user", JSON.stringify(User));
}

const updateUserInfo = (info) => {
    user.Information = info;
    localStorage.setItem('user', JSON.stringify(user));
}

const removeUser = () => {
    localStorage.removeItem('user');
}

const tokenService = {
    getLocalRefreshToken,
    getLocalToken,
    updateLocalToken,
    getUser,
    getUserInfo,
    setUser,
    updateUserInfo,
    removeUser
}

export default tokenService;