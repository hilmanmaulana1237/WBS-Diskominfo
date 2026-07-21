const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

// Routes untuk admin manage users
router.get('/users', auth, isAdmin, userController.getAllUsers);
router.put('/users/:id/status', auth, isAdmin, userController.toggleUserStatus);

module.exports = router;
