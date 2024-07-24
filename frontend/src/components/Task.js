import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createTask, deleteTask, editTask, getTasks, updateTaskStatus } from '../actions/taskActions';
import { Container, Box, Button, TextField, Typography, Grid, Paper, CardHeader, Toolbar, MenuItem, AppBar, CircularProgress, Snackbar, Alert } from '@mui/material';
import AddTaskModal from './AddTaskModal';
import { useNavigate } from 'react-router-dom';
import { checkAuth, logoutUser } from '../actions/userActions';
import Task from './TaskCard';
import EditTaskModal from './EditTaskModal';
import ViewTaskModal from './ViewTaskModal';

const Tasks = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    // const { userInfo } = useSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Recent');
    const [success, setSuccess] = useState('');
    const statusArray = ['To Do', 'In Progress', 'Done'];
    const [selectedTask, setSelectedTask] = useState(null);
    const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
    const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            const isAuth = await dispatch(checkAuth());
            if (!isAuth) {
                navigate('/login');
            } else {
             dispatch(getTasks());

            }
        };
        verifyAuth();
    }, [dispatch, navigate]);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        // console.log("res :", result)
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const movedTaskIndex = tasks.findIndex(task => task._id === draggableId);
        if (movedTaskIndex === -1) return;  // Task not found

        // Create a new tasks array with the updated task status
        const updatedTasks = [...tasks];
        const movedTask = { ...updatedTasks[movedTaskIndex], status: destination.droppableId };
        updatedTasks[movedTaskIndex] = movedTask;

        // Update the task status in the state or dispatch an action to update the status in the backend
        dispatch(updateTaskStatus(movedTask._id, movedTask.status));
    };

    const handleCreateTask = (newTask) => {
        dispatch(createTask(newTask));
        setIsModalOpen(false);
        setSuccess('Task added successfully to To Do list');
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
         setSuccess('Task deleted Successfully');
    };
    const handleViewTask = (task) => {
        setSelectedTask(task);
        setViewTaskModalOpen(true);
    }
    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sort === 'Recent') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });
    const handleEdit = (updatedTask) => {
        setSelectedTask(updatedTask);
        setEditTaskModalOpen(true);
    };
    const handleSaveEdit = (updatedTask) => {
        dispatch(editTask(updatedTask));
        setSuccess('Task Edited Successfully');
    };
    const StrictModeDroppable = ({ children, ...props }) => {
        const [enabled, setEnabled] = useState(false);
        useEffect(() => {
            const animation = requestAnimationFrame(() => setEnabled(true));
            return () => {
                cancelAnimationFrame(animation);
                setEnabled(false);
            };
        }, []);
        if (!enabled) {
            return null;
        }
        return <Droppable {...props}>{children}</Droppable>;
    };
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login'); // Redirecting to the login page after logout
        setSuccess('logout success');
    };
    const handleClose = () => {
        // setError('');
        setSuccess('');
    };
    return (
        <Container>
            <AppBar >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Task Management</Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>Add Task</Button>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                    select
                    label="Sort By"
                    variant="outlined"
                    size="small"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <MenuItem value="Recent">Recent</MenuItem>
                    <MenuItem value="Oldest">Oldest</MenuItem>
                </TextField>
            </Box>
            {error && <Typography color="error">{error}</Typography>}
            {loading ? (  <CircularProgress sx={{mt:5}} />) :(
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={3}>
                    {statusArray.map(status => (
                        <Grid item xs={4} key={status}>
                            <StrictModeDroppable droppableId={status}>
                                {(provided) => (
                                    <Box
                                        component={Paper}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        sx={{ p: 2, minHeight: '500px',mt:2 }}
                                    >
                                        <Box alignItems="center" gap={4} p={1} sx={{color:"white",background :'skyblue',mb:3 ,fontFamily:"sans-serif", fontSize :21}}>
                                            {status}
                                        </Box>

                                        {sortedTasks.filter(task => task.status === status).map((task, index) => (
                                            <Draggable key={task._id.toString()} draggableId={task._id.toString()} index={index}>
                                                {(provided) => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    // sx={{ mb: 2, p: 2, boxShadow: 1 }}
                                                    >
                                                        <Task
                                                            task={task}
                                                            onEdit={() => handleEdit(task)}
                                                            onDelete={(id) => handleDeleteTask(id)}
                                                            onView={() => handleViewTask(task)}
                                                        />
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </StrictModeDroppable>
                        </Grid>
                    ))}
                </Grid>
            </DragDropContext>
            )}
            {selectedTask && (
                <EditTaskModal
                    open={editTaskModalOpen}
                    onClose={() => setEditTaskModalOpen(false)}
                    task={selectedTask}
                    onSave={handleSaveEdit}
                />
            )}

            {selectedTask && (
                <ViewTaskModal
                    open={viewTaskModalOpen}
                    onClose={() => setViewTaskModalOpen(false)}
                    task={selectedTask}
                />
            )}
            <AddTaskModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                handleAddTask={handleCreateTask}
            />
              <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Container >
    );
};

export default Tasks;
