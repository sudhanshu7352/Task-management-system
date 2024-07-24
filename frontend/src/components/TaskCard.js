import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import EditTaskModal from './EditTaskModal';
import ViewTaskModal from './ViewTaskModal';

const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#e3f2fd',
}));

const Task = ({ task, onEdit, onDelete, onView }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleEdit = (updatedTask) => {
        onEdit(updatedTask);
    };
  return (
    <TaskCard>
      <Typography variant="h5">{task.title}</Typography>
      <Typography sx={{color :"#524A46"}}>{task.description}</Typography>
      <Typography sx={{color :"darkgray",mt:3}} variant="body2">Created at: {new Date(task.createdAt).toLocaleString()}</Typography>
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="primary" onClick={() => onEdit(task)}>Edit</Button>
        <Button variant="outlined" color="error" onClick={() => onDelete(task._id)}>Delete</Button>
        <Button variant="outlined" onClick={() => onView(task._id)}>View Details</Button>
      </Box>
      <EditTaskModal
                open={isEditModalOpen}
                handleClose={() => setIsEditModalOpen(false)}
                task={task}
                handleEdit={handleEdit}
            />
            <ViewTaskModal
                open={isViewModalOpen}
                handleClose={() => setIsViewModalOpen(false)}
                task={task}
            />
    </TaskCard>
  );
};

export default Task;
