const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/adminController');
const { authAdmin } = require('../middlewares/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', authAdmin, getAllUsers);
router.get('/users/:id', authAdmin, getUserById);
router.put('/users/:id', authAdmin, updateUser);
router.delete('/users/:id', authAdmin, deleteUser);

module.exports = router;
