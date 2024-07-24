import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducers';
import taskReducer from '../reducers/taskReducers';

const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
    }
});

export default store;
