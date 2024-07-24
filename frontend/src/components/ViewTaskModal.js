import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ViewTaskModal = ({ open, onClose, task }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, width: 400, mx: 'auto', mt: '10%' }}>
                <Typography variant="h4" component="h2">{task.title}</Typography>
                <Typography sx={{ mt: 2 ,color :"#524A46"}}>{task.description}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 5,color:'darkgray' }}>
                    Created at :
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>{new Date(task.createdAt).toLocaleString()}</Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={onClose}>Close</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewTaskModal;
