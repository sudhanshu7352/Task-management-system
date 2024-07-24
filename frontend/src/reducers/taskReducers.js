import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: true,
        error: null
    },
    reducers: {
        getTasksSuccess: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        getTasksFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTaskSuccess: (state, action) => {
            state.tasks = state.tasks.map(task =>
                task._id === action.payload._id ? action.payload : task
            );
            state.loading = false;
            state.error = null;
        },
        updateTaskFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createTaskSuccess: (state, action) => {
            state.tasks.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        createTaskFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTaskSuccess: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        deleteTaskFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        editTaskSuccess: (state, action) => {
            state.tasks = state.tasks.map(task =>
                task._id === action.payload._id ? action.payload : task
            );
            state.loading = false;
            state.error = null;
        },
        editTaskFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getTasksSuccess,
    getTasksFail,
    updateTaskSuccess,
    updateTaskFail,
    createTaskSuccess,
    createTaskFail,
    deleteTaskSuccess,
    deleteTaskFail,editTaskFail,editTaskSuccess
} = taskSlice.actions;

export default taskSlice.reducer;
