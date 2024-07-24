import axios from 'axios';
import {
    getTasksSuccess,
    getTasksFail,
    updateTaskSuccess,
    updateTaskFail,
    createTaskSuccess,
    createTaskFail,
    deleteTaskSuccess,
    deleteTaskFail,
    editTaskSuccess, editTaskFail
} from '../reducers/taskReducers';

// Task Actions
export const getTasks = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
       // console.log("API Response Tasks:", data);
        dispatch(getTasksSuccess(data));
    } catch (error) {
        dispatch(getTasksFail(error.response.data.message));
    }
};

export const updateTask = (id, updatedTask) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, updatedTask,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        dispatch(updateTaskSuccess(data));
    } catch (error) {
        dispatch(updateTaskFail(error.response.data.message));
    }
};

export const createTask = (newTask) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, newTask,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
           // console.log("added task :", data)
        dispatch(createTaskSuccess(data));
    } catch (error) {
        dispatch(createTaskFail(error.response.data.message));
    }
};

export const deleteTask = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        dispatch(deleteTaskSuccess(id));
    } catch (error) {
        dispatch(deleteTaskFail(error.response.data.message));
    }
};
export const updateTaskStatus = (id, status) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        });
      dispatch(updateTaskSuccess(data));
    } catch (error) {
      dispatch(updateTaskFail(error.response.data.message));
    }
  };
  export const editTask = (updatedTask) => async (dispatch) => {
    const token = localStorage.getItem('token');
   // console.log("ut :", updatedTask)
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${updatedTask._id}`, updatedTask, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(editTaskSuccess(data));
    } catch (error) {
        dispatch(editTaskFail(error.response.data.message));
    }
};