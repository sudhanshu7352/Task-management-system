const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const { authenticateUserJWT } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authenticateUserJWT, (req, res) => {
    res.status(200).json({ message: 'Token verified successfully', user: req.user });
});
module.exports = router;
