import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        token: null,
        error: null,
        snackbar: {
            open: false,
            message: '',
            severity: 'error' // 'error' or 'success'
        }
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
            state.snackbar = {
                open: true,
                message: 'Login successful',
                severity: 'success'
            };
        },
        loginFail: (state, action) => {
            state.userInfo = null;
            state.loading = false;
            state.token = null;
            state.error = action.payload;
            state.snackbar = {
                open: true,
                message: action.payload,
                severity: 'error'
            };
        },
        registerSuccess: (state, action) => {
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
            state.snackbar = {
                open: true,
                message: 'Registration successful',
                severity: 'success'
            };
        },
        registerFail: (state, action) => {
            state.userInfo = null;
            state.loading = false;
            state.token = null;
            state.error = action.payload;
            state.snackbar = {
                open: true,
                message: action.payload,
                severity: 'error'
            };
        },
        closeSnackbar: (state) => {
            state.snackbar = {
                ...state.snackbar,
                open: false
            };
        },
        logout: (state) => {
            state.userInfo = null;
            state.loading = false;
            state.error = null;
            state.token = null;
            state.snackbar = {
                open: true,
                message: 'Logout successful',
                severity: 'success'
            };
        }
    }
});

export const { loginSuccess, loginFail, registerSuccess, registerFail, closeSnackbar,logout } = userSlice.actions;
export default userSlice.reducer;
