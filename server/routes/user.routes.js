const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const { verifyToken } = require('../middlewares/authMiddleware');

// Routes for getting all users
router.get('/', verifyToken, userController.getAllUsers);

// Route for getting a single user by id
router.get('/:id', userController.getUserById);

// Route for creating a new user
router.post('/', userController.createUser);

// Route for authentication a user
router.post('/authenticate', userController.authenticate);

// Route for updating a user
router.put('/:id', userController.updateUser);

// Route for deleting a user
router.delete('/:id', userController.deleteUser);

module.exports = router;