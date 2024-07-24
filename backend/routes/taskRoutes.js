const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { authenticateUserJWT } = require('../middlewares/authMiddleware');

router.post('/', authenticateUserJWT, createTask);
router.get('/', authenticateUserJWT, getTasks);
router.put('/:id', authenticateUserJWT, updateTask);
router.delete('/:id', authenticateUserJWT, deleteTask);

module.exports = router;
