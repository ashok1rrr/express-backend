const verifyToken = require('../middleware/authMiddleware');
const {
    login,
    register,
    changePassword
} = require("../controllers/authController");
const express = require('express');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);

authRouter.post('/change-password', verifyToken, changePassword);

module.exports = authRouter;
