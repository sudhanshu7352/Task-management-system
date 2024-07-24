import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const EditTaskModal = ({open, onClose, task, onSave }) => {
    // const [title, setTitle] = useState(task.title);
    // const [description, setDescription] = useState(task.description);
    const [editedTask, setEditedTask] = useState({ ...task });
    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedTask);
        onClose();
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, width: 400, mx: 'auto', mt: '10%' }}>
                <Typography variant="h6" component="h2">Edit Task</Typography>
                <TextField
                  name="title"
                  label="Title"
                  value={editedTask.title || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                     name="description"
                     label="Description"
                     value={editedTask.description || ''}
                     onChange={handleChange}
                     fullWidth
                     margin="normal"
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditTaskModal;
