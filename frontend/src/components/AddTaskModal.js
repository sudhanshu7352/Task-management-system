import React, { useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { styled } from '@mui/system';

const ModalBox = styled(Box)`
    position: 'absolute';
    top: '50%';
    left: '50%';
    transform: 'translate(-50%, -50%)';
    width: 400;
    background-color: 'background.paper';
    box-shadow: 24;
    padding: 16px;
`;

const AddTaskModal = ({ open, handleClose, handleAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        const newTask = { title, description };
        handleAddTask(newTask);
        setTitle('');
        setDescription('');
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <ModalBox component={Paper}>
                <Typography variant="h6" id="modal-title" gutterBottom>
                    Add Task
                </Typography>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Add
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </ModalBox>
        </Modal>
    );
};

export default AddTaskModal;
