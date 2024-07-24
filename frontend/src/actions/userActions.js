import axios from 'axios';
import { loginSuccess, loginFail, registerSuccess, registerFail, logout } from '../reducers/userReducers';

// User Actions
export const login = (userData) => async (dispatch) => {
    try {
        const {data}  = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, userData);
        dispatch(loginSuccess({ user: data.user, token: data.token }));
         // Save token to localStorage
        localStorage.setItem('token', data.token);
        return true;
    } catch (error) {
        console.log(error)
        dispatch(loginFail(error.response.data.msg));
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
        dispatch(registerSuccess(data));
        return true;
    } catch (error) {
       // console.log(error.response)
        dispatch(registerFail(error.response.data.msg));
    }
};

export const checkAuth = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(loginFail('No token found'));
        return false;
    }

    try {
        const data  = await axios.get(`${process.env.REACT_APP_API_URL}/users/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(loginSuccess({ user: data.user, token }));
        return true;
    } catch (error) {
        dispatch(loginFail('Invalid token'));
        return false;
    }
};
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(logout());
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};